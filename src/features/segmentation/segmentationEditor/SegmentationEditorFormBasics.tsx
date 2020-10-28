import React from 'react'
import { useTranslation } from 'react-i18next'
import { Col, Form, Input, Row, Select } from 'antd'
import { useCommonFormRules } from 'hooks'
import { SegmentationEditorUtils } from './useSegmentationEditorUtils'

interface SegmentationEditorFormBasicsProps {
  segmentationEditorUtils: SegmentationEditorUtils
}

export const SegmentationEditorFormBasics: React.FC<SegmentationEditorFormBasicsProps> = props => {
  const { t } = useTranslation()
  const rule = useCommonFormRules()
  const { categories } = props.segmentationEditorUtils

  return (
    <>
      <Row gutter={70}>
        <Col span={8}>
          <Form.Item
            name="name"
            label={t('segmentation-editor.basics.name')}
            rules={[
              rule.requiredString(t('error.validation.segmentation-editor.name-required')),
              rule.max(60, t('error.validation.segmentation-editor.name-max-length-60'))
            ]}
          >
            <Input maxLength={60} />
          </Form.Item>
        </Col>

        <Col span={8} offset={4}>
          <Form.Item
            name="segmentationCategoryId"
            label={t('segmentation-editor.basics.category')}
            rules={[rule.required(t('error.validation.segmentation-editor.category-required'))]}
          >
            <Select>
              {categories?.map(x => (
                <Select.Option key={x.id} value={x.id!}>
                  {x.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}
