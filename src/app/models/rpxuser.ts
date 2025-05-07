import {AllowedAccountTypes} from "../helpers/enum/account-type.enum";

export interface RpxUser {
  id: number;
  user_type: AllowedAccountTypes;
  default_picture: string;
  first_name: string;
  last_name: string;
  description: string;
  privacy: boolean;
  ads: boolean;
  phone_number: string;
  created_at: string;
  updated_at: string;
}
