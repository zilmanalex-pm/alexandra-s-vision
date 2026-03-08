export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      capabilities: {
        Row: {
          category: string | null
          id: string
          proficiency_label: string | null
          skill_name: string | null
        }
        Insert: {
          category?: string | null
          id?: string
          proficiency_label?: string | null
          skill_name?: string | null
        }
        Update: {
          category?: string | null
          id?: string
          proficiency_label?: string | null
          skill_name?: string | null
        }
        Relationships: []
      }
      case_studies: {
        Row: {
          id: string
          is_featured: boolean | null
          measurable_impact: Json | null
          problem_statement: string | null
          process_steps: Json | null
          title: string | null
        }
        Insert: {
          id?: string
          is_featured?: boolean | null
          measurable_impact?: Json | null
          problem_statement?: string | null
          process_steps?: Json | null
          title?: string | null
        }
        Update: {
          id?: string
          is_featured?: boolean | null
          measurable_impact?: Json | null
          problem_statement?: string | null
          process_steps?: Json | null
          title?: string | null
        }
        Relationships: []
      }
      metrics: {
        Row: {
          description: string | null
          display_order: number | null
          id: string
          label: string | null
          value: string | null
        }
        Insert: {
          description?: string | null
          display_order?: number | null
          id?: string
          label?: string | null
          value?: string | null
        }
        Update: {
          description?: string | null
          display_order?: number | null
          id?: string
          label?: string | null
          value?: string | null
        }
        Relationships: []
      }
      product_edge: {
        Row: {
          bullet_points: Json | null
          display_order: number | null
          icon_name: string | null
          id: string
          title: string | null
        }
        Insert: {
          bullet_points?: Json | null
          display_order?: number | null
          icon_name?: string | null
          id?: string
          title?: string | null
        }
        Update: {
          bullet_points?: Json | null
          display_order?: number | null
          icon_name?: string | null
          id?: string
          title?: string | null
        }
        Relationships: []
      }
      profile: {
        Row: {
          cv_url: string | null
          email: string | null
          full_name: string | null
          hero_headline: string | null
          id: string
          job_title: string | null
          linkedin_url: string | null
          location: string | null
          phone: string | null
          short_bio: string | null
          sub_headline: string | null
          value_statement: string | null
        }
        Insert: {
          cv_url?: string | null
          email?: string | null
          full_name?: string | null
          hero_headline?: string | null
          id?: string
          job_title?: string | null
          linkedin_url?: string | null
          location?: string | null
          phone?: string | null
          short_bio?: string | null
          sub_headline?: string | null
          value_statement?: string | null
        }
        Update: {
          cv_url?: string | null
          email?: string | null
          full_name?: string | null
          hero_headline?: string | null
          id?: string
          job_title?: string | null
          linkedin_url?: string | null
          location?: string | null
          phone?: string | null
          short_bio?: string | null
          sub_headline?: string | null
          value_statement?: string | null
        }
        Relationships: []
      }
      site_analytics: {
        Row: {
          id: string
          page_path: string | null
          source: string | null
          user_agent: string | null
          visited_at: string | null
        }
        Insert: {
          id?: string
          page_path?: string | null
          source?: string | null
          user_agent?: string | null
          visited_at?: string | null
        }
        Update: {
          id?: string
          page_path?: string | null
          source?: string | null
          user_agent?: string | null
          visited_at?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          client_name: string | null
          client_title: string | null
          company: string | null
          display_order: number | null
          id: string
          quote_text: string | null
        }
        Insert: {
          client_name?: string | null
          client_title?: string | null
          company?: string | null
          display_order?: number | null
          id?: string
          quote_text?: string | null
        }
        Update: {
          client_name?: string | null
          client_title?: string | null
          company?: string | null
          display_order?: number | null
          id?: string
          quote_text?: string | null
        }
        Relationships: []
      }
      values: {
        Row: {
          created_at: string | null
          display_order: number | null
          id: string
          text: string | null
        }
        Insert: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          text?: string | null
        }
        Update: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          text?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
