import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Collapse, Form } from 'antd'
import { SegmentationEditorFormBasics } from './SegmentationEditorFormBasics'
import { SegmentationEditorUtils } from './useSegmentationEditorUtils'

interface SegmentationEditorFormProps {
  segmentationEditorUtils: SegmentationEditorUtils
}

export const SegmentationEditorForm: React.FC<SegmentationEditorFormProps> = props => {
  const { t } = useTranslation()
  const { segmentationEditorUtils } = props

  return (
    <>
      <Form
        name="coupon-editor-form"
        layout="vertical"
        form={segmentationEditorUtils.formUtils.form}
      >
        <Collapse defaultActiveKey={['1']}>
          <Collapse.Panel header={t('segmentation-editor.segmentation-basics')} key="1">
            <SegmentationEditorFormBasics segmentationEditorUtils={segmentationEditorUtils} />
          </Collapse.Panel>
        </Collapse>
      </Form>
    </>
  )
}
