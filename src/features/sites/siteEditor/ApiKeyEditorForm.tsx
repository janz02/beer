import React, { FC, useState } from 'react'
import { Form, Input, Button } from 'antd'
import { useCommonFormRules } from 'hooks'
import { useTranslation } from 'react-i18next'

export interface ApiKeyEditorFormProps {
  onSave: (name: string) => void
  onCancel: () => void
  loading: boolean
}

export const ApiKeyEditorForm: FC<ApiKeyEditorFormProps> = props => {
  const { onSave, onCancel, loading } = props

  const [form] = Form.useForm()
  const { t } = useTranslation()
  const [submitable, setSubmitable] = useState(false)
  const rule = useCommonFormRules()

  const onSubmit = (values: any): void => {
    onSave(values.name)
    setSubmitable(false)
  }

  return (
    <Form
      name="add-api-key-form"
      onFinish={onSubmit}
      form={form}
      onFieldsChange={() => {
        const hasErrors = form.getFieldsError().some(field => field.errors.length)
        if (submitable === hasErrors) {
          setSubmitable(!submitable)
        }
      }}
    >
      <Form.Item name="name" label={t('site.editor.add-api-key.name')} rules={[rule.required()]}>
        <Input />
      </Form.Item>

      <Button
        loading={loading}
        onClick={() => {
          onCancel()
        }}
      >
        {t('common.cancel')}
      </Button>

      <Button type="primary" htmlType="submit" disabled={!submitable} loading={loading}>
        {t('site.editor.add-api-key.generate')}
      </Button>
    </Form>
  )
}
