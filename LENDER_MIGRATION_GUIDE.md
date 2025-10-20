# Lender Standardization Migration Guide

This guide is for users who already have the broker portal set up with the old schema where `lender` was a TEXT field in the `applications` table.

## Overview

We're migrating from:
- `applications.lender` (TEXT field with free-form lender names)

To:
- `lenders` table (standardized list of lenders)
- `applications.lender_id` (UUID reference to lenders table)

## Migration Steps

### Step 1: Backup Your Data

Before making any changes, backup your database:

1. Go to Supabase Dashboard > Database > Backups
2. Create a manual backup
3. Or export your data:

```sql
-- Export existing applications with lender names
SELECT * FROM applications WHERE lender IS NOT NULL;
```

### Step 2: Create Lenders Table

In Supabase SQL Editor, run:

```sql
-- Create lenders table
CREATE TABLE IF NOT EXISTS lenders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  type TEXT CHECK(type IN ('bank', 'credit_union', 'monoline', 'private', 'other')),
  is_active BOOLEAN DEFAULT true,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add update trigger
CREATE TRIGGER update_lenders_updated_at BEFORE UPDATE ON lenders
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create index
CREATE INDEX idx_lenders_active ON lenders(is_active);
```

### Step 3: Populate Lenders from Existing Data

Extract unique lenders from your applications and create them:

```sql
-- Insert unique lenders from applications
INSERT INTO lenders (name, type, is_active)
SELECT DISTINCT 
  TRIM(lender) as name,
  'bank' as type,  -- Default type, you can update manually later
  true as is_active
FROM applications 
WHERE lender IS NOT NULL 
  AND TRIM(lender) != ''
ON CONFLICT (name) DO NOTHING;

-- Also add any additional common lenders
INSERT INTO lenders (name, type, is_active) VALUES
  ('TD Bank', 'bank', true),
  ('RBC Royal Bank', 'bank', true),
  ('Scotiabank', 'bank', true),
  ('BMO Bank of Montreal', 'bank', true),
  ('CIBC', 'bank', true),
  ('MCAP', 'monoline', true),
  ('Merix Financial', 'monoline', true)
ON CONFLICT (name) DO NOTHING;
```

### Step 4: Add lender_id Column to Applications

```sql
-- Add new lender_id column (nullable initially)
ALTER TABLE applications 
ADD COLUMN IF NOT EXISTS lender_id UUID REFERENCES lenders(id);

-- Create index
CREATE INDEX IF NOT EXISTS idx_applications_lender ON applications(lender_id);
```

### Step 5: Migrate Data

Map existing lender names to lender_id:

```sql
-- Update applications with lender_id based on lender name
UPDATE applications a
SET lender_id = l.id
FROM lenders l
WHERE TRIM(a.lender) = l.name
  AND a.lender IS NOT NULL
  AND a.lender_id IS NULL;

-- Check how many applications still don't have a lender_id
SELECT COUNT(*) FROM applications 
WHERE lender IS NOT NULL 
  AND lender_id IS NULL;
```

If there are still applications without a lender_id, you may need to manually map them:

```sql
-- See which lender names couldn't be matched
SELECT DISTINCT TRIM(lender) as unmatched_lender
FROM applications 
WHERE lender IS NOT NULL 
  AND lender_id IS NULL;

-- Manually create missing lenders and update
-- (adjust the names as needed)
```

### Step 6: Add broker_id to Applications (if missing)

```sql
-- Add broker_id if it doesn't exist
ALTER TABLE applications 
ADD COLUMN IF NOT EXISTS broker_id UUID REFERENCES auth.users(id);
```

### Step 7: Update RLS Policies

```sql
-- Enable RLS on lenders
ALTER TABLE lenders ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to view lenders
CREATE POLICY "Authenticated users see all lenders" ON lenders FOR SELECT
TO authenticated
USING (true);

-- Allow authenticated users to manage lenders
CREATE POLICY "Authenticated users manage lenders" ON lenders FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
```

### Step 8: Verify Migration

Check that the migration was successful:

```sql
-- Count applications with lender_id
SELECT 
  COUNT(*) as total_applications,
  COUNT(lender_id) as with_lender_id,
  COUNT(lender) as with_lender_text
FROM applications;

-- View some examples
SELECT 
  id,
  lender as old_lender_text,
  lender_id as new_lender_id,
  (SELECT name FROM lenders WHERE id = applications.lender_id) as lender_name
FROM applications 
LIMIT 10;
```

### Step 9: Deploy Code Changes

1. Pull the latest code with the lender standardization changes
2. Update your local `.env.local` if needed
3. Test locally:
   ```bash
   cd www
   npm run dev
   ```
4. Navigate to `/portal/lenders` to verify the Lenders page works
5. Create a test application and verify you can select a lender from the dropdown
6. Deploy to production when ready

### Step 10: (Optional) Remove Old lender Column

**ONLY do this after verifying everything works in production for a few days:**

```sql
-- Drop the old lender text column
ALTER TABLE applications DROP COLUMN IF EXISTS lender;
```

## Rollback Plan

If something goes wrong:

1. Restore from the backup you created in Step 1
2. Or revert the code changes
3. The old `lender` TEXT field should still have the data

## Troubleshooting

### Issue: Applications don't show lender names

**Solution:** Check that the join is working:
```sql
SELECT a.id, l.name as lender_name
FROM applications a
LEFT JOIN lenders l ON l.id = a.lender_id
LIMIT 10;
```

### Issue: Can't select lenders in dropdown

**Solution:** 
1. Check RLS policies on lenders table
2. Verify lenders exist: `SELECT * FROM lenders;`
3. Check browser console for errors

### Issue: "lender_id violates foreign key constraint"

**Solution:** The lender_id you're trying to set doesn't exist in the lenders table. Either:
1. Create the lender first
2. Or set lender_id to NULL

## Testing Checklist

After migration:

- [ ] Can view Lenders page
- [ ] Can create a new lender
- [ ] Can edit existing lender
- [ ] Can create new application with lender selection
- [ ] Can edit existing application and change lender
- [ ] Old applications show correct lender name
- [ ] Lender dropdown shows all active lenders
- [ ] Can mark lenders as inactive
- [ ] Inactive lenders don't show in dropdown

## Support

If you encounter issues during migration, check:
- Supabase logs for SQL errors
- Browser console for frontend errors
- Network tab to see API responses

