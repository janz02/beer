import React, { useEffect, FC } from 'react'
import { Form, Modal, Input, InputNumber } from 'antd'
import { ModalProps } from 'antd/lib/modal'
import { useTranslation } from 'react-i18next'

export interface GenericModalFormProps extends ModalProps {
  onCancel: () => void
}

export const GenericModalForm: FC<GenericModalFormProps> = props => {
  const { children, onCancel, ...modalProps } = props
  const { t } = useTranslation()

  const [form] = Form.useForm()

  useEffect(() => {
    form.resetFields()
  }, [form])

  const onOk = (): void => {
    form.submit()
  }

  return (
    <Modal
      title="Basic Drawer"
      cancelText={t(`common.cancel`)}
      {...modalProps}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical" name="userForm">
        {children}
        {/* <Form.Item name="name" label="User Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="age" label="User Age" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item> */}
      </Form>
    </Modal>
  )
}
