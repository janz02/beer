import React, { FC } from 'react'
import { CampaignEditorProps } from '../../base/CampaignEditorForm'
import { Col, Form, Row, Select } from 'antd/lib'
import { useTranslation } from 'react-i18next'
import { useEmailContentUtils } from './useEmailContentUtils'
import './EmailContentTabPane.scss'
import { EmailTemplatePreview } from 'components/emailTemplatePreview/EmailTemplatePreview'
import Title from 'antd/lib/typography/Title'

export const EmailContentTabPane: FC<CampaignEditorProps> = ({ campaignId }) => {
  const { t } = useTranslation()
  const {
    template,
    templateList,
    handleTemplateSelection,
    handleTemplateVersionSelection
  } = useEmailContentUtils()

  return (
    <div>
      <div>
        <Form layout="vertical">
          <Title level={5}>{t('campaign-create.content.email.title')}</Title>
          <Row gutter={20}>
            <Col span={8}>
              <Form.Item
                name="templateName"
                label={t('campaign-create.content.email.template')}
                required
              >
                <Select
                  onChange={handleTemplateSelection}
                  placeholder={t('campaign-create.content.email.template-placeholder')}
                >
                  {templateList?.map(x =>
                    x.id ? (
                      <Select.Option key={x.id} value={x.id} selected={x.id === template?.id}>
                        {x.name}
                      </Select.Option>
                    ) : (
                      <></>
                    )
                  )}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="templateVersion"
                label={t('campaign-create.content.email.template-version')}
                required
              >
                <Select
                  id="template-version-selector"
                  onChange={handleTemplateVersionSelection}
                  placeholder={t('campaign-create.content.email.template-version-placeholder')}
                >
                  {template?.history?.map(x =>
                    x.version && x.id ? (
                      <Select.Option key={x.version} value={x.id}>
                        {x.version}
                      </Select.Option>
                    ) : (
                      <></>
                    )
                  )}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div hidden={!template}>
          <EmailTemplatePreview />
        </div>
      </div>
    </div>
  )
}
