import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useProfile = () =>
  useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data, error } = await supabase.from("profile").select("*").limit(1).maybeSingle();
      if (error) throw error;
      return data as any;
    },
  });

export const useTestimonials = () =>
  useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase.from("testimonials").select("*").order("display_order");
      if (error) throw error;
      return (data ?? []) as any[];
    },
  });

export const useCaseStudies = () =>
  useQuery({
    queryKey: ["case_studies"],
    queryFn: async () => {
      const { data, error } = await supabase.from("case_studies").select("*");
      if (error) throw error;
      return (data ?? []) as any[];
    },
  });

export const useMetrics = () =>
  useQuery({
    queryKey: ["metrics"],
    queryFn: async () => {
      const { data, error } = await supabase.from("metrics").select("*").order("display_order");
      if (error) throw error;
      return (data ?? []) as any[];
    },
  });

export const useValues = () =>
  useQuery({
    queryKey: ["values"],
    queryFn: async () => {
      const { data, error } = await supabase.from("values").select("*").order("display_order");
      if (error) throw error;
      return (data ?? []) as any[];
    },
  });

export const useCapabilities = () =>
  useQuery({
    queryKey: ["capabilities"],
    queryFn: async () => {
      const { data, error } = await supabase.from("capabilities").select("*");
      if (error) throw error;
      return (data ?? []) as any[];
    },
  });

export const useProductEdge = () =>
  useQuery({
    queryKey: ["product_edge"],
    queryFn: async () => {
      const { data, error } = await supabase.from("product_edge").select("*").order("display_order");
      if (error) throw error;
      return (data ?? []) as any[];
    },
  });
