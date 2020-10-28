import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Collapse, Form } from 'antd'
import { SegmentationEditorFormBasics } from './SegmentationEditorFormBasics'
import { SegmentationEditorUtils } from './useSegmentationEditorUtils'
import { QueryBuilderView } from './queryBuilder/QueryBuilderView'
import { QueryBuilderUtils } from './queryBuilder/useQueryBuilderUtils'

interface SegmentationEditorFormProps {
  segmentationEditorUtils: SegmentationEditorUtils
  queryBuilderUtils: QueryBuilderUtils
}

export const SegmentationEditorForm: React.FC<SegmentationEditorFormProps> = props => {
  const { t } = useTranslation()
  const { segmentationEditorUtils, queryBuilderUtils } = props
  const { submitable, saving, id, checkFieldsChange, handleSave } = segmentationEditorUtils

  return (
    <>
      <Form
        name="coupon-editor-form"
        layout="vertical"
        form={segmentationEditorUtils.formUtils.form}
        onFinish={handleSave}
        onFieldsChange={checkFieldsChange}
      >
        <Collapse defaultActiveKey={['1']}>
          <Collapse.Panel header={t('segmentation-editor.basics.title')} key="1">
            <SegmentationEditorFormBasics segmentationEditorUtils={segmentationEditorUtils} />
          </Collapse.Panel>
        </Collapse>

        <Collapse defaultActiveKey={['2']}>
          <Collapse.Panel header={t('segmentation-editor.query.title')} key="2">
            <QueryBuilderView queryBuilder={queryBuilderUtils} />
          </Collapse.Panel>
        </Collapse>

        <Button type="primary" htmlType="submit" disabled={!submitable} loading={saving}>
          {!id ? t('segmentation-editor.button-create') : t('segmentation-editor.button-save')}
        </Button>
      </Form>
    </>
  )
}
