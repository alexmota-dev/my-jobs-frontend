export type ResponseRegister = {
  message?: any;
  user?: {
    id: number;
    name: string;
    email: string;
    description?: string;
  }
  error?: unknown;
  status: number;
}