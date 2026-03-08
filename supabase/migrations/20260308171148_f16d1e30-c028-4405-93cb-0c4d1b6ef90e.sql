-- Create profile table (public portfolio data)
CREATE TABLE public.profile (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL DEFAULT '',
  job_title TEXT NOT NULL DEFAULT '',
  hero_headline TEXT NOT NULL DEFAULT '',
  sub_headline TEXT NOT NULL DEFAULT '',
  cv_url TEXT,
  linkedin_url TEXT,
  email TEXT,
  phone TEXT,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create metrics table
CREATE TABLE public.metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  description TEXT,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create case_studies table
CREATE TABLE public.case_studies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  tagline TEXT,
  problem_statement TEXT,
  solution_statement TEXT,
  process_json JSONB DEFAULT '[]'::jsonb,
  desktop_image_url TEXT,
  mobile_image_url TEXT,
  presentation_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_title TEXT,
  company TEXT,
  quote_text TEXT NOT NULL,
  category_tag TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Public read access (portfolio is public-facing)
CREATE POLICY "Public read access" ON public.profile FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.metrics FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.case_studies FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.testimonials FOR SELECT USING (true);