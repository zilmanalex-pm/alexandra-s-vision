
ALTER TABLE public.capabilities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read capabilities" ON public.capabilities FOR SELECT USING (true);

ALTER TABLE public.product_edge ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read product_edge" ON public.product_edge FOR SELECT USING (true);
