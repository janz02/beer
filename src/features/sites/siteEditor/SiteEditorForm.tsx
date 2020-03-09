import React, { FC, useState, useEffect, useRef } from 'react'
import { Form, Input, Button } from 'antd'
import { useCommonFormRules } from 'hooks'
import { useTranslation } from 'react-i18next'
import { Site } from 'models/site'
import { BackButton } from 'components/buttons/BackButton'
import { GenericPopup } from 'components/popups/GenericPopup'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'

export interface SiteEditorFormProps {
  onSave: (values: Site) => void
  onExit: () => void
  loading: boolean
  site?: Site
  id?: number | undefined
}

export const SiteEditorForm: FC<SiteEditorFormProps> = props => {
  const { onSave, loading, site, onExit } = props
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [submitable, setSubmitable] = useState(false)
  const [visibleDiscardPopup, setVisibleDiscardPopup] = useState(false)
  const rule = useCommonFormRules()

  // TODO: revert to this after antd upgrade
  // useEffect(() => {
  //   form.setFieldsValue({ ...site })
  // }, [site, form])
  const ref = useRef(form)
  useEffect(() => {
    ref.current = form
  }, [form])
  useEffect(() => {
    site ? ref.current.setFieldsValue({ ...site }) : ref.current.resetFields()
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

  const headerOptions = <BackButton onClick={onLeave} primary={!submitable} />

  return (
    <>
      <ResponsiveCard
        floatingTitle={t('site.editor-title')}
        innerOptions={headerOptions}
        paddedBottom
      >
        <Form
          name="site-editor-form"
          onFinish={onSubmit}
          form={form}
          layout="vertical"
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
            rules={[rule.required(), rule.max(100)]}
          >
            <Input maxLength={100} />
          </Form.Item>

          <Form.Item
            name="address"
            label={t('site.field.address')}
            rules={[rule.required(), rule.max(100)]}
          >
            <Input maxLength={100} />
          </Form.Item>

          <Button type="primary" htmlType="submit" disabled={!submitable} loading={loading}>
            {t('partner.save')}
          </Button>
        </Form>
      </ResponsiveCard>

      <GenericPopup
        type="discard"
        visible={visibleDiscardPopup}
        onOk={onExit}
        onCancel={() => setVisibleDiscardPopup(false)}
      />
    </>
  )
}
