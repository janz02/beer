import { Row, Col, Form } from 'antd'
import { EmailTemplatePreview } from 'components/emailTemplatePreview/EmailTemplatePreview'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { CampaignEditorProps } from '../../base/CampaignEditorForm'
import { useEmailTestUtils } from './useEmailTestUtils'

export const TestTabPane: FC<CampaignEditorProps> = () => {
  const { t } = useTranslation()
  const {
    template,
    currentTemplateVersionId,
    emailTesterCount,
    emailTesterTableProps,
    emailTesterHeaderOptions,
    sendTestHeaderOptions
  } = useEmailTestUtils()

  return (
    <Row>
      <Col span={12}>
        <ResponsiveCard
          width="full"
          floatingTitle={t('campaign-create.test.email.testers', {
            totalCount: emailTesterCount
          })}
          floatingOptions={emailTesterHeaderOptions}
          forTable
        >
          <ResponsiveTable hasFixedColumn scroll={{ x: true }} {...emailTesterTableProps} />
        </ResponsiveCard>
      </Col>
      <Col span={12}>
        <ResponsiveCard
          width="full"
          floatingTitle={t('campaign-create.content.email.title', {
            totalCount: emailTesterCount
          })}
          floatingOptions={sendTestHeaderOptions}
        >
          <Row>
            <Col span="12">
              <Form.Item label={t('campaign-create.content.email.template')}>
                {template?.name}
              </Form.Item>
            </Col>
            <Col span="12">
              <Form.Item label={t('campaign-create.content.email.template-version')}>
                {currentTemplateVersionId}
              </Form.Item>
            </Col>
          </Row>
          {/* <EmailTemplatePreview /> */}
        </ResponsiveCard>
      </Col>
    </Row>
  )
}
