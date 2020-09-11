import { couponApi } from 'api'

export const NotificationLinkPreValidator = {
  async GetCoupon(id: number): Promise<boolean> {
    if (id <= 0) {
      return false
    }

    const response = await couponApi.coupons.getCoupon({ id })
    return response !== undefined
  },

  async GetPartner(id: number): Promise<boolean> {
    const response = await couponApi.partner.getPartner({ id })
    return response !== undefined
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async CampaignMovedToWaitingState(actualId: number, parentId: number): Promise<boolean> {
    return await this.GetCoupon(actualId)
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async PartnerContactRegistered(actualId: number, parentId: number): Promise<boolean> {
    return await this.GetPartner(parentId)
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async CouponCountDepleted(actualId: number, parentId: number): Promise<boolean> {
    return await this.GetCoupon(actualId)
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async CouponClosed(actualId: number, parentId: number): Promise<boolean> {
    return await this.GetCoupon(actualId)
  }
}
