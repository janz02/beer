import { useMemo } from 'react'
import { Roles } from 'api/swagger/models'
import { UserType } from './userAccessListSlice'
import { useTranslation } from 'react-i18next'
import { ColumnFilterItem } from 'antd/lib/table/interface'

type UseUserAccessRoleGeneratorUtils = ColumnFilterItem[]

export const useUserAccessRoleGenerator = (
  userType?: UserType
): UseUserAccessRoleGeneratorUtils => {
  const { t } = useTranslation()

  const roleOptions = useMemo(() => {
    switch (userType) {
      case UserType.NKM:
        return [
          {
            text: t('user-access.role.administrator'),
            value: Roles.Administrator
          },
          {
            text: t('user-access.role.campaignmanager'),
            value: Roles.CampaignManager
          },
          {
            text: t('user-access.role.businesspartnermanager'),
            value: Roles.BusinessPartnerManager
          },
          {
            text: t('user-access.role.partnermanager'),
            value: Roles.PartnerManager
          }
        ]
      case UserType.PARTNER:
        return [
          {
            text: t('user-access.role.partnercontactapprover'),
            value: Roles.PartnerContactApprover
          },
          {
            text: t('user-access.role.partnercontacteditor'),
            value: Roles.PartnerContactEditor
          }
        ]
      default:
        return []
    }
  }, [t, userType])

  return roleOptions
}
