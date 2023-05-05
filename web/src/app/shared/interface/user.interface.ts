export interface User {
  id?: number;
  firstname?: string;
  lastname?: string;
  phone_number?: string;
  email?: string;
  old_email?: string;
  password?: string;
  old_password?: string;
  ROLE?: string;
  info_status?: string;
  is_valid_email?: boolean;
  id_category?: number;
  createdAt?: string;
  updateAt?: string;
}
