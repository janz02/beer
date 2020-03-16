import React, { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'hooks/react-redux-hooks'
import { RootState } from 'app/rootReducer'
import { useCommonFormRules } from 'hooks'
import { getCashier, saveCashier, clearCashierEditor } from '../siteEditor/siteEditorSlice'
import { Cashier } from 'models/cashier'
import { GenericModalFormEditorParams } from 'hooks/useGenericModalEditorUtils'
import { GenericModalForm } from 'components/popups/GenericModalForm'

interface CashierEditorProps {
  params: GenericModalFormEditorParams
  onExit: () => void
  afterClose: () => void
}

export const CashierEditor: FC<CashierEditorProps> = props => {
  const { params, onExit, afterClose } = props
  const { visible, id, isNew } = params
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const { cashier } = useSelector((state: RootState) => state.siteEditor)
  const rule = useCommonFormRules()

  useEffect(() => {
    if (!id || isNew) {
      return
    }

    dispatch(getCashier(id))
  }, [dispatch, isNew, id])

  useEffect(() => {
    if (!visible) return

    cashier ? form.setFieldsValue({ ...cashier }) : form.resetFields()
  }, [cashier, form, visible])

  const modalTitle = isNew ? t('cashier-editor.editor-create') : t('cashier-editor.editor-edit')

  const onSave = async (cashier: Cashier): Promise<void> => {
    dispatch(saveCashier({ ...cashier, id }))
    onExit()
  }

  const afterCloseExtended = (): void => {
    afterClose()
    dispatch(clearCashierEditor())
  }

  return (
    <GenericModalForm
      modalProps={{
        visible: visible,
        title: modalTitle,
        okText: t('common.save'),
        afterClose: afterCloseExtended,
        onCancel: onExit
      }}
      formProps={{
        name: 'cashier-editor',
        onFinish: onSave
      }}
      initialValues={cashier}
    >
      <Form.Item
        label={t('cashier-editor.field.cashier-id')}
        name="cashierId"
        rules={[rule.required(), rule.max(30)]}
      >
        <Input maxLength={30} />
      </Form.Item>

      <Form.Item
        label={t('cashier-editor.field.digital-stamp-id')}
        name="digitalStampId"
        rules={[rule.required(), rule.max(30)]}
      >
        <Input maxLength={30} />
      </Form.Item>
    </GenericModalForm>
  )
}