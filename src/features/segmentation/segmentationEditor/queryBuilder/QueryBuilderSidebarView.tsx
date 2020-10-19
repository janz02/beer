import React from 'react'
import { Button } from 'antd'
import { ResponsiveCard } from '../../../../components/responsive/ResponsiveCard'
import { useTranslation } from 'react-i18next'
import { QueryBuilderField } from 'api/swagger/campaign-editor'
import './QueryBuilderSidebarView.scss'

interface SidebarViewProps {
  fields?: QueryBuilderField[]
  onFieldSelected: (field: string) => void
}

export const QueryBuilderSidebarView: React.FC<SidebarViewProps> = props => {
  const { t } = useTranslation()
  const { fields, onFieldSelected } = props

  const renderFieldsFor = function(parentPrefix: any, subFields: any): JSX.Element {
    return (
      <>
        {Object.keys(subFields).map((key: any) => {
          return (
            <li key={key}>
              <Button
                onClick={() => {
                  onFieldSelected(`${parentPrefix}.${key}`)
                }}
              >
                {// TODO provide translation
                subFields[key].label.replace('querybuilder.fields.label.', '')}
              </Button>
            </li>
          )
        })}
      </>
    )
  }

  const renderMenuItems = function(localizationPrefix: string, fields: any): JSX.Element {
    return (
      <>
        {Object.keys(fields).map((subField: any, idx: number) => {
          return (
            <React.Fragment key={idx}>
              <ul>
                {// TODO provide translation
                fields[subField].label.replace('querybuilder.fields.label.', '')}
                {renderFieldsFor(`${localizationPrefix}.${subField}`, fields[subField].subFields)}
              </ul>
            </React.Fragment>
          )
        })}
      </>
    )
  }

  return (
    <div>
      <ResponsiveCard title={t('query-builder.sidebar.header')}>
        <ul className="query-builder-sidebar">
          {!!fields &&
            Object.keys(fields).map((subField: any, idx: number) => {
              return (
                <React.Fragment key={idx}>
                  {fields[subField].label}
                  {renderMenuItems(subField, fields[subField].subFields)}
                </React.Fragment>
              )
            })}
        </ul>
      </ResponsiveCard>
    </div>
  )
}
