import React, { FC, useMemo, useEffect } from 'react'
import { RootState } from 'app/rootReducer'
import { useSelector } from 'hooks/react-redux-hooks'
import { Status, UserType } from 'models/user'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { GenericModalForm } from 'components/popups/GenericModalForm'
import { Form, Select, Radio } from 'antd'
import { useCommonFormRules } from 'hooks'
import { getUserAccess, saveUserAccess, clearUserAccessEditor } from './userAccessListSlice'
import Typography from 'antd/lib/typography'
import { Roles } from 'api/swagger/models'
import { useRoleGenerator } from '../../hooks/useRoleGenerator'

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

  const { editedUser, loadingEditor, loadingSave } = useSelector(
    (state: RootState) => state.userAccessList
  )

  useEffect(() => {
    if (!visible) return
    dispatch(getUserAccess(userId!))
  }, [dispatch, userId, visible])

  const roleOptions = useRoleGenerator(userType)

  const initialValues: UserAccessFormValues = useMemo(
    () => ({
      role: editedUser?.role,
      status: editedUser?.isActive ? Status.ACTIVE : Status.INACTIVE
    }),
    [editedUser]
  )

  const handleSave = async (values: UserAccessFormValues): Promise<void> => {
    const { role, status } = values
    if (userId && role && status) {
      const saved = await dispatch(saveUserAccess(userId, role, status === Status.ACTIVE, userType))
      saved && handleClose && handleClose()
    }
  }

  return (
    <GenericModalForm
      initialValues={initialValues}
      loadingContent={loadingEditor}
      loadingAction={loadingSave}
      modalProps={{
        visible,
        title: t('user-access.access-editor.title'),
        okText: t('common.save'),
        onCancel: handleClose,
        afterClose: () => {
          dispatch(clearUserAccessEditor())
        }
      }}
      formProps={{
        onFinish: handleSave
      }}
    >
      <Form.Item label={t('user-access.field.username')}>
        <Text>{editedUser?.name}</Text>
      </Form.Item>

      <Form.Item
        name="role"
        label={t('user-access.field.role')}
        rules={[rule.requiredString(t('error.validation.partner-contact.role-required'))]}
      >
        <Select>
          {roleOptions?.map((r, i) => (
            <Select.Option key={i} value={r.value.toString()}>
              {r.text}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="status"
        label={t('user-access.field.status')}
        rules={[rule.requiredString(t('error.validation.partner-contact.is-active-required'))]}
      >
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
