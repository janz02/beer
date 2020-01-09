import React, { FC, useEffect } from 'react';
import '../category.scss';
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';

enum EditorMode {
  EDIT = 'edit',
  CREATE = 'create',
}

interface CategoryEditorProps {
  categoryId: string;
  visible: boolean;
  onExit: () => void;
  afterExit:  () => void;
}

export const CategoryEditor: FC<CategoryEditorProps> = props => {
  const { visible, onExit, categoryId } = props;

  const { t } = useTranslation();


  let mode = categoryId ? EditorMode.EDIT : EditorMode.CREATE;

  useEffect(() => {
    if (visible) {
      console.log('editor');
      
    }
  }, [visible]);

  return (
    <Modal
      title={t(`coupon-category.editor-${mode}`)}
      visible={visible}
      onOk={onExit}
      afterClose={()=>{}}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};
