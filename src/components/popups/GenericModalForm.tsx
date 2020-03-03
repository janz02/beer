import React, { useEffect, FC, useRef } from 'react'
import { Form, Modal, Spin } from 'antd'
import { ModalProps } from 'antd/lib/modal'
import { FormProps } from 'antd/lib/form'
import { useTranslation } from 'react-i18next'

export interface GenericModalFormProps {
  formProps: FormProps
  modalProps: ModalProps
  initialValues?: any
  loadingContent?: boolean
}

/**
 For forms that are nested into modals.
 @example 
  <GenericModalForm
    modalProps={{
      ...,
      visible: modalVisible,
      okText: 'Save',
      onCancel: () => {}
    }}
    formProps={{
      ...,
      onFinish: () => {}
    }}
  >
    <Form.Item name="email" label="email">
      <Input />
    </Form.Item>
  </GenericModalForm>
 */
export const GenericModalForm: FC<GenericModalFormProps> = props => {
  const { children, formProps, modalProps, initialValues, loadingContent } = props
  const { t } = useTranslation()
  const [form] = Form.useForm()

  const ref = useRef(form)
  useEffect(() => {
    ref.current = form
    ref.current.resetFields()
  }, [form])
  useEffect(() => {
    initialValues ? ref.current.setFieldsValue({ ...initialValues }) : ref.current.resetFields()
  }, [initialValues])

  useEffect(() => {
    if (!modalProps.visible) return
    return () => {
      ref.current.resetFields()
    }
  }, [modalProps.visible])

  const onOk = (): void => {
    form.submit()
  }
  return (
    // TODO: investigate warning -> forceRender should have resolved the issue according to antd docs, but it didn't
    // https://next.ant.design/components/form/#Why-get-form-warning-when-used-in-Modal
    <Modal forceRender cancelText={t(`common.cancel`)} {...modalProps} onOk={onOk}>
      <Spin spinning={loadingContent === true}>
        <Form name="generic-modal-form" layout="vertical" {...formProps} form={form}>
          {children}
        </Form>
      </Spin>
    </Modal>
  )
}
