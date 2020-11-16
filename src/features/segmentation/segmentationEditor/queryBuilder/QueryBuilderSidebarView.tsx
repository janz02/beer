import React from 'react'
import { Button } from 'antd'
import { ResponsiveCard } from '../../../../components/responsive/ResponsiveCard'
import { useTranslation } from 'react-i18next'
import { NKMRTDCampaignEditorApplicationModelsSegmentationQueryBuilderField } from 'api/swagger/campaign-editor'
import './QueryBuilderSidebarView.scss'
import { useQueryBuilderUtils } from './useQueryBuilderUtils'

interface SidebarViewProps {
    fields?: NKMRTDCampaignEditorApplicationModelsSegmentationQueryBuilderField[]
}

export const QueryBuilderSidebarView: React.FC<SidebarViewProps> = props => {
  const { t } = useTranslation()
  const { fields } = props
  const queryBuilder = useQueryBuilderUtils()

  const renderFieldsFor = (
    parentPrefix: string,
    subFields: NKMRTDCampaignEditorApplicationModelsSegmentationQueryBuilderField[]
  ): JSX.Element => (
    <>
      {subFields.map((x, idx) => {
        return (
          <li key={idx}>
            <Button
              onClick={() => {
                queryBuilder.handleOnSidebarFieldSelected(`${parentPrefix}.${x.fieldName}`)
              }}
            >
              {// TODO provide translation
              x.label?.replace('querybuilder.fields.label.', '')}
            </Button>
          </li>
        )
      })}
    </>
  )

  const renderMenuItems = (
    localizationPrefix: string,
    fields: NKMRTDCampaignEditorApplicationModelsSegmentationQueryBuilderField[]
  ): JSX.Element => (
    <>
      {fields.map(
        (x: NKMRTDCampaignEditorApplicationModelsSegmentationQueryBuilderField, idx: number) => {
          return (
            <React.Fragment key={idx}>
              <ul>
                {// TODO provide translation
                x.label?.replace('querybuilder.fields.label.', '')}
                {renderFieldsFor(`${localizationPrefix}.${x.fieldName}`, x.subFields || [])}
              </ul>
            </React.Fragment>
          )
        }
      )}
    </>
  )

  return (
    <div>
      <ResponsiveCard title={t('query-builder.sidebar.header')}>
        <ul className="query-builder-sidebar">
          {!!fields &&
            fields.map(
              (
                x: NKMRTDCampaignEditorApplicationModelsSegmentationQueryBuilderField,
                idx: number
              ) => {
                return (
                  <React.Fragment key={idx}>
                    {x.label}
                    {// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    renderMenuItems(x.fieldName!, x.subFields!)}
                  </React.Fragment>
                )
              }
            )}
        </ul>
      </ResponsiveCard>
    </div>
  )
}
