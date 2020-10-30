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
  profiles: [Roles.Administrator, Roles.CampaignManager, Roles.PartnerManager],
  newsletters: [Roles.Administrator, Roles.CampaignManager],
  couponCampaigns: comboRoles.forAll,
  couponCreator: [Roles.Administrator, Roles.CampaignManager, Roles.PartnerContactEditor],
  couponEditor: [Roles.Administrator, Roles.CampaignManager, ...comboRoles.forPartner],
  sites: comboRoles.forPartner,
  sitesEditor: [
    Roles.Administrator,
    Roles.CampaignManager,
    Roles.PartnerManager,
    Roles.MainPartnerContact
  ],
  settings: comboRoles.forAll,
  settingsEditor: [Roles.Administrator],
  couponCampaignCategories: [Roles.Administrator],
  segmentationCategories: [Roles.Administrator],
  segments: comboRoles.forNkm,
  profile: comboRoles.forPartner,
  readonlyProfile: comboRoles.forNkm,
  selfpartner: comboRoles.forPartner,
  partners: comboRoles.forNkm,
  contacts: [Roles.MainPartnerContact],
  contactsEditor: [
    Roles.Administrator,
    Roles.CampaignManager,
    Roles.PartnerManager,
    Roles.MainPartnerContact
  ],
  tags: [Roles.Administrator, Roles.CampaignManager, Roles.PartnerManager],
  products: [Roles.Administrator],
  productEditor: [Roles.Administrator],
  bpHistory: [Roles.Administrator],
  permissions: [Roles.Administrator],
  permissionEditor: [Roles.Administrator],
  segmentations: [Roles.Administrator],
  segmentationEditor: [Roles.Administrator]
}
