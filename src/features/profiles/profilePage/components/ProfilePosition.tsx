import React from 'react'
import { useTranslation } from 'react-i18next'
import { Form, Select } from 'antd'
import { useCommonFormRules } from 'hooks'
import { Company } from 'models/company'
import { Group } from 'models/group'
import { JobRole } from 'models/jobRole'

interface ProfilePositionProps {
  companies?: Company[]
  groups?: Group[]
  jobRoles?: JobRole[]
  isEditMode: boolean
}

export const ProfilePosition: React.FC<ProfilePositionProps> = ({
  companies,
  groups,
  jobRoles,
  isEditMode
}) => {
  const { t } = useTranslation()
  const rule = useCommonFormRules()

  return (
    <>
      <h2>{t('profile-editor.position')}</h2>
      <Form.Item
        name="companyId"
        label={t('profile-editor.company')}
        rules={[rule.required(t('error.validation.profile-editor.company-required'))]}
      >
        <Select disabled={!isEditMode}>
          {companies?.map(x => (
            <Select.Option key={x.id} value={x.id!}>
              {x.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="groupIds" label={t('profile-editor.group')}>
        <Select mode="multiple" showArrow disabled={!isEditMode}>
          {groups?.map(x => (
            <Select.Option key={x.id} value={x.id!}>
              {x.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="jobRoleId"
        label={t('profile-editor.job-role')}
        rules={[rule.required(t('error.validation.profile-editor.job-role-required'))]}
      >
        <Select disabled={!isEditMode}>
          {jobRoles?.map(x => (
            <Select.Option key={x.id} value={x.id!}>
              {x.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </>
  )
}
