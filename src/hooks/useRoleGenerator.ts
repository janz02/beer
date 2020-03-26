import { useMemo } from 'react'
import { Roles } from 'api/swagger/models'
import { useTranslation } from 'react-i18next'
import { ColumnFilterItem } from 'antd/lib/table/interface'
import { UserType } from 'models/user'

type UseRoleGeneratorUtils = ColumnFilterItem[]

export const useRoleGenerator = (userType?: UserType): UseRoleGeneratorUtils => {
  const { t } = useTranslation()

  const roleOptions = useMemo(() => {
    switch (userType) {
      case UserType.NKM:
        return [
          {
            text: t('user.role.administrator'),
            value: Roles.Administrator
          },
          {
            text: t('user.role.campaignmanager'),
            value: Roles.CampaignManager
          },
          {
            text: t('user.role.businesspartnermanager'),
            value: Roles.BusinessPartnerManager
          },
          {
            text: t('user.role.partnermanager'),
            value: Roles.PartnerManager
          }
        ]
      case UserType.PARTNER:
        return [
          {
            text: t('user.role.partnercontactapprover'),
            value: Roles.PartnerContactApprover
          },
          {
            text: t('user.role.partnercontacteditor'),
            value: Roles.PartnerContactEditor
          }
        ]
      default:
        return []
    }
  }, [t, userType])

  return roleOptions
}