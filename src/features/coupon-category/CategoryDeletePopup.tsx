import React, { FC } from 'react';
import { Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { deleteCategory } from './categoryList/categoryListSlice';
import { Category } from 'models/category';
import { useTranslation } from 'react-i18next';

interface CategoryDeletePopupProps {
  visible: boolean;
  category: Category | undefined;
  onExit: () => void;
  afterClose: () => void;
}

export const CategoryDeletePopup: FC<CategoryDeletePopupProps> = props => {
  const { visible, category, onExit, afterClose } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onDelete = () => {
    if (category?.id) {
      dispatch(deleteCategory(category.id));
      onExit();
    }
  };

  return (
    <Modal
      visible={visible}
      title={t(`coupon-category.delete-popup.title`)}
      onOk={onDelete}
      onCancel={onExit}
      afterClose={afterClose}
    >
      <p>{t(`coupon-category.delete-popup.text`)}</p>
      <p>{category?.name}</p>
    </Modal>
  );
};
