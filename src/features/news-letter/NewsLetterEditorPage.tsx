import React, { FC, useState, useCallback, useRef } from 'react'
import { NewsLetterEditor } from './NewsLetterEditor'
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary'
import { GenericPopup, GenericPopupProps } from 'components/popups/GenericPopup'
import { Form, Input, Button, Modal, InputNumber } from 'antd'
import { useCommonFormRules } from 'hooks'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { GenericModalForm } from 'components/popups/GenericModalForm'

export const NewsLetterEditorPage: FC = () => {
  const dispatch = useDispatch()
  const rule = useCommonFormRules()
  const { t } = useTranslation()

  const submitBtnRef = useRef<any>()

  const [savePopup, setSavePopup] = useState<GenericPopupProps>({
    visible: false,
    type: 'save'
  })

  const [revertPopup, setRevertPopup] = useState<GenericPopupProps>({
    visible: false,
    type: 'confirm'
  })

  const [template] = useState(
    `<div style="box-sizing: border-box; text-align: center; text-decoration: underline; font-style: italic;">...template...</div>`
  )

  const onSave = useRef((newTemplate: string) => {
    setSavePopup({ ...savePopup, visible: true, onOk: () => console.log(newTemplate) })
  })

  const onRevert = useRef(() => {
    setRevertPopup({ ...revertPopup, visible: true, onOk: () => console.log('REV') })
  })
  return (
    <>
      <ErrorBoundary message="hello">
        <NewsLetterEditor
          template={template}
          handleSave={onSave.current}
          handleRevert={onRevert.current}
        />
      </ErrorBoundary>
      <GenericModalForm
        {...savePopup}
        onCancel={() => setSavePopup({ ...savePopup, visible: false })}
      >
        <Form.Item name="name" label="User Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="age" label="User Age" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>
      </GenericModalForm>
      {/* <Form
        name="template-save"
        onFinish={values => {
          console.log('hello', values)

          dispatch(recoverPassword(values))
        }}
      >
        <Modal
          {...savePopup}
          onCancel={() => setSavePopup({ ...savePopup, visible: false })}
          title={t(`common.popup.${type}-title`)}
          // okText={t(`common.${type}`)}
          cancelText={t(`common.cancel`)}
          onOk={handleOk}
          {...{ okButtonProps }}
          {...modalProps}
          footer={[
            <Button key="back" onClick={() => setSavePopup({ ...savePopup, visible: false })}>
              Return
            </Button>,
            <Button htmlType="submit" key="submit" type="primary" loading={false}>
              Submit
            </Button>
          ]}
        >
          hello
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          {children ?? t(`common.popup.${type}-text`)}
        {error && <div className="generic-popup__error"> {t(error)} </div>}
        </Modal>
      </Form> */}
      {/* <GenericPopup
        {...savePopup}
        onOk={() => {
          console.log(submitBtnRef.current)
        }}
        onCancel={() => setSavePopup({ ...savePopup, visible: false })}
      >
        <Form
          name="template-save"
          onFinish={values => {
            // dispatch(recoverPassword(values))
          }}
        >
          <div className="instruction-text">{t('auth.text.new-password-email')}</div>
          <Form.Item name="name" rules={[rule.required()]}>
            <Input placeholder={t('auth.field.email')} />
          </Form.Item>
          <Button ref={submitBtnRef} htmlType="submit">
            {t('auth.send-email')}
          </Button>
        </Form>
      </GenericPopup> */}
      <GenericPopup
        {...revertPopup}
        onCancel={() => setRevertPopup({ ...revertPopup, visible: false })}
      />
    </>
  )
}
