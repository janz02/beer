import { useMemo } from 'react';

export const useAntdForm = (form: any) => {
  const getFieldDecorator = (form as any).getFieldDecorator;

  const handleSubmit = useMemo(
    () => (event: any, todo?: (values: any) => void) => {
      event.preventDefault();
      form.validateFields((err: any, values: any) => {
        if (!err) {
          todo && todo(values);
        }
      });
    },
    [form]
  );

  return { handleSubmit, getFieldDecorator };
};
