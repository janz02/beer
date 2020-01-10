import React, { FC, useEffect } from 'react';
import '../category.scss';
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { getCategory, clearEditor } from './categoryEditorSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/rootReducer';

enum EditorMode {
  EDIT = 'edit',
  CREATE = 'create',
}

export interface CategoryEditorParams {
  visible?: boolean;
  isNew?: boolean;
  categoryId?: number;
}

interface CategoryEditorProps {
  params: CategoryEditorParams;
  onExit: () => void;
  afterClose: () => void;
}

export const CategoryEditor: FC<CategoryEditorProps> = props => {
  const { params, onExit, afterClose } = props;
  const { visible, categoryId: id, isNew } = params;

  const { t } = useTranslation();
  const dispatch = useDispatch();

  let mode =
    isNew || id === ('undefined' as any) ? EditorMode.CREATE : EditorMode.EDIT;

  const category = useSelector(
    (state: RootState) => state.categoryEditor.category
  );

  useEffect(() => {
    if (id) {
      dispatch(getCategory({ id: id! }));
    }
  }, [dispatch, id]);

  const afterCloseExtended = () => {
    afterClose();
    dispatch(clearEditor());
  };

  return (
    <Modal
      title={t(`coupon-category.editor-${mode}`)}
      visible={visible}
      onOk={onExit}
      onCancel={onExit}
      afterClose={afterCloseExtended}
    >
      <p>{category?.name}</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};
