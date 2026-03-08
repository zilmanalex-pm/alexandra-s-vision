-- Enable RLS on all tables
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Public read-only access policies (portfolio is a public-facing site)
CREATE POLICY "Public read profile" ON public.profile FOR SELECT USING (true);
CREATE POLICY "Public read metrics" ON public.metrics FOR SELECT USING (true);
CREATE POLICY "Public read case_studies" ON public.case_studies FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON public.testimonials FOR SELECT USING (true);