import React, { FC, useEffect, useMemo, useCallback } from 'react'
import { CampaignEditorProps } from '../../base/CampaignEditorForm'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import grapesjs from 'grapesjs'
import { useDispatch, useSelector } from 'hooks/react-redux-hooks'

import { newsletterEditorActions } from '../../../../newsletter/newsletter-editor/newsletterEditorSlice'
import { newsletterListActions } from '../../../../newsletter/newsletterList/newsletterListSlice'
import { RootState } from 'app/rootReducer'
import { Button, Form, Select, Tooltip } from 'antd/lib'
import { useTranslation } from 'react-i18next'
import { SelectValue } from 'antd/lib/select'
import { DesktopOutlined, MobileOutlined, TabletOutlined } from '@ant-design/icons'
import './EmailContentTabPane.scss'

export const EmailContentTabPane: FC<CampaignEditorProps> = ({ campaignId }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { template } = useSelector((state: RootState) => state.newsletterEditor)
  const { templateList } = useSelector((state: RootState) => state.newsletterList)
  let templateId: number | undefined
  let templateVersionId: number | undefined

  const handleGetTemplates = useCallback((): void => {
    dispatch(newsletterListActions.getNewsletterTemplates())
  }, [dispatch])

  const handleGetTemplate = useCallback(
    (templateId: number): void => {
      if (templateId && !isNaN(+templateId)) {
        dispatch(newsletterEditorActions.getNewsletterTemplate(+templateId))
      }
    },
    [dispatch]
  )

  useEffect(() => {
    if (templateList.length < 1) {
      handleGetTemplates()
    }
  }, [templateList, handleGetTemplates])

  const editor = useMemo(() => {
    if (!template) return
    return grapesjs.init({
      container: '#email-preview',
      height: '100%',
      showToolbar: 0
    })
  }, [template])

  useEffect(() => {
    if (!editor) return
    editor.on('load', () => {
      editor.runCommand('preview')
    })
  }, [editor])

  const handleTemplateSelection = (value: SelectValue): void => {
    const selectedTemplate = templateList.find(x => x.id === value)

    if (selectedTemplate) {
      templateId = selectedTemplate.id as number
      templateVersionId = selectedTemplate.version as number
      handleGetTemplate(templateId)
    }
  }
  const handleTemplateVersionSelection = (value: SelectValue): void => {
    const selectedTemplateVersion = value as number

    if (selectedTemplateVersion) {
      templateVersionId = selectedTemplateVersion
      dispatch(newsletterEditorActions.switchNewsletterVersion(templateVersionId))
    }
  }

  const handleDeviceSelection = (device: 'Tablet' | 'Mobile portrait' | 'Desktop'): void => {
    if (editor) {
      editor.setDevice(device)
      editor.runCommand('preview')
    }
  }

  return (
    <div>
      <div>
        <Form>
          <Form.Item name="templateName" label={t('campaign-create.content.email.template')}>
            <Select
              onChange={handleTemplateSelection}
              placeholder={t('campaign-create.content.email.template-placeholder')}
            >
              {templateList?.map(x =>
                x.id ? (
                  <Select.Option key={x.id} value={x.id} selected={x.id === templateId}>
                    {x.name}
                  </Select.Option>
                ) : (
                  <></>
                )
              )}
            </Select>
          </Form.Item>
          <Form.Item
            hidden={templateId !== undefined}
            name="templateVersion"
            label={t('campaign-create.content.email.template-version')}
          >
            <Select
              onChange={handleTemplateVersionSelection}
              placeholder={t('campaign-create.content.email.template-version-placeholder')}
            >
              {template?.history?.map(x =>
                x.version ? (
                  <Select.Option
                    key={x.version}
                    value={x.version}
                    selected={x.version === template.version}
                  >
                    {x.version}
                  </Select.Option>
                ) : (
                  <></>
                )
              )}
            </Select>
          </Form.Item>
        </Form>
      </div>
      <div className="email-preview-container" hidden={!editor}>
        <div>
          <span>{t('campaign-create.content.email.device-type.title')}</span>
          <Tooltip
            mouseEnterDelay={0.75}
            placement="bottomLeft"
            title={t('campaign-create.content.email.device-type.desktop')}
          >
            <Button
              type="primary"
              size="small"
              icon={<DesktopOutlined />}
              onClick={() => handleDeviceSelection('Desktop')}
            />
          </Tooltip>
          <Tooltip
            mouseEnterDelay={0.75}
            placement="bottomLeft"
            title={t('campaign-create.content.email.device-type.tablet')}
          >
            <Button
              type="primary"
              size="small"
              icon={<TabletOutlined />}
              onClick={() => handleDeviceSelection('Tablet')}
            />
          </Tooltip>
          <Tooltip
            mouseEnterDelay={0.75}
            placement="bottomLeft"
            title={t('campaign-create.content.email.device-type.mobile')}
          >
            <Button
              type="primary"
              size="small"
              icon={<MobileOutlined />}
              onClick={() => handleDeviceSelection('Mobile portrait')}
            />
          </Tooltip>
        </div>
        <div id="email-preview" />
      </div>
    </div>
  )
}
