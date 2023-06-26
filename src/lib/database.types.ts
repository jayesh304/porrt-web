export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          updated_at: string;
          username: string;
          fullname: string;
          avatar_url: string;
          web_url: string;
        };
        Insert: {
          id: string;
          updated_at: string;
          username: string;
          fullname: string;
          avatar_url: string;
          web_url: string;
        };
        Update: {
          id: string;
          updated_at: string;
          username: string;
          fullname: string;
          avatar_url: string;
          web_url: string;
        };
      };
      links: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          web_url: string;
          image_url: string;
          title: string;
          sort_order: string;
          updated_at: string;
          description: string;
        };
        Insert: {
          id: string;
          created_at: string;
          user_id: string;
          web_url: string;
          image_url: string;
          title: string;
          sort_order: string;
          updated_at: string;
          description: string;
        };
        Update: {
          id: string;
          created_at: string;
          user_id: string;
          web_url: string;
          image_url: string;
          title: string;
          sort_order: string;
          updated_at: string;
          description: string;
        };
      };
    };
    Views: {};
    Functions: {
      derive_label_sort_from_label: {
        Args: { label: string };
        Returns: string;
      };
    };
    Enums: {
      partner_type: "technology" | "expert";
    };
  };
}
