import { api } from 'api'

export const NotificationLinkPreValidator = {
  async GetCoupon(id: number): Promise<boolean> {
    if (id <= 0) {
      return false
    }

    await api.coupon.coupons.getCoupon({ id })
    // If the call was unsuccessful, the await will return with an error, and the promise will be false
    return true
  },

  async GetPartnerContact(id: number): Promise<boolean> {
    await api.coupon.partnerContacts.getPartnerContact({ id })
    // If the call was unsuccessful, the await will return with an error, and the promise will be false
    return true
  },

  async GetPartner(id: number): Promise<boolean> {
    await api.coupon.partner.getPartner({ id })
    // If the call was unsuccessful, the await will return with an error, and the promise will be false
    return true
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async CampaignMovedToWaitingState(actualId: number, parentId: number): Promise<boolean> {
    return await this.GetCoupon(actualId)
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async PartnerContactRegistered(actualId: number, parentId: number): Promise<boolean> {
    return (await this.GetPartner(parentId)) && (await this.GetPartnerContact(actualId))
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
