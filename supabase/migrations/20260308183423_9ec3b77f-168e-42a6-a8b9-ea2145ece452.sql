
CREATE TABLE public.values (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  display_order integer,
  text text,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.values ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read values" ON public.values FOR SELECT USING (true);
CREATE POLICY "Allow insert values" ON public.values FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update values" ON public.values FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Allow delete values" ON public.values FOR DELETE USING (true);
