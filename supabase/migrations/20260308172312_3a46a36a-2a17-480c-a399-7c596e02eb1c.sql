-- Allow insert/update/delete on all portfolio tables (admin access via access key, not auth-based)
CREATE POLICY "Allow insert profile" ON public.profile FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update profile" ON public.profile FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Allow insert metrics" ON public.metrics FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update metrics" ON public.metrics FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Allow delete metrics" ON public.metrics FOR DELETE USING (true);

CREATE POLICY "Allow insert testimonials" ON public.testimonials FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update testimonials" ON public.testimonials FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Allow delete testimonials" ON public.testimonials FOR DELETE USING (true);

CREATE POLICY "Allow update case_studies" ON public.case_studies FOR UPDATE USING (true) WITH CHECK (true);