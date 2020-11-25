import React from 'react'
import { useTranslation } from 'react-i18next'
import { Form, Select } from 'antd'
import { useCommonFormRules } from 'hooks'

interface ProfilePositionProps {}

export const ProfilePosition: React.FC<ProfilePositionProps> = props => {
  const { t } = useTranslation()
  // const rule = useCommonFormRules()
  // const { categories } = props.segmentationEditorUtils

  return (
    <>
      <h2>{t('profile-editor.position')}</h2>
      <Form.Item
        name="company"
        label={t('profile-editor.company')}
        // rules={[rule.required(t('error.validation.profile-editor.category-required'))]}
      >
        <Select>
          <Select.Option key={1} value={1}>
            1
          </Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="group"
        label={t('profile-editor.group')}
        // rules={[rule.required(t('error.validation.profile-editor.category-required'))]}
      >
        <Select>
          <Select.Option key={1} value={1}>
            1
          </Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="jobRole"
        label={t('profile-editor.job-role')}
        // rules={[rule.required(t('error.validation.profile-editor.category-required'))]}
      >
        <Select mode="multiple" showArrow>
          <Select.Option key={1} value={1}>
            1
          </Select.Option>
          <Select.Option key={2} value={2}>
            2
          </Select.Option>
          <Select.Option key={4} value={4}>
            4
          </Select.Option>
        </Select>
      </Form.Item>
    </>
  )
}
