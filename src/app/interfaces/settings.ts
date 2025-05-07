import {User} from "../models/user";
import {RpxUser} from "../models/rpxuser";
import {Business} from "../models/business";
import {LoyaltyPointBalance} from "../models/loyalty-point-balance";

export interface SettingsResponse {
  success: boolean;
  user: User;
  rpx_user: RpxUser;
  business: Business;
  is_subscribed: boolean;
  userSubscriptionPlan: string;
  loyalty_point_balance: LoyaltyPointBalance;
  next_payment: string;
  ends_at: string;
}
