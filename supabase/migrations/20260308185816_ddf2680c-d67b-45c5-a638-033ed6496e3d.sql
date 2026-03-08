
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read profile" ON public.profile FOR SELECT USING (true);

ALTER TABLE public.metrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read metrics" ON public.metrics FOR SELECT USING (true);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read testimonials" ON public.testimonials FOR SELECT USING (true);
