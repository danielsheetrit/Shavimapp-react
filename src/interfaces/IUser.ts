export interface IUser {
  _id: string;
  username: string;
  first_name: string;
  last_name: string;
  user_type: "user" | "admin" | "chief";
  created_at: Date;
  work_group: number;
  connected: boolean;
  avatar: string;
  language: "en" | "ru" | "he" | "ar";
  clicks: Map<string, number>;
}

