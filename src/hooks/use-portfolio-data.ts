import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
      const { data, error } = await supabase.from("testimonials").select("*");
      if (error) throw error;
      return data ?? [];
    },
  });

export const useCaseStudies = () =>
  useQuery({
    queryKey: ["case_studies"],
    queryFn: async () => {
      const { data, error } = await supabase.from("case_studies").select("*");
      if (error) throw error;
      return data ?? [];
    },
  });

export const useMetrics = () =>
  useQuery({
    queryKey: ["metrics"],
    queryFn: async () => {
      const { data, error } = await supabase.from("metrics").select("*").order("display_order");
      if (error) throw error;
      return data ?? [];
    },
  });

export const useValues = () =>
  useQuery({
    queryKey: ["values"],
    queryFn: async () => {
      const { data, error } = await supabase.from("values").select("*").order("display_order");
      if (error) throw error;
      return data ?? [];
    },
  });
