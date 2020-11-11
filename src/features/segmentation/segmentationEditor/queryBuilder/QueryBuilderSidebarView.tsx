import React from 'react'
import { Button } from 'antd'
import { ResponsiveCard } from '../../../../components/responsive/ResponsiveCard'
import { useTranslation } from 'react-i18next'
import { NKMRTDApplicationModelsSegmentationQueryBuilderField } from 'api/swagger/campaign-editor'
import './QueryBuilderSidebarView.scss'

interface SidebarViewProps {
  fields?: NKMRTDApplicationModelsSegmentationQueryBuilderField[]
  onFieldSelected: (field: string) => void
}

export const QueryBuilderSidebarView: React.FC<SidebarViewProps> = props => {
  const { t } = useTranslation()
  const { fields, onFieldSelected } = props

  const renderFieldsFor = (
    parentPrefix: string,
    subFields: NKMRTDApplicationModelsSegmentationQueryBuilderField[]
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
    fields: NKMRTDApplicationModelsSegmentationQueryBuilderField[]
  ): JSX.Element => (
    <>
      {fields.map((x: NKMRTDApplicationModelsSegmentationQueryBuilderField, idx: number) => {
        return (
          <React.Fragment key={idx}>
            <ul>
              {// TODO provide translation
              x.label?.replace('querybuilder.fields.label.', '')}
              {renderFieldsFor(`${localizationPrefix}.${x.fieldName}`, x.subFields || [])}
            </ul>
          </React.Fragment>
        )
      })}
    </>
  )

  return (
    <div>
      <ResponsiveCard title={t('query-builder.sidebar.header')}>
        <ul className="query-builder-sidebar">
          {!!fields &&
            fields.map((x: NKMRTDApplicationModelsSegmentationQueryBuilderField, idx: number) => {
              return (
                <React.Fragment key={idx}>
                  {x.label}
                  {// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  renderMenuItems(x.fieldName!, x.subFields!)}
                </React.Fragment>
              )
            })}
        </ul>
      </ResponsiveCard>
    </div>
  )
}
