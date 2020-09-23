import { Roles } from 'api/swagger/coupon'

/**
 * Group of roles to define more generic(flow specific/company specific) access rights.
 * ex. usage: hasPermission(comboRoles.forNkm)
 */
export const comboRoles = {
  forPartner: [Roles.PartnerContactApprover, Roles.PartnerContactEditor],
  forNkm: [
    Roles.Administrator,
    Roles.CampaignManager,
    Roles.PartnerManager,
    Roles.BusinessPartnerManager
  ],
  forAll: [
    Roles.Administrator,
    Roles.CampaignManager,
    Roles.PartnerManager,
    Roles.BusinessPartnerManager,
    Roles.PartnerContactApprover,
    Roles.PartnerContactEditor
  ]
}

/**
 * Specifies the permissions(required roles) for each page/menu item.
 * (Can be) used with hasPermission(roles) to check if the current user
 * has access to a specific menu item/feature/page section.
 * ex. hasPermission(pageViewRoles.campaigns)
 */
export const pageViewRoles = {
  users: [Roles.Administrator, Roles.CampaignManager, Roles.PartnerManager],
  newsletters: [Roles.Administrator, Roles.CampaignManager],
  campaigns: comboRoles.forAll,
  couponCreator: [Roles.Administrator, Roles.CampaignManager, Roles.PartnerContactEditor],
  couponEditor: [Roles.Administrator, Roles.CampaignManager, ...comboRoles.forPartner],
  sites: comboRoles.forPartner,
  settings: comboRoles.forNkm,
  categories: comboRoles.forNkm,
  categoryEditor: [Roles.Administrator],
  segments: comboRoles.forNkm,
  profile: comboRoles.forPartner,
  readonlyProfile: comboRoles.forNkm,
  selfpartner: comboRoles.forPartner,
  partners: comboRoles.forNkm,
  contacts: comboRoles.forPartner,
  tags: [Roles.Administrator, Roles.CampaignManager, Roles.PartnerManager],
  bpHistory: [Roles.Administrator]
}
