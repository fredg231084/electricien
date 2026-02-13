/*
  # Create Electricien MTL lead generation tables

  1. New Tables
    - `leads` - Qualified lead submissions from website forms
      - `id` (uuid, primary key)
      - `created_at` (timestamptz, auto)
      - `source_page` (text) - Page the lead came from
      - `landing_type` (text) - 'seo' or 'lp'
      - UTM attribution fields (source, medium, campaign, content, term)
      - `project_type` (text) - Type of electrical project
      - `city` (text) - Service area
      - `budget_range` (text) - Budget bracket
      - `description` (text) - Project description
      - Contact info: name, phone, email, preferred_contact
      - `status` (text) - Workflow status (new/dispatched/closed/rejected)
      - `notes` (text) - Admin notes
      - `job_value` (numeric) - Estimated job value

    - `events` - Analytics tracking events
      - `id` (uuid, primary key)
      - `created_at` (timestamptz, auto)
      - `event_id` (text) - Client-generated UUID
      - Page, referrer, UTM fields
      - `device_type` (text)
      - `event_name` (text) - Event identifier
      - `event_data` (jsonb) - Flexible payload

  2. Security
    - RLS enabled on both tables
    - Insert policies with field validation for anon role
    - Select policies time-bounded to 90 days for admin reads
    - Update policy on leads for status changes

  3. Indexes
    - leads: status, created_at, project_type, city
    - events: event_name, created_at
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  source_page text NOT NULL DEFAULT '',
  landing_type text NOT NULL DEFAULT 'seo',
  utm_source text DEFAULT '',
  utm_medium text DEFAULT '',
  utm_campaign text DEFAULT '',
  utm_content text DEFAULT '',
  utm_term text DEFAULT '',
  project_type text NOT NULL DEFAULT '',
  city text NOT NULL DEFAULT '',
  budget_range text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  name text NOT NULL DEFAULT '',
  phone text NOT NULL,
  email text DEFAULT '',
  preferred_contact text NOT NULL DEFAULT 'Appel',
  status text NOT NULL DEFAULT 'new',
  notes text DEFAULT '',
  job_value numeric DEFAULT NULL
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  event_id text NOT NULL,
  page_path text DEFAULT '',
  referrer text DEFAULT '',
  utm_source text DEFAULT '',
  utm_medium text DEFAULT '',
  utm_campaign text DEFAULT '',
  utm_content text DEFAULT '',
  utm_term text DEFAULT '',
  device_type text DEFAULT '',
  event_name text NOT NULL,
  event_data jsonb DEFAULT '{}'
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow lead submissions with valid phone"
  ON leads FOR INSERT
  TO anon
  WITH CHECK (phone IS NOT NULL AND phone != '' AND status = 'new');

CREATE POLICY "Allow event logging with valid event name"
  ON events FOR INSERT
  TO anon
  WITH CHECK (event_name IS NOT NULL AND event_name != '');

CREATE POLICY "Allow reading recent leads for admin"
  ON leads FOR SELECT
  TO anon
  USING (created_at > now() - interval '90 days');

CREATE POLICY "Allow reading recent events for admin"
  ON events FOR SELECT
  TO anon
  USING (created_at > now() - interval '90 days');

CREATE POLICY "Allow updating recent lead status"
  ON leads FOR UPDATE
  TO anon
  USING (created_at > now() - interval '90 days')
  WITH CHECK (status IN ('new', 'dispatched', 'closed', 'rejected'));

CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_project_type ON leads (project_type);
CREATE INDEX IF NOT EXISTS idx_leads_city ON leads (city);
CREATE INDEX IF NOT EXISTS idx_events_event_name ON events (event_name);
CREATE INDEX IF NOT EXISTS idx_events_created_at ON events (created_at DESC);