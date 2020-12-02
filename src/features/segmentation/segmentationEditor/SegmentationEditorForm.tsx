import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Collapse, Form } from 'antd'
import { SegmentationEditorFormBasics } from './SegmentationEditorFormBasics'
import { SegmentationEditorUtils } from './useSegmentationEditorUtils'
import { QueryBuilderView } from './queryBuilder/QueryBuilderView'
import { useQueryBuilderUtils } from './queryBuilder/useQueryBuilderUtils'
import { CampaignSegmentation } from 'models/campaign/campaignSegmentation'

interface SegmentationEditorFormProps {
  segmentationEditorUtils: SegmentationEditorUtils
}

export const SegmentationEditorForm: React.FC<SegmentationEditorFormProps> = props => {
  const { t } = useTranslation()
  const { segmentationEditorUtils } = props
  const { submitable, saving, id, checkFieldsChange, handleSave } = segmentationEditorUtils
  const { treeTotal, treeAsString, conditions } = useQueryBuilderUtils()

  const saveSegmentationForm = (segmentation: CampaignSegmentation): void => {
    handleSave(segmentation, treeTotal, treeAsString, conditions)
  }

  return (
    <>
      <Form
        name="coupon-editor-form"
        layout="vertical"
        form={segmentationEditorUtils.formUtils.form}
        onFinish={saveSegmentationForm}
        onFieldsChange={checkFieldsChange}
        onSubmitCapture={(event: React.FormEvent<HTMLFormElement>) => {
          // workaround until this bug is fixed and we can update to the latest version
          // https://github.com/ukrbublik/react-awesome-query-builder/issues/321
          // the source problem is
          // https://github.com/ukrbublik/react-awesome-query-builder/pull/301
          if ((event.nativeEvent as any)?.submitter?.id !== 'segmentation-editor-submit-button') {
            event.preventDefault()
            event.stopPropagation()
          }
        }}
      >
        <Collapse defaultActiveKey={['1']}>
          <Collapse.Panel header={t('segmentation-editor.basics.title')} key="1">
            <SegmentationEditorFormBasics segmentationEditorUtils={segmentationEditorUtils} />
          </Collapse.Panel>
        </Collapse>

        <Collapse defaultActiveKey={['2']}>
          <Collapse.Panel header={t('segmentation-editor.query.title')} key="2">
            <QueryBuilderView formChangedCallback={checkFieldsChange} />
          </Collapse.Panel>
        </Collapse>

        <Button
          id="segmentation-editor-submit-button"
          type="primary"
          htmlType="submit"
          disabled={!submitable}
          loading={saving}
        >
          {!id ? t('segmentation-editor.button-create') : t('segmentation-editor.button-save')}
        </Button>
      </Form>
    </>
  )
}
