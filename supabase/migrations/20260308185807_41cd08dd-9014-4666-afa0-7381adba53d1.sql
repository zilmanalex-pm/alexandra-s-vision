
-- Enable RLS and add public read for case_studies
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read case_studies" ON public.case_studies FOR SELECT USING (true);

-- Insert the TarbutON case study with 6 process steps
INSERT INTO public.case_studies (title, problem_statement, is_featured, process_steps)
VALUES (
  'TarbutON',
  'Cultural education platforms lacked cohesive digital infrastructure, resulting in low adoption, fragmented user journeys, and poor stakeholder alignment across districts.',
  true,
  '[
    {
      "label": "Mapping",
      "desc": "Comprehensive stakeholder landscape analysis and regulatory framework review across government sectors.",
      "details": "Mapped 12+ stakeholder groups across municipal, regional, and national levels. Identified overlapping mandates and communication gaps between education departments and cultural institutions."
    },
    {
      "label": "Pain Points",
      "desc": "Deep-dive user research uncovering fragmented workflows and adoption barriers in legacy systems.",
      "details": "Conducted 30+ user interviews revealing that 78% of educators relied on disconnected tools. Target personas included district coordinators, classroom teachers, and content curators — each with distinct friction points in their daily user journeys."
    },
    {
      "label": "Solution",
      "desc": "Designed modular platform architecture enabling rapid iteration under strict compliance constraints.",
      "details": "Proposed a unified dashboard consolidating scheduling, content management, and reporting. Architecture followed a composable design pattern allowing feature toggling per district requirements."
    },
    {
      "label": "Roadmap",
      "desc": "Phased delivery plan balancing quick wins with long-term platform scalability goals.",
      "details": "Phase 1: Core scheduling & auth (8 weeks). Phase 2: Content library & search (6 weeks). Phase 3: Analytics dashboard & district-level reporting (10 weeks). Phase 4: Mobile companion app & offline mode."
    },
    {
      "label": "Metrics",
      "desc": "Defined success KPIs and built measurement frameworks to validate adoption impact.",
      "details": "Established baseline metrics for user activation, session duration, and task completion rates. Implemented event tracking across all core flows to enable data-driven iteration post-launch."
    },
    {
      "label": "Flow",
      "desc": "End-to-end user flow optimization reducing friction and increasing feature discoverability.",
      "details": "Redesigned the onboarding flow reducing time-to-first-value from 12 minutes to under 4. Streamlined navigation architecture from 6 top-level sections to 3, improving task completion by 35%."
    }
  ]'::jsonb
);
