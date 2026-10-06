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
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      adviser_links: {
        Row: {
          adviser_email: string
          created_at: string
          id: string
          student_id: string
        }
        Insert: {
          adviser_email: string
          created_at?: string
          id?: string
          student_id: string
        }
        Update: {
          adviser_email?: string
          created_at?: string
          id?: string
          student_id?: string
        }
        Relationships: []
      }
      application_documents: {
        Row: {
          application_id: string
          document_id: string
          user_id: string
        }
        Insert: {
          application_id: string
          document_id: string
          user_id: string
        }
        Update: {
          application_id?: string
          document_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "application_documents_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "application_documents_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
        ]
      }
      applications: {
        Row: {
          adviser_comment: string
          created_at: string
          id: string
          priority: number
          programme_id: string
          shortlisted: boolean
          status: string
          tier: string
          updated_at: string
          user_id: string
        }
        Insert: {
          adviser_comment?: string
          created_at?: string
          id?: string
          priority?: number
          programme_id: string
          shortlisted?: boolean
          status?: string
          tier?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          adviser_comment?: string
          created_at?: string
          id?: string
          priority?: number
          programme_id?: string
          shortlisted?: boolean
          status?: string
          tier?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_programme_id_fkey"
            columns: ["programme_id"]
            isOneToOne: false
            referencedRelation: "programmes"
            referencedColumns: ["id"]
          },
        ]
      }
      deadlines: {
        Row: {
          created_at: string
          due_date: string
          id: string
          label: string
          owner_id: string | null
          programme_id: string | null
        }
        Insert: {
          created_at?: string
          due_date: string
          id?: string
          label: string
          owner_id?: string | null
          programme_id?: string | null
        }
        Update: {
          created_at?: string
          due_date?: string
          id?: string
          label?: string
          owner_id?: string | null
          programme_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "deadlines_programme_id_fkey"
            columns: ["programme_id"]
            isOneToOne: false
            referencedRelation: "programmes"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          created_at: string
          doc_type: string
          file_name: string
          file_path: string
          id: string
          link: string
          notes: string
          status: string
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          doc_type?: string
          file_name?: string
          file_path?: string
          id?: string
          link?: string
          notes?: string
          status?: string
          title: string
          user_id: string
        }
        Update: {
          created_at?: string
          doc_type?: string
          file_name?: string
          file_path?: string
          id?: string
          link?: string
          notes?: string
          status?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      notes: {
        Row: {
          application_id: string
          body: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          application_id: string
          body: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          application_id?: string
          body?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notes_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          currency: string
          display_name: string | null
          gpa: string
          gpa_scale: string
          id: string
          plan: string
          role: string
          target_intake: string
        }
        Insert: {
          created_at?: string
          currency?: string
          display_name?: string | null
          gpa?: string
          gpa_scale?: string
          id: string
          plan?: string
          role?: string
          target_intake?: string
        }
        Update: {
          created_at?: string
          currency?: string
          display_name?: string | null
          gpa?: string
          gpa_scale?: string
          id?: string
          plan?: string
          role?: string
          target_intake?: string
        }
        Relationships: []
      }
      programmes: {
        Row: {
          application_fee: number
          created_at: string
          currency: string
          degree: string
          duration_months: number
          english_test: string
          id: string
          intake: string
          interview: boolean
          min_gpa: number | null
          name: string
          owner_id: string | null
          portfolio_required: boolean
          references_required: number
          study_mode: string
          summary: string
          tuition: number
          university_id: string
        }
        Insert: {
          application_fee?: number
          created_at?: string
          currency?: string
          degree?: string
          duration_months?: number
          english_test?: string
          id?: string
          intake?: string
          interview?: boolean
          min_gpa?: number | null
          name: string
          owner_id?: string | null
          portfolio_required?: boolean
          references_required?: number
          study_mode?: string
          summary?: string
          tuition?: number
          university_id: string
        }
        Update: {
          application_fee?: number
          created_at?: string
          currency?: string
          degree?: string
          duration_months?: number
          english_test?: string
          id?: string
          intake?: string
          interview?: boolean
          min_gpa?: number | null
          name?: string
          owner_id?: string | null
          portfolio_required?: boolean
          references_required?: number
          study_mode?: string
          summary?: string
          tuition?: number
          university_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "programmes_university_id_fkey"
            columns: ["university_id"]
            isOneToOne: false
            referencedRelation: "universities"
            referencedColumns: ["id"]
          },
        ]
      }
      requirements: {
        Row: {
          created_at: string
          detail: string
          doc_type: string | null
          id: string
          label: string
          owner_id: string | null
          programme_id: string
        }
        Insert: {
          created_at?: string
          detail?: string
          doc_type?: string | null
          id?: string
          label: string
          owner_id?: string | null
          programme_id: string
        }
        Update: {
          created_at?: string
          detail?: string
          doc_type?: string | null
          id?: string
          label?: string
          owner_id?: string | null
          programme_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "requirements_programme_id_fkey"
            columns: ["programme_id"]
            isOneToOne: false
            referencedRelation: "programmes"
            referencedColumns: ["id"]
          },
        ]
      }
      status_records: {
        Row: {
          application_id: string
          created_at: string
          id: string
          status: string
          user_id: string
        }
        Insert: {
          application_id: string
          created_at?: string
          id?: string
          status: string
          user_id: string
        }
        Update: {
          application_id?: string
          created_at?: string
          id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "status_records_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          application_id: string | null
          created_at: string
          done: boolean
          due_date: string | null
          id: string
          title: string
          user_id: string
        }
        Insert: {
          application_id?: string | null
          created_at?: string
          done?: boolean
          due_date?: string | null
          id?: string
          title: string
          user_id: string
        }
        Update: {
          application_id?: string | null
          created_at?: string
          done?: boolean
          due_date?: string | null
          id?: string
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      universities: {
        Row: {
          city: string
          country: string
          created_at: string
          id: string
          name: string
          owner_id: string | null
        }
        Insert: {
          city?: string
          country?: string
          created_at?: string
          id?: string
          name: string
          owner_id?: string | null
        }
        Update: {
          city?: string
          country?: string
          created_at?: string
          id?: string
          name?: string
          owner_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_adviser_for: { Args: { _student: string }; Returns: boolean }
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
