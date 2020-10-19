import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { saveSegmentation } from './segmentationEditorSlice'
import { useParams } from 'react-router-dom'
import { CampaignSegmentation } from 'models/campaign/campaignSegmentation'
import { EditorMode } from 'components/buttons/EditorModeOptions'
import { ResponsiveHeader } from 'components/responsive/ResponsiveHeader'
import { Col, Row } from 'antd'
import { SegmentationEditorForm } from './SegmentationEditorForm'
import { history } from 'router/router'
import { useSegmentationEditorUtils } from './useSegmentationEditorUtils'
import { useDispatch } from 'react-redux'
import { QueryBuilderSidebarView } from './queryBuilder/QueryBuilderSidebarView'

export const SegmentationEditorPage: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { segmentationId } = useParams()
  const segmentationEditorUtils = useSegmentationEditorUtils({
    id: segmentationId ? +segmentationId : undefined
  })

  const handleSave = (values: CampaignSegmentation): void => {
    dispatch(saveSegmentation(values))
  }

  const title = (mode: EditorMode): string => {
    switch (mode) {
      case EditorMode.EDIT:
        return t('segmentation.editor.title.edit')
      case EditorMode.NEW:
        return t('segmentation.editor.title.new')
      case EditorMode.VIEW:
      default:
        return t('segmentation.editor.title.view')
    }
  }

  return (
    <>
      <Row className="campaign-editor-form">
        <Col span={18} className="editor-col">
          <ResponsiveHeader
            type="floating"
            title={t('segmentation-editor.title-edit')}
            backButton={{
              primary: true,
              onClick: () => {
                history.push('/segmentations')
              }
            }}
          />

          {/* <NavigationAlert when={modified} /> */}
          {/* <CampaignEditorForm campaignUtils={props.campaignUtils} /> */}
          <SegmentationEditorForm segmentationEditorUtils={segmentationEditorUtils} />
        </Col>

        <Col span={6} className="comment-col">
          <QueryBuilderSidebarView
            fields={segmentationEditorUtils.fields}
            onFieldSelected={segmentationEditorUtils.handleOnSidebarFieldSelected}
          />
        </Col>
      </Row>
    </>
  )
}
