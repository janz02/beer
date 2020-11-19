import React from 'react'
import { Button } from 'antd'
import { ResponsiveCard } from '../../../../components/responsive/ResponsiveCard'
import { useTranslation } from 'react-i18next'
import { OptimaCampaignEditorApplicationModelsSegmentationQueryBuilderField } from 'api/swagger/campaign-editor'
import './QueryBuilderSidebarView.scss'

interface SidebarViewProps {
  fields?: OptimaCampaignEditorApplicationModelsSegmentationQueryBuilderField[]
  onFieldSelected: (field: string) => void
}

export const QueryBuilderSidebarView: React.FC<SidebarViewProps> = props => {
  const { t } = useTranslation()
  const { fields, onFieldSelected } = props

  const renderFieldsFor = (
    parentPrefix: string,
    subFields: OptimaCampaignEditorApplicationModelsSegmentationQueryBuilderField[]
  ): JSX.Element => (
    <>
      {subFields.map((x, idx) => {
        return (
          <li key={idx}>
            <Button
              onClick={() => {
                onFieldSelected(`${parentPrefix}.${x.fieldName}`)
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
    fields: OptimaCampaignEditorApplicationModelsSegmentationQueryBuilderField[]
  ): JSX.Element => (
    <>
      {fields.map(
        (x: OptimaCampaignEditorApplicationModelsSegmentationQueryBuilderField, idx: number) => {
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
                x: OptimaCampaignEditorApplicationModelsSegmentationQueryBuilderField,
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
