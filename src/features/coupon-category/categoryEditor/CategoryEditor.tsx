import React, { FC, useEffect } from 'react';
import '../category.scss';
import { Modal, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  getCategory,
  clearCategoryEditor,
  saveCategory,
} from './categoryEditorSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/rootReducer';
import { FormProps, FormLayout } from 'antd/lib/form/Form';
import { useIsMobile } from 'hooks';
import { getCategories } from '../categoryList/categoryListSlice';
import { Category } from 'models/category';

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
  const isMobile = useIsMobile();
  const [form] = Form.useForm();

  const { t } = useTranslation();
  const dispatch = useDispatch();

  let mode =
    isNew || id === ('undefined' as any) ? EditorMode.CREATE : EditorMode.EDIT;

  const formLayout: FormLayout = isMobile ? 'vertical' : 'horizontal';
  const formItemLayout: Partial<FormProps> = isMobile
    ? {}
    : {
        wrapperCol: { span: 16 },
      };

  const category = useSelector(
    (state: RootState) => state.categoryEditor.category
  );

  const error = useSelector((state: RootState) => state.categoryEditor.error);

  useEffect(() => {
    if (id && mode === EditorMode.EDIT) {
      dispatch(getCategory({ id: id! }));
    }
  }, [dispatch, id, mode]);

  useEffect(() => {
    form.setFieldsValue({ name: category?.name });
  }, [category, form]);

  const afterCloseExtended = () => {
    afterClose();
    dispatch(clearCategoryEditor());
  };

  const onSave = async (values: any) => {
    const newCategory: Category = { id, name: values.name };
    const saved = await dispatch(saveCategory(newCategory));
    if (!!saved) {
      onExit();
      dispatch(getCategories());
    }
  };

  return (
    <Modal
      title={t(`coupon-category.editor-${mode}`)}
      visible={visible}
      okText={t('common.save')}
      onOk={() => form.submit()}
      onCancel={onExit}
      afterClose={afterCloseExtended}
      destroyOnClose
    >
      <Form
        form={form}
        name="category-editor"
        {...formItemLayout}
        layout={formLayout}
        onFinish={onSave}
      >
        <Form.Item
          label={t('coupon-category.field.name')}
          name="name"
          rules={[
            {
              required: true,
              message: t('coupon-category.error.name-required'),
            },
          ]}
        >
          <Input maxLength={20} />
        </Form.Item>
      </Form>
      <div className="category-editor__error-msg">{error}</div>
    </Modal>
  );
};
