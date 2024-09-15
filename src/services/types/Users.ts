import { Experience } from "./Experience";

export type Users = {
  id: number;
  name: string;
  email: string;
  description: string;
  experiences?: Experience[];
  category: string;
}