import { useMemo } from 'react'
import { Roles } from 'api/swagger/models'
import { useTranslation } from 'react-i18next'
import { ColumnFilterItem } from 'antd/lib/table/interface'
import { UserType } from 'models/user'

export type RoleOptions = ColumnFilterItem[]

export const useRoleGenerator = (userType?: UserType): RoleOptions => {
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
            text: t('user.role-short.mainpartnercontact'),
            value: Roles.MainPartnerContact
          },
          {
            text: t('user.role-short.normalpartnercontact'),
            value: Roles.NormalPartnerContact
          }
        ]
      default:
        return []
    }
  }, [t, userType])

  return roleOptions
}
