-- This SQL will update RLS policies so all brokers can see all data
-- Run this in Supabase SQL Editor

-- Drop old restrictive policies
DROP POLICY IF EXISTS "Brokers see own clients" ON clients;
DROP POLICY IF EXISTS "Brokers insert own clients" ON clients;
DROP POLICY IF EXISTS "Brokers update own clients" ON clients;
DROP POLICY IF EXISTS "Admins see all clients" ON clients;
DROP POLICY IF EXISTS "Brokers see own applications" ON applications;
DROP POLICY IF EXISTS "Admins see all applications" ON applications;
DROP POLICY IF EXISTS "Brokers see own documents" ON documents;
DROP POLICY IF EXISTS "Admins see all documents" ON documents;

-- Create new policies: All authenticated users see all data
CREATE POLICY "All authenticated users see clients" ON clients FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "All authenticated users manage clients" ON clients FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "All authenticated users update clients" ON clients FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "All authenticated users delete clients" ON clients FOR DELETE
TO authenticated
USING (true);

CREATE POLICY "All authenticated users see applications" ON applications FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "All authenticated users manage applications" ON applications FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "All authenticated users update applications" ON applications FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "All authenticated users delete applications" ON applications FOR DELETE
TO authenticated
USING (true);

CREATE POLICY "All authenticated users see documents" ON documents FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "All authenticated users manage documents" ON documents FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "All authenticated users update documents" ON documents FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "All authenticated users delete documents" ON documents FOR DELETE
TO authenticated
USING (true);

