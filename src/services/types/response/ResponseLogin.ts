export type ResponseLogin = {
  token?: string;
  message?: string;
  user?: {
    name: string;
    email: string;
  }
  error?: unknown;
  status: number;
}