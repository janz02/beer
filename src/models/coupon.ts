import moment from 'moment';

export interface Coupon {
  id: number;
  name?: string;
  description?: string;
  rank?: string;
  category?: string;
  discountType?: string;
  discountAmount?: number;
  distributionStartDate?: moment.Moment;
  distributionEndDate?: moment.Moment;
  expirationDate?: moment.Moment;
  couponCount?: number;
  minimumShoppingValue?: number;
}
