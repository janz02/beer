import React, { useEffect, FC, useState, useRef } from 'react'
import { Form, Modal, Spin } from 'antd'
import { ModalProps } from 'antd/lib/modal'
import { FormProps } from 'antd/lib/form'
import { useTranslation } from 'react-i18next'
import { NavigationAlert } from './NavigationAlert'

export interface GenericModalFormProps {
  formProps: FormProps
  modalProps: ModalProps
  initialValues?: any
  loadingContent?: boolean
  disabledNavPrompt?: boolean
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
  const {
    children,
    formProps,
    modalProps,
    initialValues,
    loadingContent,
    disabledNavPrompt
  } = props
  const { t } = useTranslation()
  const [form] = Form.useForm()

  const [modified, setModified] = useState(false)
  const [submitable, setSubmitable] = useState(false)

  const formRef = useRef(form)
  useEffect(() => {
    formRef.current = form
  }, [form])

  useEffect(() => {
    if (!modalProps.visible) return
    if (initialValues) {
      formRef.current.setFieldsValue({ ...initialValues })
    }
  }, [initialValues, modalProps.visible])

  useEffect(() => {
    return () => {
      setModified(false)
      setSubmitable(false)
    }
  }, [modalProps.visible])

  const onOk = (): void => {
    form.submit()
  }

  return (
    // TODO: investigate warning -> forceRender should have resolved the issue according to antd docs, but it didn't
    // https://next.ant.design/components/form/#Why-get-form-warning-when-used-in-Modal
    <Modal
      forceRender
      cancelText={t(`common.cancel`)}
      {...modalProps}
      onOk={onOk}
      okButtonProps={{ disabled: !submitable || !modified }}
      afterClose={() => {
        form.resetFields()
        setModified(false)
        setSubmitable(false)
        modalProps?.afterClose?.()
      }}
    >
      <NavigationAlert when={!disabledNavPrompt && modified} />
      {/* fix: for some reason spinning={undefined} is the same as spinning={true} */}
      <Spin spinning={!!loadingContent}>
        <Form
          name="generic-modal-form"
          layout="vertical"
          {...formProps}
          form={form}
          onFieldsChange={() => {
            const hasErrors = form.getFieldsError().some(field => field.errors.length)
            const hasModifications = Object.entries(form.getFieldsValue()).some(
              ([key, value]) => initialValues[key] !== value
            )
            setModified(hasModifications)
            setSubmitable(!hasErrors)
          }}
        >
          {children}
        </Form>
      </Spin>
    </Modal>
  )
}
