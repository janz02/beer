import { CampaignAdGroup } from './campaignAdGroup'
import { CampaignFunctionPermission } from './campaignFunctionPermission'
import { CampaignUser } from './campaignUser'

export interface CampaignPermission {
  id?: number
  name?: string | null
  createdDate?: Date
  createdBy?: number
  modifiedDate?: Date | null
  modifiedBy?: number | null
  adGroups?: Array<CampaignAdGroup> | null
  users?: Array<CampaignUser> | null
  functionPermissions?: Array<CampaignFunctionPermission> | null
}
