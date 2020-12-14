import { Row, Col, Form } from 'antd'
import { EmailTemplatePreview } from 'components/emailTemplatePreview/EmailTemplatePreview'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { CampaignEditorProps } from '../../base/CampaignEditorForm'
import { useEmailTestUtils } from './useEmailTestUtils'
import styles from './EmailTestTabPane.module.scss'

export const TestTabPane: FC<CampaignEditorProps> = () => {
  const { t } = useTranslation()
  const {
    template,
    templateVersion,
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
          <Form layout="vertical">
            <Row>
              <Col span="12">
                <Form.Item label={t('campaign-create.content.email.template')}>
                  {template?.name}
                </Form.Item>
              </Col>
              <Col span="12">
                <Form.Item label={t('campaign-create.content.email.template-version')}>
                  {templateVersion}
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <div className={styles.emailPreviewContainer}>
            <EmailTemplatePreview previewHeightPx={500} />
          </div>
        </ResponsiveCard>
      </Col>
    </Row>
  )
}
