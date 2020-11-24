import React from 'react'
import { Button } from 'antd'
import { ResponsiveCard } from '../../../../components/responsive/ResponsiveCard'
import { useTranslation } from 'react-i18next'
import './QueryBuilderSidebarView.scss'
import { useQueryBuilderUtils } from './useQueryBuilderUtils'
import { QueryBuilderField } from 'models/campaign/queryBuilderField'

interface SidebarViewProps {
  fields?: QueryBuilderField[]
}

export const QueryBuilderSidebarView: React.FC<SidebarViewProps> = props => {
  const { t } = useTranslation()
  const { fields } = props
  const queryBuilder = useQueryBuilderUtils()

  const renderFieldsFor = (parentPrefix: string, subFields: QueryBuilderField[]): JSX.Element => (
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
    fields: QueryBuilderField[]
  ): JSX.Element => (
    <>
      {fields.map((x: QueryBuilderField, idx: number) => {
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
            fields.map((x: QueryBuilderField, idx: number) => {
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
