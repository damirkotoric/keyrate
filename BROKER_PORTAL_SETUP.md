# Broker Portal Setup Guide

## Prerequisites

- Supabase account (free tier is sufficient to start)
- Access to your KeyRate project

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `keyrate-broker-portal` (or similar)
   - Database Password: Generate a strong password and save it
   - Region: Choose closest to your users
5. Click "Create new project" and wait for setup to complete (~2 minutes)

## Step 2: Get API Keys

1. In your Supabase project dashboard, go to **Settings** > **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (under "Project API keys")
   - **service_role key** (under "Project API keys" - keep this secret!)

## Step 3: Configure Environment Variables

1. In your project at `/www/`, create a file named `.env.local`
2. Add the following (replace with your actual values):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

3. Save the file
4. Add `.env.local` to your `.gitignore` (it should already be there)

## Step 4: Set Up Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the following SQL:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Clients table
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  address TEXT,
  region TEXT CHECK(region IN ('CA', 'AE', 'US')),
  broker_id UUID REFERENCES auth.users(id),
  status TEXT DEFAULT 'active',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lenders table
CREATE TABLE lenders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  type TEXT CHECK(type IN ('bank', 'credit_union', 'monoline', 'private', 'other')),
  is_active BOOLEAN DEFAULT true,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Applications table
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  property_value NUMERIC(12, 2),
  loan_amount NUMERIC(12, 2),
  down_payment NUMERIC(12, 2),
  annual_income NUMERIC(12, 2),
  purpose TEXT,
  mortgage_type TEXT,
  term TEXT,
  property_address TEXT,
  status TEXT DEFAULT 'new',
  lender_id UUID REFERENCES lenders(id),
  rate NUMERIC(5, 3),
  region TEXT CHECK(region IN ('CA', 'AE', 'US')),
  broker_id UUID REFERENCES auth.users(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Documents table
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT,
  file_size BIGINT,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_clients_broker ON clients(broker_id);
CREATE INDEX idx_applications_client ON applications(client_id);
CREATE INDEX idx_applications_lender ON applications(lender_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_documents_application ON documents(application_id);
CREATE INDEX idx_lenders_active ON lenders(is_active);

-- Auto-update timestamps trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lenders_updated_at BEFORE UPDATE ON lenders
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

4. Click "Run" to execute the schema

## Step 5: Set Up Row Level Security (RLS)

1. In the same SQL Editor, create a new query
2. Copy and paste:

```sql
-- Enable RLS
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE lenders ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Brokers can only see their own clients
CREATE POLICY "Brokers see own clients" ON clients FOR SELECT
USING (auth.uid() = broker_id);

CREATE POLICY "Brokers insert own clients" ON clients FOR INSERT
WITH CHECK (auth.uid() = broker_id);

CREATE POLICY "Brokers update own clients" ON clients FOR UPDATE
USING (auth.uid() = broker_id);

-- Admins see all clients
CREATE POLICY "Admins see all clients" ON clients FOR ALL
USING ((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin');

-- All authenticated users can view active lenders
CREATE POLICY "All users see active lenders" ON lenders FOR SELECT
TO authenticated
USING (is_active = true);

-- All authenticated users can view all lenders
CREATE POLICY "Authenticated users see all lenders" ON lenders FOR SELECT
TO authenticated
USING (true);

-- Authenticated users can manage lenders
CREATE POLICY "Authenticated users manage lenders" ON lenders FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Brokers see applications for their clients
CREATE POLICY "Brokers see own applications" ON applications FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM clients 
    WHERE clients.id = applications.client_id 
    AND clients.broker_id = auth.uid()
  )
);

-- Admins see all applications
CREATE POLICY "Admins see all applications" ON applications FOR ALL
USING ((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin');

-- Document policies
CREATE POLICY "Brokers see own documents" ON documents FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM applications a
    JOIN clients c ON c.id = a.client_id
    WHERE a.id = documents.application_id
    AND c.broker_id = auth.uid()
  )
);

CREATE POLICY "Admins see all documents" ON documents FOR ALL
USING ((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin');
```

3. Click "Run"

## Step 6: Create Storage Bucket for Documents

1. Go to **Storage** in the Supabase dashboard
2. Click "Create a new bucket"
3. Name: `application-documents`
4. Set as **Private** (not public)
5. Click "Create bucket"
6. Click on the bucket, then go to **Policies**
7. Click "New Policy" and add:

```sql
-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'application-documents');

-- Allow users to download their own documents
CREATE POLICY "Users can download own documents"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'application-documents');

-- Allow users to delete their own documents
CREATE POLICY "Users can delete own documents"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'application-documents');
```

## Step 7: Create Your First Admin User

1. In Supabase dashboard, go to **Authentication** > **Users**
2. Click "Add user" > "Create new user"
3. Enter:
   - Email: your admin email
   - Password: create a strong password
   - Check "Auto Confirm User"
4. Click "Create user"
5. Once created, click on the user in the list
6. Scroll to "User Metadata" section
7. Click "Edit" and replace the JSON with:

```json
{
  "full_name": "Your Name",
  "role": "admin"
}
```

8. Click "Save"

## Step 8: Test the Application

1. Start your development server:
```bash
cd www
npm run dev
```

2. Navigate to: `http://localhost:3000/portal/login`

3. Log in with your admin credentials

4. You should see the broker portal with:
   - Dashboard
   - Applications
   - Clients
   - Lenders
   - Brokers (admin only)

## Step 9: Add Lenders

You can add lenders either through the portal UI or by running SQL.

### Option A: Via Portal UI
1. Log in to the portal
2. Go to the "Lenders" page
3. Click "New Lender"
4. Add common lenders your brokers work with
5. Click "Save" for each lender

### Option B: Via SQL (Faster)
1. Go to **SQL Editor** in Supabase
2. Run this query to add common Canadian lenders:

```sql
INSERT INTO lenders (name, type, is_active) VALUES
  ('TD Bank', 'bank', true),
  ('RBC Royal Bank', 'bank', true),
  ('Scotiabank', 'bank', true),
  ('BMO Bank of Montreal', 'bank', true),
  ('CIBC', 'bank', true),
  ('National Bank', 'bank', true),
  ('MCAP', 'monoline', true),
  ('Merix Financial', 'monoline', true),
  ('First National', 'monoline', true),
  ('Home Trust', 'bank', true),
  ('Equitable Bank', 'bank', true),
  ('Tangerine', 'bank', true)
ON CONFLICT (name) DO NOTHING;
```

## Step 10: Create Additional Brokers (Optional)

1. Log in as admin
2. Go to the "Brokers" page
3. Click "New Broker"
4. Fill in the form:
   - Email
   - Password (they can change it later)
   - Full Name
   - Role (broker or admin)
5. Click "Save"

## Testing Checklist

- [ ] Can log in as admin
- [ ] Dashboard shows stats
- [ ] Can create a new client
- [ ] Can create a new lender
- [ ] Can create an application for a client with a lender
- [ ] Can select lender from dropdown when creating application
- [ ] Can upload documents to an application
- [ ] Can download uploaded documents
- [ ] Can edit client, lender, and application details
- [ ] Admin can create new brokers
- [ ] Can change password in Settings
- [ ] Can log out

## Troubleshooting

### "Invalid API key" error
- Check that your `.env.local` file has the correct keys
- Restart your dev server after adding environment variables

### "Row Level Security policy violation"
- Ensure RLS policies are created correctly
- Check that user has proper `role` in `user_metadata`

### File upload fails
- Verify storage bucket is created
- Check storage policies are set correctly
- Ensure bucket is named exactly `application-documents`

### Can't see any data
- As a broker (non-admin), you'll only see your own clients/applications
- Make sure you're creating clients with the logged-in broker's ID

## Production Deployment

When deploying to Vercel:

1. Add environment variables in Vercel dashboard:
   - Settings > Environment Variables
   - Add all three Supabase variables
   - Make sure they're available for Production, Preview, and Development

2. Deploy:
```bash
git add .
git commit -m "Add broker portal"
git push
```

3. Vercel will automatically deploy

## Security Notes

- Never commit `.env.local` to git
- Keep `SUPABASE_SERVICE_ROLE_KEY` secret - it bypasses RLS
- Use strong passwords for all broker accounts
- Regularly review access logs in Supabase

## Next Steps

Consider adding:
- Email notifications when application status changes
- SMS notifications via Twilio
- Advanced search and filtering
- Export data to CSV/Excel
- Integration with lender APIs
- Client portal (separate from broker portal)
- Multi-factor authentication
- Audit logs for compliance

## Support

For issues or questions, refer to:
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)

