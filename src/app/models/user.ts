import { RpxUser } from "./rpxuser";
import { Business } from "./business";

export interface User {
  id: number;
  uuid: string;
  username: string;
  email: string;
  ends_at: string;
  trial_ends_at: string;
  created_at: string;
  updated_at: string;
  rpx_user: RpxUser;
  business: Business;
  loyalty_point_balance: any;
  next_payment: string;
  userSubscriptionPlan: BusinessMembership;
}

export enum BusinessMembership {
  Starter = "rpx.business_subscription_price1",
  Intermediate = "rpx.business_subscription_price_1_2",
  Ultimate = "rpx.business_subscription_price_2_2",
  Legacy = "rpx.business_subscription_price",
}
