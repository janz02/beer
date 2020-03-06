import React, { FC, useMemo, useEffect } from 'react'
import { RootState } from 'app/rootReducer'
import { useSelector } from 'hooks/react-redux-hooks'
import { Status } from 'models/user'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { GenericModalForm } from 'components/popups/GenericModalForm'
import { Form, Select, Radio } from 'antd'
import { useCommonFormRules } from 'hooks'
import {
  getUserAccess,
  saveUserAccess,
  clearUserAccessEditor,
  UserType
} from './userAccessListSlice'
import Typography from 'antd/lib/typography'
import { Roles } from 'api/swagger/models'

const { Text } = Typography

interface UserAccessFormValues {
  role?: Roles | null
  status?: Status | null
}

export interface UserAccessEditorProps {
  visible?: boolean
  userId?: number | undefined
  userType?: UserType
  handleClose?: () => void
}

export const UserAccessEditor: FC<UserAccessEditorProps> = props => {
  const { visible, userId, handleClose, userType } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const rule = useCommonFormRules()

  const { editedUser, editorLoading } = useSelector((state: RootState) => state.userAccessList)

  useEffect(() => {
    if (!visible) return
    dispatch(getUserAccess(userId!))
  }, [dispatch, userId, visible])

  const roleOptions = useMemo(
    () => [
      {
        name: t('user-access.role.administrator'),
        value: Roles.Administrator
      },
      {
        name: t('user-access.role.campaignmanager'),
        value: Roles.CampaignManager
      },
      {
        name: t('user-access.role.businesspartnermanager'),
        value: Roles.BusinessPartnerManager
      },
      {
        name: t('user-access.role.partnercontactapprover'),
        value: Roles.PartnerContactApprover
      },
      {
        name: t('user-access.role.partnercontacteditor'),
        value: Roles.PartnerContactEditor
      },
      {
        name: t('user-access.role.partnermanager'),
        value: Roles.PartnerManager
      }
    ],
    [t]
  )

  const initialValues: UserAccessFormValues = useMemo(
    () => ({
      role: editedUser?.role,
      status: editedUser?.active ? Status.ACTIVE : Status.INACTIVE
    }),
    [editedUser]
  )

  return (
    <GenericModalForm
      initialValues={initialValues}
      loadingContent={editorLoading}
      modalProps={{
        visible,
        title: t('user-access.access-editor.title'),
        okText: t('common.save'),
        okButtonProps: {
          disabled: editorLoading
        },
        onCancel: handleClose,
        afterClose: () => {
          dispatch(clearUserAccessEditor())
        }
      }}
      formProps={{
        onFinish: (values: UserAccessFormValues) => {
          const { role, status } = values
          if (role && status) {
            dispatch(saveUserAccess(userId!, role, status === Status.ACTIVE, userType))
          }
          handleClose && handleClose()
        }
      }}
    >
      <Text>{editedUser?.name}</Text>

      <Form.Item name="role" label={t('user-access.field.role')} rules={[rule.required()]}>
        <Select onChange={(e: any) => console.log(e)}>
          {roleOptions?.map((r, i) => (
            <Select.Option key={i} value={r.value}>
              {r.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="status" label={t('user-access.field.status')} rules={[rule.required()]}>
        <Radio.Group buttonStyle="solid">
          <Radio.Button value={Status.INACTIVE}>
            {t('user-access.field.status-inactive')}
          </Radio.Button>
          <Radio.Button value={Status.ACTIVE}>{t('user-access.field.status-active')}</Radio.Button>
        </Radio.Group>
      </Form.Item>
    </GenericModalForm>
  )
}
