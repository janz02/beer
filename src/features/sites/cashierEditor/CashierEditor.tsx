import React, { FC, useEffect } from 'react'
import { Modal, Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'hooks/react-redux-hooks'
import { RootState } from 'app/rootReducer'
import { FormProps, FormLayout } from 'antd/lib/form/Form'
import { useIsMobile, useCommonFormRules } from 'hooks'
import { getCashier, saveCashier, clearCashierEditor } from '../siteEditor/siteEditorSlice'
import { Cashier } from 'models/cashier'

enum EditorMode {
  EDIT = 'edit',
  CREATE = 'create'
}

export interface CashierEditorParams {
  visible?: boolean
  isNew?: boolean
  cashierId?: number
}

interface CashierEditorProps {
  params: CashierEditorParams
  onExit: () => void
  afterClose: () => void
}

export const CashierEditor: FC<CashierEditorProps> = props => {
  const { params, onExit, afterClose } = props
  const { visible, cashierId, isNew } = params
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const { cashier, error } = useSelector((state: RootState) => state.siteEditor)
  const isMobile = useIsMobile()
  const rule = useCommonFormRules()

  const mode = isNew || cashierId === ('undefined' as any) ? EditorMode.CREATE : EditorMode.EDIT

  useEffect(() => {
    if (!cashierId || mode !== EditorMode.EDIT) {
      return
    }

    dispatch(getCashier(cashierId))
  }, [dispatch, cashierId, mode])

  useEffect(() => {
    if (!visible) return

    cashier ? form.setFieldsValue({ ...cashier }) : form.resetFields()
  }, [cashier, form, visible])

  const modalTitle =
    mode === EditorMode.EDIT ? t('cashier-editor.editor-edit') : t('cashier-editor.editor-create')

  const formLayout: FormLayout = isMobile ? 'vertical' : 'horizontal'
  const formItemLayout: Partial<FormProps> = isMobile
    ? {}
    : {
        wrapperCol: { span: 16 }
      }

  const onSave = async (cashier: Cashier): Promise<void> => {
    dispatch(saveCashier({ ...cashier, id: cashierId }))
    onExit()
  }

  const afterCloseExtended = (): void => {
    afterClose()
    dispatch(clearCashierEditor())
  }

  return (
    <Modal
      forceRender
      title={modalTitle}
      visible={visible}
      okText={t('common.save')}
      onOk={() => form.submit()}
      onCancel={onExit}
      afterClose={afterCloseExtended}
      destroyOnClose
    >
      <Form
        form={form}
        name="cashier-editor"
        {...formItemLayout}
        layout={formLayout}
        onFinish={onSave}
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
        <div>{error}</div>
      </Form>
    </Modal>
  )
}
