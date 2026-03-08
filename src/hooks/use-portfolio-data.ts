import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export const useProfile = () =>
  useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data, error } = await supabase.from("profile").select("*").limit(1).maybeSingle();
      if (error) throw error;
      return data;
    },
  });

export const useTestimonials = () =>
  useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase.from("testimonials").select("*").order("created_at");
      if (error) throw error;
      return data ?? [];
    },
  });

export const useCaseStudies = () =>
  useQuery({
    queryKey: ["case_studies"],
    queryFn: async () => {
      const { data, error } = await supabase.from("case_studies").select("*").order("created_at");
      if (error) throw error;
      return data ?? [];
    },
  });

export const useMetrics = () =>
  useQuery({
    queryKey: ["metrics"],
    queryFn: async () => {
      const { data, error } = await supabase.from("metrics").select("*").order("created_at");
      if (error) throw error;
      return data ?? [];
    },
  });
