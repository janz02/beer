import React, { FC, useMemo, useEffect } from 'react'
import { RootState } from 'app/rootReducer'
import { useSelector } from 'hooks/react-redux-hooks'
import { Role, Status } from 'models/user'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { GenericModalForm } from 'components/popups/GenericModalForm'
import { Form, Select, Radio } from 'antd'
import { useCommonFormRules } from 'hooks'
import { getUserAccess, saveUserAccess, clearUserAccessEditor } from './userAccessListSlice'
import Typography from 'antd/lib/typography'

const { Text } = Typography

interface UserAccessFormValues {
  role?: Role | null
  status?: Status | null
}

export interface UserAccessEditorProps {
  visible?: boolean
  userId?: number | undefined
  handleClose?: () => void
}

export const UserAccessEditor: FC<UserAccessEditorProps> = props => {
  const { visible, userId, handleClose } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const rule = useCommonFormRules()

  const { editedUser, editorLoading } = useSelector((state: RootState) => state.userAccessList)

  useEffect(() => {
    if (!visible || userId === undefined) return
    dispatch(getUserAccess(userId))
  }, [dispatch, userId, visible])

  const roleOptions = useMemo(
    () => [
      {
        name: t('user-access.role.none'),
        value: Role.NONE
      },
      {
        name: t('user-access.role.administrator'),
        value: Role.ADMINISTRATOR
      },
      {
        name: t('user-access.role.campaignmanager'),
        value: Role.CAMPAIGNMANAGER
      },
      {
        name: t('user-access.role.businesspartnermanager'),
        value: Role.BUSINESSPARTNERMANAGER
      },
      {
        name: t('user-access.role.partnercontactapprover'),
        value: Role.PARTNERCONTACTAPPROVER
      },
      {
        name: t('user-access.role.partnercontacteditor'),
        value: Role.PARTNERCONTACTEDITOR
      },
      {
        name: t('user-access.role.partnermanager'),
        value: Role.PARTNERMANAGER
      }
    ],
    [t]
  )

  const initialValues = useMemo(() => {
    const values: UserAccessFormValues = {
      role: editedUser?.role
    }
    if (editedUser?.active !== undefined) {
      values.status = editedUser?.active ? Status.ACTIVE : Status.INACTIVE
    }
    return values
  }, [editedUser])

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
          if (userId !== undefined && role && status) {
            dispatch(saveUserAccess(userId, role, status === Status.ACTIVE))
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
