/* eslint-disable @typescript-eslint/no-empty-function */
import React, { FC, useState, useEffect } from 'react'
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
import { history } from 'router/router'

export const NewsletterEditorPage: FC = () => {
  const dispatch = useDispatch()
  const rule = useCommonFormRules()
  const { t } = useTranslation()

  const { id } = useParams()

  useEffect(() => {
    dispatch(getNewsletterTemplate(id))
  }, [dispatch, id])

  const [savePopup, setSavePopup] = useState({
    visible: false,
    afterSave: () => {}
  })

  const [revertPopup, setRevertPopup] = useState({
    visible: false
  })

  const template = useSelector((state: RootState) => state.newsletterEditor.template)

  const onSave = (newTemplate: string, afterSaveCb: () => void): void => {
    setSavePopup({ ...savePopup, visible: true, afterSave: afterSaveCb })
  }

  const onRevert = (): void => {
    setRevertPopup({ ...revertPopup, visible: true })
  }

  return (
    <>
      <ErrorBoundary>
        <NewsletterEditor
          template={template?.html}
          handleSave={onSave}
          handleRevert={onRevert}
          handleExit={() => history.push('/newsletter')}
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
        formProps={{
          onFinish: (values: any) => {
            // TODO: integrate
            savePopup.afterSave()
            setSavePopup({ ...savePopup, visible: false })
          }
        }}
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
        formProps={{
          onFinish: (values: any) => {
            // TODO: integrate
            setRevertPopup({ ...revertPopup, visible: false })
          }
        }}
      >
        <Form.Item name="templateName" label={t('newsletter.field.template-version')}>
          <Select defaultValue={template?.version?.id} style={{ width: 150 }}>
            {template?.versions?.map(v => (
              <Select.Option key={v.id} value={v.id}>
                {v.version}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </GenericModalForm>
    </>
  )
}
