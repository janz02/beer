import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'app/rootReducer'
import { useRoleGenerator, RoleOptions } from 'hooks/useRoleGenerator'
import { userAccessActions } from '../userAccessSlice'
import { Status, UserType, UserAccess } from 'models/user'
import { Roles } from 'api/swagger/coupon'
import { GenericModalFormProps } from 'components/popups/GenericModalForm'
import { FeatureState } from 'models/featureState'

interface UserAccessFormValues {
  role?: Roles | null
  status?: Status | null
}

interface UseUserAccessEditorUtils {
  editorFormModalProps: GenericModalFormProps
  editedUserType?: UserType
  roleOptions: RoleOptions
  editedUser?: UserAccess
}
export const useUserAccessEditor = (): UseUserAccessEditorUtils => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const { editedUser, editorState, editorOpen, editedUserType } = useSelector(
    (state: RootState) => state.userAccess
  )
  const roleOptions = useRoleGenerator(editedUserType)

  const handleClose = useCallback(() => {
    dispatch(userAccessActions.closeEditor())
  }, [dispatch])

  const initialValues: UserAccessFormValues = useMemo(
    () => ({
      role: editedUser?.role,
      status: editedUser?.isActive ? Status.ACTIVE : Status.INACTIVE
    }),
    [editedUser]
  )

  const handleSave = async (values: UserAccessFormValues): Promise<void> => {
    const { role, status } = values
    if (role && status) {
      const saved = await dispatch(userAccessActions.saveUserAccess(role, status === Status.ACTIVE))
      saved && handleClose && handleClose()
    }
  }

  const editorFormModalProps: GenericModalFormProps = {
    initialValues: initialValues,
    loadingContent: editorState === FeatureState.Loading,
    modalProps: {
      visible: editorOpen,
      title: t('user-access.access-editor.title'),
      okText: t('common.save'),
      onCancel: handleClose,
      afterClose: () => {
        dispatch(userAccessActions.clearUserAccessEditor())
      }
    },
    formProps: {
      onFinish: handleSave
    }
  }
  return {
    editorFormModalProps,
    roleOptions,
    editedUser,
    editedUserType
  }
}
