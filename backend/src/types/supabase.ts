export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      conversations: {
        Row: {
          created_at: string
          id: number
          initial_user_id: string
          random_user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          initial_user_id: string
          random_user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          initial_user_id?: string
          random_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversations_initial_user_id_fkey"
            columns: ["initial_user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_random_user_id_fkey"
            columns: ["random_user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      messages: {
        Row: {
          conversation_id: number | null
          created_at: string
          id: number
          text: string
        }
        Insert: {
          conversation_id?: number | null
          created_at?: string
          id?: number
          text: string
        }
        Update: {
          conversation_id?: number | null
          created_at?: string
          id?: number
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          }
        ]
      }
      plant_statistics: {
        Row: {
          created_at: string
          growth: number
          growth_multiplier: number
          id: number
          owner: string
          plant_id: number
        }
        Insert: {
          created_at?: string
          growth: number
          growth_multiplier: number
          id?: number
          owner: string
          plant_id: number
        }
        Update: {
          created_at?: string
          growth?: number
          growth_multiplier?: number
          id?: number
          owner?: string
          plant_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "plant_statistics_owner_fkey"
            columns: ["owner"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plant_statistics_plant_id_fkey"
            columns: ["plant_id"]
            referencedRelation: "plants"
            referencedColumns: ["id"]
          }
        ]
      }
      plants: {
        Row: {
          completed: boolean
          created_at: string
          growth: number
          growth_multiplier: number
          id: number
          name: string
          owner: string
        }
        Insert: {
          completed?: boolean
          created_at?: string
          growth?: number
          growth_multiplier?: number
          id?: number
          name: string
          owner?: string
        }
        Update: {
          completed?: boolean
          created_at?: string
          growth?: number
          growth_multiplier?: number
          id?: number
          name?: string
          owner?: string
        }
        Relationships: [
          {
            foreignKeyName: "plants_owner_fkey"
            columns: ["owner"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      problem_statistics: {
        Row: {
          created_at: string
          daily_amount: number
          goal: number
          id: number
          problem_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          daily_amount: number
          goal: number
          id?: number
          problem_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          daily_amount?: number
          goal?: number
          id?: number
          problem_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "problem_statistics_problem_id_fkey"
            columns: ["problem_id"]
            referencedRelation: "problems"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "problem_statistics_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      problems: {
        Row: {
          created_at: string
          current_goal: number
          goal_updated: string | null
          id: number
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_goal: number
          goal_updated?: string | null
          id?: number
          name: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_goal?: number
          goal_updated?: string | null
          id?: number
          name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "problems_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar: string | null
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          initialized: boolean
          last_name: string | null
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id: string
          initialized?: boolean
          last_name?: string | null
        }
        Update: {
          avatar?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          initialized?: boolean
          last_name?: string | null
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
