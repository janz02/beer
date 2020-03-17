import React, { FC, useEffect, useMemo } from 'react'
import { Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import { getCategory, clearCategoryEditor, saveCategory } from './categoryEditorSlice'
import { useSelector, useDispatch } from 'hooks/react-redux-hooks'
import { RootState } from 'app/rootReducer'
import { useCommonFormRules } from 'hooks'
import { Category } from 'models/category'
import { GenericModalFormEditorParams } from 'hooks/useGenericModalEditorUtils'
import { GenericModalForm } from 'components/popups/GenericModalForm'

export interface CategoryEditorParams {
  visible?: boolean
  isNew?: boolean
  categoryId?: number
}

interface CategoryEditorProps {
  params: GenericModalFormEditorParams
  handleExit: () => void
  afterClose: () => void
}

export const CategoryEditor: FC<CategoryEditorProps> = props => {
  const { params, handleExit, afterClose } = props
  const { visible, id, isNew } = params

  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { category, loading } = useSelector((state: RootState) => state.categoryEditor)
  const rule = useCommonFormRules()

  const initialValues = useMemo(() => ({ name: category?.name }), [category])

  useEffect(() => {
    id && dispatch(getCategory({ id }))
  }, [dispatch, id])

  const afterCloseExtended = (): void => {
    afterClose()
    dispatch(clearCategoryEditor())
  }

  const onSave = async (values: Category): Promise<void> => {
    const newCategory: Category = { id, name: values.name }
    const saved: any = await dispatch(saveCategory(newCategory))
    saved && handleExit()
  }

  const modalTitle = isNew ? t('coupon-category.editor-create') : t('coupon-category.editor-edit')

  return (
    <GenericModalForm
      loadingAction={loading}
      modalProps={{
        visible: visible,
        title: modalTitle,
        okText: t('common.save'),
        okButtonProps: {
          loading,
          disabled: loading
        },
        afterClose: afterCloseExtended,
        onCancel: handleExit
      }}
      formProps={{
        name: 'category-editor',
        onFinish: onSave
      }}
      initialValues={initialValues}
    >
      <Form.Item
        label={t('coupon-category.field.name')}
        name="name"
        rules={[rule.requiredString(), rule.max(50)]}
      >
        <Input maxLength={50} />
      </Form.Item>
    </GenericModalForm>
  )
}
