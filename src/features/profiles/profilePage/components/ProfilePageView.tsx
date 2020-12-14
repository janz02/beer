import React, { FC, useMemo } from 'react'
import { Col, Form, Row } from 'antd'
import { useTranslation } from 'react-i18next'
import { ProfileUtils } from '../useProfileUtils'
import { ViewModeInput, ViewModeSelect, ViewModeMultiSelect } from 'components/viewModeFormItems'

export const ProfilePageView: FC<Partial<ProfileUtils>> = ({
  profile,
  companies,
  groups,
  jobRoles
}) => {
  const { t } = useTranslation()

  console.log(profile)

  const company = useMemo(() => companies?.find(el => el.id === profile?.companyId), [
    companies,
    profile
  ])
  const jobRole = useMemo(() => jobRoles?.find(el => el.id === profile?.jobRoleId), [
    jobRoles,
    profile
  ])
  const groupList = useMemo(() => groups?.filter(el => profile?.groupIds.includes(el.id)), [
    profile,
    groups
  ])

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={6}>
          <Form.Item name="profilePictureDetails" />
        </Col>

        <Col xs={24} sm={16}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item name="name" label={t('profile-editor.name')}>
                <ViewModeInput />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="name" label={t('profile-editor.státuszka')}>
                <span>státusz</span>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={6}>
              <Form.Item name="birthDay" label={t('profile-editor.birthday')}>
                <ViewModeInput type="date" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={6}>
              <Form.Item label={t('profile-editor.username')}>
                <ViewModeInput value={profile?.userName} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={6}>
              <Form.Item name="email" label={t('profile-editor.email')}>
                <ViewModeInput type="email" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={6}>
              <Form.Item name="email" label={t('profile-editor.email')}>
                <ViewModeInput type="email" />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row gutter={70}>
        <Col xs={24} sm={12}>
          <Row>
            <Col xs={24}>
              <h2>{t('profile-editor.position')}</h2>
            </Col>
            <Col xs={24}>
              <Form.Item label={t('profile-editor.company')}>
                <ViewModeSelect value={company?.name} />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item label={t('profile-editor.group')}>
                <ViewModeMultiSelect value={groupList?.map(el => el.name) || []} />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item label={t('profile-editor.job-role')}>
                <ViewModeSelect value={jobRole?.name} />
              </Form.Item>
            </Col>
          </Row>
        </Col>

        <Col xs={24} sm={12}>
          <Row>
            <Col xs={24}>
              <h2>{t('profile-editor.contacts')}</h2>
            </Col>
            <Col xs={24}>
              <Form.Item label={t('profile-editor.phone')}>
                <ViewModeInput type="phone" value={profile?.phoneNumber || ''} />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}
