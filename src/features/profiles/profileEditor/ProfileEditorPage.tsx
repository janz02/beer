import './ProfileEditorPage.scss'
import { Button, Col, Row } from 'antd'
import Form from 'antd/lib/form/Form'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { ProfileBasics } from './ProfileBasics'
import { ProfilePosition } from './ProfilePosition'
import { ProfileContacts } from './ProfileContacts'

export const ProfileEditorPage: FC = () => {
  const { t } = useTranslation()

  return (
    <ResponsiveCard className="profile-editor-card" floatingTitle={t('profile-editor.title')}>
      <Form
        name="coupon-editor-form"
        layout="vertical"
        // form={segmentationEditorUtils.formUtils.form}
        // onFinish={handleSave}
        // onFieldsChange={checkFieldsChange}
      >
        <ProfileBasics />

        <Row className="profile-editor-columns" gutter={70}>
          <Col span={12}>
            <ProfilePosition />
          </Col>
          <Col span={12}>
            <ProfileContacts />
          </Col>
        </Row>

        <div className="profile-editor-footer">
          <div className="profile-editor-footer-right">
            {/* disabled={!submitable} loading={saving} */}
            <Button type="primary" htmlType="submit">
              {t('profile-editor.button-save')}
            </Button>
          </div>

          <Button type="link">{t('profile-editor.button-cancel')}</Button>
        </div>
      </Form>
    </ResponsiveCard>
  )
}
