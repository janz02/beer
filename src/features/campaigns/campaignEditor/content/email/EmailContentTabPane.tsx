import React, { FC } from 'react'
import { CampaignEditorProps } from '../../base/CampaignEditorForm'
import { Col, Divider, Form, Row, Select } from 'antd/lib'
import { useTranslation } from 'react-i18next'
import { useEmailContentUtils } from './useEmailContentUtils'
import styles from './EmailContentTabPane.module.scss'
import { EmailTemplatePreview } from 'components/emailTemplatePreview/EmailTemplatePreview'
import Title from 'antd/lib/typography/Title'
import { CampaignEditorFormFooter } from '../../base/CampaignEditorFormFooter'
import { useCommonFormRules } from 'hooks'

export const EmailContentTabPane: FC<CampaignEditorProps> = ({ campaignId }) => {
  const { t } = useTranslation()
  const {
    form,
    template,
    templateList,
    handleSubmit,
    handleTemplateSelection,
    handleTemplateVersionSelection
  } = useEmailContentUtils(campaignId)
  const { required } = useCommonFormRules()

  return (
    <div>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Title level={5}>{t('campaign-create.content.email.title')}</Title>
        <Row gutter={20}>
          <Col span={8}>
            <Form.Item
              name="emailTemplateId"
              label={t('campaign-create.content.email.template')}
              rules={[required()]}
              required
            >
              <Select
                onChange={handleTemplateSelection}
                placeholder={t('campaign-create.content.email.template-placeholder')}
              >
                {templateList?.map(x =>
                  x.id ? (
                    <Select.Option key={x.id} value={x.id}>
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
              name="emailTemplateVersion"
              label={t('campaign-create.content.email.template-version')}
              rules={[required()]}
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
        <div hidden={!template} className={styles.emailPreviewContainer}>
          <EmailTemplatePreview previewHeightPx={500} />
        </div>
        <Divider />
        <Row>
          <Col span={22}>
            <CampaignEditorFormFooter
              previousText={t('campaign-create.content.email.previous-section')}
              submitText={t('campaign-create.content.email.save-draft')}
              nextText={t('campaign-create.content.email.next-section')}
            />
          </Col>
        </Row>
      </Form>
    </div>
  )
}
