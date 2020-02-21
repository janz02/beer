import React, { FC, useState, useRef, useEffect } from 'react'
import { NewsletterEditor } from './NewsletterEditor'
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary'
import { Form, Input, Select } from 'antd'
import { useCommonFormRules } from 'hooks'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { GenericModalForm } from 'components/popups/GenericModalForm'
import { useParams } from 'react-router-dom'
import { getNewsletterTemplate } from './newsletterEditorSlice'
import { RootState } from 'app/rootReducer'

export const NewsletterEditorPage: FC = () => {
  const dispatch = useDispatch()
  const rule = useCommonFormRules()
  const { t } = useTranslation()

  const { id } = useParams()

  useEffect(() => {
    console.log({ id })
    dispatch(getNewsletterTemplate(id!))
  }, [dispatch, id])

  const [savePopup, setSavePopup] = useState({
    visible: false
  })

  const [revertPopup, setRevertPopup] = useState({
    visible: false
  })

  const template = useSelector((state: RootState) => state.newsletterEditor.template)

  const onSave = useRef((newTemplate: string) => {
    setSavePopup({ ...savePopup, visible: true })
  })

  const onRevert = useRef(() => {
    setRevertPopup({ ...revertPopup, visible: true })
  })
  return (
    <>
      <ErrorBoundary message="hello">
        <NewsletterEditor
          template={template?.html}
          handleSave={onSave.current}
          handleRevert={onRevert.current}
        />
      </ErrorBoundary>
      <GenericModalForm
        key="save-template"
        modalProps={{
          ...savePopup,
          title: t('newsletter.popup.title-save'),
          okText: t('common.save'),
          onCancel: () => setSavePopup({ ...savePopup, visible: false })
        }}
        formProps={{}}
      >
        <Form.Item
          name="templateName"
          label={t('newsletter.field.template-name')}
          rules={[rule.required()]}
        >
          <Input />
        </Form.Item>
      </GenericModalForm>
      <GenericModalForm
        key="revert-template"
        modalProps={{
          ...revertPopup,
          title: t('newsletter.popup.title-revert'),
          okText: t('common.revert'),
          onCancel: () => setRevertPopup({ ...revertPopup, visible: false })
        }}
        formProps={{}}
      >
        <Form.Item
          name="templateName"
          label={t('newsletter.field.template-version')}
          rules={[rule.required()]}
        >
          <Select defaultValue={template?.version?.id} style={{ width: 150 }}>
            {template?.versions?.map(v => (
              <Select.Option value={v.id}>{v.version}</Select.Option>
            ))}
          </Select>
        </Form.Item>
      </GenericModalForm>
    </>
  )
}
