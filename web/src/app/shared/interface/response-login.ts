import {User} from "./user.interface";

export interface ResponseLogin {
  user: User,
  token: string,
}
