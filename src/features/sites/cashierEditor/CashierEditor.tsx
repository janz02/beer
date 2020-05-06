import React, { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'hooks/react-redux-hooks'
import { RootState } from 'app/rootReducer'
import { useCommonFormRules } from 'hooks'
import { siteEditorActions } from '../siteEditor/siteEditorSlice'
import { Cashier } from 'models/cashier'
import { GenericModalFormEditorParams } from 'hooks/useGenericModalEditorUtils'
import { GenericModalForm } from 'components/popups/GenericModalForm'
import { FeatureState } from 'models/featureState'

interface CashierEditorProps {
  params: GenericModalFormEditorParams
  handleExit: () => void
  afterClose: () => void
}

export const CashierEditor: FC<CashierEditorProps> = props => {
  const { params, handleExit, afterClose } = props
  const { visible, id, isNew } = params
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const { cashier, cashierEditorState } = useSelector((state: RootState) => state.siteEditor)
  const rule = useCommonFormRules()
  const loadingCashierEditor = cashierEditorState === FeatureState.Loading

  useEffect(() => {
    if (!id || isNew) {
      return
    }

    dispatch(siteEditorActions.getCashier(id))
  }, [dispatch, isNew, id])

  useEffect(() => {
    if (!visible) return

    cashier ? form.setFieldsValue({ ...cashier }) : form.resetFields()
  }, [cashier, form, visible])

  const modalTitle = isNew ? t('cashier-editor.editor-create') : t('cashier-editor.editor-edit')

  const handleSave = async (cashier: Cashier): Promise<void> => {
    const saved: any = await dispatch(siteEditorActions.saveCashier({ ...cashier, id }))
    saved && handleExit()
  }

  const afterCloseExtended = (): void => {
    afterClose()
    dispatch(siteEditorActions.clearCashierEditor())
  }

  return (
    <GenericModalForm
      // loadingAction={loadingCashierSave}
      loadingContent={loadingCashierEditor}
      modalProps={{
        visible: visible,
        title: modalTitle,
        okText: t('common.save'),
        afterClose: afterCloseExtended,
        onCancel: handleExit
      }}
      formProps={{
        name: 'cashier-editor',
        onFinish: handleSave
      }}
      initialValues={cashier}
    >
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
  )
}
