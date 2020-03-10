import React, { FC, useEffect, useMemo } from 'react'
import { Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import { getCategory, clearCategoryEditor, saveCategory } from './categoryEditorSlice'
import { useSelector, useDispatch } from 'hooks/react-redux-hooks'
import { RootState } from 'app/rootReducer'
import { useCommonFormRules } from 'hooks'
import { Category } from 'models/category'
import { GenericModalForm } from 'components/popups/GenericModalForm'

export interface CategoryEditorParams {
  visible?: boolean
  isNew?: boolean
  categoryId?: number
}

interface CategoryEditorProps {
  params: CategoryEditorParams
  onExit: () => void
  afterClose: () => void
}

export const CategoryEditor: FC<CategoryEditorProps> = props => {
  const { params, onExit, afterClose } = props
  const { visible, categoryId: id, isNew } = params
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { category } = useSelector((state: RootState) => state.categoryEditor)
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
    dispatch(saveCategory(newCategory))
    onExit()
  }

  const modalTitle = isNew ? t('coupon-category.editor-create') : t('coupon-category.editor-edit')

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
        name: 'category-editor',
        onFinish: onSave
      }}
      initialValues={initialValues}
    >
      <Form.Item
        label={t('coupon-category.field.name')}
        name="name"
        rules={[rule.required(), rule.max(20)]}
      >
        <Input />
      </Form.Item>
    </GenericModalForm>
  )
}
