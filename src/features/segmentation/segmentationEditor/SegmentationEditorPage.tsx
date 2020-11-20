import React from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { ResponsiveHeader } from 'components/responsive/ResponsiveHeader'
import { Col, Row } from 'antd'
import { SegmentationEditorForm } from './SegmentationEditorForm'
import { history } from 'router/router'
import { useSegmentationEditorUtils } from './useSegmentationEditorUtils'
import { QueryBuilderSidebarView } from './queryBuilder/QueryBuilderSidebarView'
import { NavigationAlert } from 'components/popups/NavigationAlert'
import { useQueryBuilderUtils } from './queryBuilder/useQueryBuilderUtils'

export const SegmentationEditorPage: React.FC = () => {
  const { t } = useTranslation()
  const { segmentationId } = useParams()
  const segmentationEditorUtils = useSegmentationEditorUtils({
    id: segmentationId ? +segmentationId : undefined
  })
  const { modified } = segmentationEditorUtils
  const queryBuilderUtils = useQueryBuilderUtils()
  const title = segmentationId
    ? t('segmentation-editor.title-edit')
    : t('segmentation-editor.title-create')

  return (
    <>
      <Row className="campaign-editor-form">
        <Col span={18} className="editor-col">
          <ResponsiveHeader
            type="floating"
            title={title}
            backButton={{
              primary: true,
              onClick: () => {
                history.push('/segmentations-list')
              }
            }}
          />

          <NavigationAlert when={modified} />
          <SegmentationEditorForm
            segmentationEditorUtils={segmentationEditorUtils}
            queryBuilderUtils={queryBuilderUtils}
          />
        </Col>

        <Col span={6} className="comment-col">
          <QueryBuilderSidebarView
            fields={segmentationEditorUtils.fields}
            onFieldSelected={queryBuilderUtils.handleOnSidebarFieldSelected}
          />
        </Col>
      </Row>
    </>
  )
}
