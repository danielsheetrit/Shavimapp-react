export interface IQuestion {
  _id: string;
  sender: string | "system";
  receiver: string;
  question_type: "text" | "img" | "video" | "postcard" | "feeling";
  createdAt: Date;
  answer: string;
  isSystem: boolean;
  url: string;
  text: string;
}
