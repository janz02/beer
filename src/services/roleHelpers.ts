import { Roles } from 'api/swagger/models'

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

export const pageViewRoles = {
  users: [Roles.Administrator, Roles.CampaignManager, Roles.PartnerManager],
  newsletters: [Roles.Administrator, Roles.CampaignManager],
  campaigns: comboRoles.forAll,
  couponCreator: [Roles.Administrator, Roles.CampaignManager, Roles.PartnerContactEditor],
  couponEditor: [Roles.Administrator, Roles.CampaignManager, ...comboRoles.forPartner],
  sites: comboRoles.forPartner,
  categories: comboRoles.forNkm,
  categoryEditor: [Roles.Administrator],
  segments: comboRoles.forNkm,
  profile: comboRoles.forPartner,
  readonlyProfile: comboRoles.forNkm,
  selfpartner: comboRoles.forPartner,
  partners: comboRoles.forNkm,
  contacts: comboRoles.forPartner,
  tags: [Roles.Administrator, Roles.CampaignManager, Roles.PartnerManager]
}
