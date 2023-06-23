type ClicksType = {
  [key: string]: {
    createdAt: Date;
    count: number;
  };
};

export interface IUser {
  _id: string;
  username: string;
  first_name: string;
  last_name: string;
  user_type: "user" | "admin" | "chief";
  created_at: Date;
  work_group: number;
  connected: boolean;
  avatar: Buffer;
  language: "en" | "ru" | "he" | "ar";
  clicks: ClicksType;
}
