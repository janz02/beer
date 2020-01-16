import React, { FC } from 'react'
import { Modal } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategory } from './categoryListSlice'
import { Category } from 'models/category'
import { useTranslation } from 'react-i18next'
import { RootState } from 'app/rootReducer'

interface CategoryDeletePopupProps {
  visible: boolean
  category: Category | undefined
  onExit: () => void
  afterClose: () => void
}

export const CategoryDeletePopup: FC<CategoryDeletePopupProps> = props => {
  const { visible, category, onExit, afterClose } = props
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const error = useSelector((state: RootState) => state.categoryList.errorDeletion)

  const onDelete = async (): Promise<void> => {
    if (category?.id) {
      dispatch(deleteCategory(category.id))
      onExit()
    }
  }

  return (
    <Modal
      visible={visible}
      title={t(`coupon-category.delete-popup.title`)}
      onOk={onDelete}
      onCancel={onExit}
      okText={t('common.delete')}
      afterClose={afterClose}
    >
      <p>{t(`coupon-category.delete-popup.text`)}</p>
      <h4>{category?.name}</h4>
      <div className="category-modal__error-msg">{error}</div>
    </Modal>
  )
}
