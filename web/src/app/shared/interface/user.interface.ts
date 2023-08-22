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
  tokenURL?: string;
  token_valid_email?: string;
  token_reset_password?: string;
  token_time_validity?: number;
  is_valid_email?: boolean;
  id_category?: number;
  createdAt?: string;
  updateAt?: string;
}
