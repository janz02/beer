import React, { FC, useMemo } from 'react'
import { Col, Form, Row, Image } from 'antd'
import { useTranslation } from 'react-i18next'
import { ProfileUtils } from '../useProfileUtils'
import { ViewModeInput, ViewModeSelect } from 'components/viewModeFormItems'
import './ProfileBasics.scss'
import noProfilePicture from 'assets/img/noprofile.png'
import { ProfileStatusDisplay } from 'features/profiles/profileList/ProfileStatusDisplay'

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
      ? filtered.map(el => ({ name: el.name, linkTo: `/organization/companies/${el.id}` }))[0]
      : null
  }, [companies, profile])

  const jobRole = useMemo<ViewModeSelect | null>(() => {
    const filtered = jobRoles?.filter(el => el.id === profile?.jobRoleId) || []

    return filtered.length > 0
      ? filtered.map(el => ({ name: el.name, linkTo: `/organization/job-roles/${el.id}` }))[0]
      : null
  }, [jobRoles, profile])

  const groupList = useMemo<ViewModeSelect[] | null>(
    () =>
      groups
        ?.filter(el => profile?.groupIds.includes(el.id))
        .map(el => ({ name: el.name, linkTo: `/organization/groups/${el.id}` })) || null,
    [profile, groups]
  )

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={6}>
          <Image
            width="100%"
            height="auto"
            src={profilePictureUrl || 'error'}
            fallback={noProfilePicture}
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
              <Form.Item label={t('profile-editor.status')}>
                <ProfileStatusDisplay status={profile?.status} />
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
