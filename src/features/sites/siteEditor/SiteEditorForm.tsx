import React, { FC, useState, useEffect, useRef } from 'react'
import { Form, Input, Button, Card, Modal } from 'antd'
import { useIsMobile } from 'hooks'
import { useTranslation } from 'react-i18next'
import { Site } from 'models/site'
import { BackButton } from 'components/buttons/BackButton'

export interface SiteEditorFormProps {
  onSave: (values: Site) => void
  onExit: () => void
  loading: boolean
  site?: Site
  id?: number | undefined
}

export const SiteEditorForm: FC<SiteEditorFormProps> = props => {
  const { onSave, loading, site, onExit, id } = props

  const [form] = Form.useForm()

  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const [submitable, setSubmitable] = useState(false)
  const [visibleDiscardPopup, setVisibleDiscardPopup] = useState(false)

  const formLayout = isMobile ? 'vertical' : 'horizontal'
  const formItemLayout =
    formLayout === 'horizontal'
      ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 }
        }
      : null

  // TODO: revert to this after antd upgrade
  // useEffect(() => {
  //   form.setFieldsValue({ ...site })
  // }, [site, form])
  const ref = useRef(form)
  useEffect(() => {
    ref.current = form
  }, [form])
  useEffect(() => {
    ref.current.setFieldsValue({ ...site })
  }, [site])

  const onSubmit = (values: Site): void => {
    onSave({ ...values })
    setSubmitable(false)
  }

  const onLeave = (): void => {
    if (submitable) {
      setVisibleDiscardPopup(true)
    } else {
      onExit()
    }
  }

  const header = (): JSX.Element => (
    <div>
      <BackButton onClick={onLeave} primary={!submitable} />
      {t(`site.editor-title-${id ? 'edit' : 'create'}`)}
    </div>
  )

  return (
    <>
      <Card title={header()}>
        <Form
          name="site-editor-form"
          onFinish={onSubmit}
          form={form}
          layout={formLayout}
          onFieldsChange={() => {
            const hasErrors = form.getFieldsError().some(field => field.errors.length)
            if (submitable === hasErrors) {
              setSubmitable(!submitable)
            }
          }}
        >
          <Form.Item
            name="name"
            label={t('site.field.name')}
            rules={[{ required: true, message: t('site.error.name-required') }]}
            {...formItemLayout}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="address"
            label={t('site.field.address')}
            rules={[{ required: true, message: t('site.error.address-required') }]}
            {...formItemLayout}
          >
            <Input />
          </Form.Item>

          <Button type="primary" htmlType="submit" disabled={!submitable} loading={loading}>
            {t('partner.save')}
          </Button>
        </Form>
      </Card>
      <Modal
        visible={visibleDiscardPopup}
        title={t(`site.discard-popup.title`)}
        onOk={onExit}
        onCancel={() => setVisibleDiscardPopup(false)}
        okText={t('common.discard')}
        okButtonProps={{ danger: true }}
      >
        <p>{t(`site.discard-popup.text`)}</p>
      </Modal>
    </>
  )
}
