export interface Coupon {
  id: number;
  name?: string;
  description?: string;
  rank?: string;
  category?: string;
  discountType?: string;
  discountAmount?: number;
  distributionStartDate?: Date;
  distributionEndDate?: Date;
  expirationDate?: Date;
  couponCount?: number;
  minimumShoppingValue?: number;
}
