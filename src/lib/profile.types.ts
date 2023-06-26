import { Database } from "./database.types";
type Links = Database["public"]["Tables"]["links"]["Row"];
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

interface ILinkItem {
  id?: string | undefined;
  user_id?: string | undefined;
  web_url?: string | undefined;
  image_url?: Links["image_url"];
  title?: string | undefined;
  sort_order?: number | undefined;
  description?: string | undefined;
}

interface IUser {
  id: string;
  username: string;
  full_name: string;
  avatar_url: Profiles["avatar_url"];
  about: string;
  web_url: string;
}

export type { ILinkItem, IUser };
