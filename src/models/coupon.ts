import moment from 'moment';
import { CouponRank } from 'api/swagger/models';

export interface Coupon {
  id?: number;
  name?: string;
  description?: string;
  rank?: CouponRank;
  categoryId?: number;
  // discountType?: string;
  // discountAmount?: number;
  // distributionStartDate?: moment.Moment;
  // distributionEndDate?: moment.Moment;
  // expirationDate?: moment.Moment;
  // couponCount?: number;
  // minimumShoppingValue?: number;
}
