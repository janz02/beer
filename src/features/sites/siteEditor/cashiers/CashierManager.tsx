import React, { FC } from 'react'
import { useCashierManager } from './useCashierManager'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { GenericPopup } from 'components/popups/GenericPopup'
import { useTranslation } from 'react-i18next'
import { AddButton } from 'components/buttons/AddButton'
import { GenericModalForm } from 'components/popups/GenericModalForm'
import { Form, Input } from 'antd'
import { useCommonFormRules } from 'hooks'
import { SiteFeatureConfig } from 'features/sites/siteList/useSiteList'

export const CashierManager: FC<{ config: SiteFeatureConfig }> = ({ config }) => {
  const { t } = useTranslation()
  const rule = useCommonFormRules()

  const {
    canEdit,
    cashierManagerVisible,
    handleCreateCashier,
    cashierTableProps,
    cashierDeletePopupProps,
    cashierEditorFormModalProps
  } = useCashierManager(config)

  const listHeaderOptions = (
    <>
      {canEdit && (
        <AddButton size="middle" onClick={handleCreateCashier}>
          {t('cashier-list.add')}
        </AddButton>
      )}
    </>
  )

  return (
    <>
      <ResponsiveCard
        hidden={!cashierManagerVisible}
        disableAutoScale
        forTable
        innerTitle={t('cashier-list.table-title')}
        innerOptions={listHeaderOptions}
        paddedBottom
      >
        <ResponsiveTable hasHeaderOffset {...cashierTableProps} />
      </ResponsiveCard>

      <GenericPopup {...cashierDeletePopupProps} />

      <GenericModalForm {...cashierEditorFormModalProps}>
        <Form.Item
          label={t('cashier-editor.field.cashier-id')}
          extra={t('cashier-editor.field.cashier-id-help')}
          name="cashierId"
          rules={[
            rule.requiredString(t('error.validation.cashier.id-required')),
            rule.max(30, t('error.validation.cashier.id-max-length-30'))
          ]}
        >
          <Input maxLength={30} />
        </Form.Item>

        <Form.Item
          label={t('cashier-editor.field.digital-stamp-id')}
          name="digitalStampId"
          rules={[
            rule.requiredString(t('error.validation.cashier.digital-stamp-id-required')),
            rule.max(30, t('error.validation.cashier.digital-stamp-id-max-length-30'))
          ]}
        >
          <Input maxLength={30} />
        </Form.Item>
      </GenericModalForm>
    </>
  )
}
