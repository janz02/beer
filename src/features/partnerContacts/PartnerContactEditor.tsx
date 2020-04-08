/* eslint-disable react/jsx-boolean-value */
import React, { FC, useEffect, useRef } from 'react'
import { GenericModalFormEditorParams } from 'hooks/useGenericModalEditorUtils'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { AppThunk } from 'app/store'
import { GenericModalForm } from 'components/popups/GenericModalForm'
import { RootState } from 'app/rootReducer'
import { PartnerContactsState } from './partnerContactsSliceFactory'
import { useSelector } from 'hooks/react-redux-hooks'
import { PartnerContact } from 'models/partnerContact'
import { Form, Input, Select, Radio } from 'antd'
import { useCommonFormRules } from 'hooks'
import { useRoleGenerator } from 'hooks/useRoleGenerator'
import { useReusablePartnerContacts } from './useReusablePartnerContacts'
import { UserType } from 'models/user'

export interface PartnerContactsParams {
  visible?: boolean
  isNew?: boolean
  partnerContactId?: number
}

export interface PartnerContactsEditorProps {
  params: GenericModalFormEditorParams
  selector: (state: RootState) => PartnerContactsState
  afterClose: () => void
  getItem: (id: number) => void
  handleExit: () => void
  saveAction: (id: number, contact: PartnerContact, savingSelf: boolean) => AppThunk
}

export const PartnerContactEditor: FC<PartnerContactsEditorProps> = props => {
  const { params, handleExit, afterClose, selector, saveAction, getItem } = props
  const { visible, id } = params
  const { editedContact, loadingEditor } = useSelector(selector)

  const dispatch = useDispatch()
  const { t } = useTranslation()
  const rule = useCommonFormRules()

  const { permission, userType, editingSelf } = useReusablePartnerContacts()

  const modalTitle = permission.editor ? t('partner-contact.editor') : t('partner-contact.viewer')

  const roleOptions = useRoleGenerator(userType)

  // TODO: QUICK FIXED: render infinite loop, this fixes it but couldn't find the trigger
  const handleGetItemRef = useRef<() => void | null>()
  useEffect(() => {
    handleGetItemRef.current = () => {
      id && getItem(id)
    }
  }, [getItem, id])
  useEffect(() => {
    visible && handleGetItemRef.current && handleGetItemRef.current()
  }, [visible])

  const onSave = async (values: any): Promise<void> => {
    const saved: any = await dispatch(
      saveAction(
        editedContact?.id!,
        { ...values, isActive: values.isActive === 'true' },
        editingSelf
      )
    )
    saved && handleExit()
  }

  return (
    <GenericModalForm
      loadingContent={loadingEditor}
      hideFooter={!permission.editor}
      modalProps={{
        visible: visible,
        title: modalTitle,
        okText: t('common.save'),
        afterClose: afterClose,
        onCancel: handleExit
      }}
      formProps={{
        name: 'category-editor',
        onFinish: onSave
      }}
      initialValues={{ ...editedContact, isActive: editedContact?.isActive?.toString() }}
    >
      <Form.Item
        label={t('partner-contact.field.name')}
        name="name"
        rules={[rule.requiredString(), rule.max(50)]}
      >
        <Input disabled={!permission.editor} maxLength={50} />
      </Form.Item>

      {!editingSelf && (
        <Form.Item name="isActive" label={t('user-access.field.status')} rules={[rule.required()]}>
          <Radio.Group disabled={!permission.editor} buttonStyle="solid">
            <Radio.Button value="false">{t('user-access.field.status-inactive')}</Radio.Button>
            <Radio.Button value="true">{t('user-access.field.status-active')}</Radio.Button>
          </Radio.Group>
        </Form.Item>
      )}

      <Form.Item
        label={t('partner-contact.field.email')}
        name="email"
        rules={[rule.requiredString(), rule.email(), rule.max(50)]}
      >
        <Input disabled={!permission.editor} maxLength={50} />
      </Form.Item>

      <Form.Item
        label={t('partner-contact.field.phone')}
        name="phone"
        rules={[rule.requiredString(), rule.max(50)]}
      >
        <Input disabled={!permission.editor} maxLength={50} />
      </Form.Item>

      {!editingSelf && (
        <Form.Item
          name="role"
          label={
            userType === UserType.NKM
              ? t('partner-contact.field.role')
              : t('partner-contact.field.type')
          }
          rules={[rule.requiredString()]}
        >
          <Select disabled={!permission.editor}>
            {roleOptions?.map((r, i) => (
              <Select.Option key={i} value={r.value}>
                {r.text}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )}
    </GenericModalForm>
  )
}
