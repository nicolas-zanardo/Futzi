export interface User {
  id?: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  ROLE: string;
  isValidMail: boolean;
  id_category?: number;
}
