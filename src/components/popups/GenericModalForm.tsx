import React, { useEffect, FC } from 'react'
import { Form, Modal, Spin } from 'antd'
import { ModalProps } from 'antd/lib/modal'
import { FormProps } from 'antd/lib/form'
import { useTranslation } from 'react-i18next'
import { NavigationAlert } from './NavigationAlert'
import { useFormUtils } from 'hooks/useFormUtils'

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

  const {
    form,
    submitable,
    modified,
    checkFieldsChange,
    resetFormFlags,
    setInitialFieldsValue
  } = useFormUtils()

  useEffect(() => {
    if (!modalProps.visible) return
    setInitialFieldsValue({ ...initialValues })
  }, [initialValues, modalProps.visible, setInitialFieldsValue])

  useEffect(() => {
    return () => {
      resetFormFlags()
    }
  }, [modalProps.visible, resetFormFlags])

  const onOk = (): void => {
    form.submit()
  }

  return (
    // TODO: investigate warning -> forceRender should have resolved the issue according to antddocs, but it didn't
    // https://next.ant.design/components/form/#Why-get-form-warning-when-used-in-Modal
    <Modal
      forceRender
      cancelText={t(`common.cancel`)}
      {...modalProps}
      onOk={onOk}
      okButtonProps={{ disabled: !submitable || !modified }}
      afterClose={() => {
        form.resetFields()
        resetFormFlags()
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
            checkFieldsChange()
          }}
        >
          {children}
        </Form>
      </Spin>
    </Modal>
  )
}
