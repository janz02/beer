import React, { FC, useMemo } from 'react'
import { Col, Form, Row, Image } from 'antd'
import { useTranslation } from 'react-i18next'
import { ProfileUtils } from '../useProfileUtils'
import { ViewModeInput, ViewModeSelect } from 'components/viewModeFormItems'
import './ProfileBasics.scss'

export const ProfilePageView: FC<Partial<ProfileUtils>> = ({
  profile,
  profilePictureUrl,
  companies,
  groups,
  jobRoles
}) => {
  const { t } = useTranslation()

  const company = useMemo<ViewModeSelect | null>(() => {
    const filtered = companies?.filter(el => el.id === profile?.companyId) || []

    return filtered.length > 0
      ? filtered.map(el => ({ name: el.name, linkTo: `/valami/${el.id}` }))[0]
      : null
  }, [companies, profile])

  const jobRole = useMemo<ViewModeSelect | null>(() => {
    const filtered = jobRoles?.filter(el => el.id === profile?.jobRoleId) || []

    return filtered.length > 0
      ? filtered.map(el => ({ name: el.name, linkTo: `/valami/${el.id}` }))[0]
      : null
  }, [jobRoles, profile])

  const groupList = useMemo<ViewModeSelect[] | null>(
    () =>
      groups
        ?.filter(el => profile?.groupIds.includes(el.id))
        .map(el => ({ name: el.name, linkTo: `/valami/${el.id}` })) || null,
    [profile, groups]
  )

  console.log(profile)

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={6}>
          {/* <img src={profilePictureUrl} alt="alt" className="proffilePicture" /> */}
          <Image
            width="100%"
            height="auto"
            src={profilePictureUrl}
            fallback="data:image/png;base64,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"
          />
        </Col>

        <Col xs={24} sm={24} md={16}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="name" label={t('profile-editor.name')}>
                <ViewModeInput type="name" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="name" label={t('profile-editor.status')}>
                <span>státusz</span>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={6}>
              <Form.Item name="birthDay" label={t('profile-editor.birthday')}>
                <ViewModeInput type="date" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={6}>
              <Form.Item label={t('profile-editor.username')}>
                <ViewModeInput value={profile?.userName} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={6}>
              <Form.Item name="email" label={t('profile-editor.email')}>
                <ViewModeInput type="email" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={6}>
              <Form.Item label={t('profile-editor.registrationDate')}>
                <ViewModeInput type="date" value={profile?.createdDate} />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row gutter={70}>
        <Col xs={24} sm={24} md={12}>
          <Row>
            <Col xs={24}>
              <h2>{t('profile-editor.position')}</h2>
            </Col>
            <Col xs={24}>
              <Form.Item label={t('profile-editor.company')}>
                <ViewModeInput type="select" value={company} />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item label={t('profile-editor.group')}>
                <ViewModeInput type="multiselect" value={groupList || []} />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item label={t('profile-editor.job-role')}>
                <ViewModeInput type="select" value={jobRole} />
              </Form.Item>
            </Col>
          </Row>
        </Col>

        <Col xs={24} sm={24} md={12}>
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
