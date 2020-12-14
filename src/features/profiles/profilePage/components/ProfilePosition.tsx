import React from 'react'
import { useTranslation } from 'react-i18next'
import { Form, Select } from 'antd'
import { useCommonFormRules } from 'hooks'
import { ProfileUtils } from '../useProfileUtils'

interface ProfilePositionProps {
  profileEditorPageUtils: ProfileUtils
}

export const ProfilePosition: React.FC<ProfilePositionProps> = props => {
  const { t } = useTranslation()
  const rule = useCommonFormRules()
  const { companies, groups, jobRoles } = props.profileEditorPageUtils

  return (
    <>
      <h2>{t('profile-editor.position')}</h2>
      <Form.Item
        name="companyId"
        label={t('profile-editor.company')}
        rules={[rule.required(t('error.validation.profile-editor.company-required'))]}
      >
        <Select>
          {companies?.map(x => (
            <Select.Option key={x.id} value={x.id!}>
              {x.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="groupIds" label={t('profile-editor.group')}>
        <Select mode="multiple" showArrow>
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
        <Select>
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
