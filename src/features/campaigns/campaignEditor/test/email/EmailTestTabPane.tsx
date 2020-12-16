import { Row, Col, Form } from 'antd'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { CampaignEditorProps } from '../../base/CampaignEditorForm'
import { useEmailTestUtils } from './useEmailTestUtils'
import styles from './EmailTestTabPane.module.scss'
import { CampaignEditorFormFooter } from '../../base/CampaignEditorFormFooter'
import { EmailTemplatePreview } from 'components/emailTemplatePreview/EmailTemplatePreview'

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
    <Form layout="vertical">
      <Row>
        <Col md={24} lg={12}>
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
        <Col md={24} lg={12}>
          <ResponsiveCard
            width="full"
            floatingTitle={t('campaign-create.content.email.title', {
              totalCount: emailTesterCount
            })}
            floatingOptions={sendTestHeaderOptions}
          >
            <Row>
              <Col xs={24} sm={24} md={12}>
                <Form.Item label={t('campaign-create.content.email.template')}>
                  {template?.name}
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item label={t('campaign-create.content.email.template-version')}>
                  {templateVersion}
                </Form.Item>
              </Col>
            </Row>

            <div className={styles.emailPreviewContainer}>
              <EmailTemplatePreview previewHeightPx={500} />
            </div>
          </ResponsiveCard>
        </Col>
      </Row>
      <Row>
        <Col span={22}>
          <CampaignEditorFormFooter
            previousText={t('campaign-create.test.email.previous-section')}
            submitText={t('campaign-create.test.email.save-draft')}
            nextText={t('campaign-create.test.email.next-section')}
          />
        </Col>
      </Row>
    </Form>
  )
}
