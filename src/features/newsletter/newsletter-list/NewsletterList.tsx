import React, { FC, useMemo, useCallback, useState, useEffect } from 'react'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { useTranslation } from 'react-i18next'
import { Button, Form, Select, Input } from 'antd'
import { basePaginationConfig, projectPage } from 'models/pagination'
import { TablePaginationConfig } from 'antd/lib/table'
import { useIsMobile, useCommonFormRules } from 'hooks'
import { RootState } from 'app/rootReducer'
import { useSelector } from 'react-redux'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { history } from 'router/router'
import { deleteNewsletterTemplate, getNewsletterTemplates } from './newsletterListSlice'
import { GenericPopup } from 'components/popups/GenericPopup'
import { useDispatch } from 'hooks/react-redux-hooks'
import { NewsletterPreviewData } from 'models/newsletter'
import { GenericModalForm } from 'components/popups/GenericModalForm'

export const NewsletterList: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const rule = useCommonFormRules()

  const isMobile = useIsMobile()

  const { templates, pagination, error, segments } = useSelector(
    (state: RootState) => state.newsletterList
  )

  const [sendPopup, setSendPopup] = useState({
    visible: false
  })

  const [templateToDelete, setTemplateToDelete] = useState<{
    template?: NewsletterPreviewData
    popupVisible?: boolean
  } | null>()

  const editTemplate = useCallback((id?: number) => {
    history.push(`/newsletter/editor/${id ?? ''}`)
  }, [])

  useEffect(() => {
    dispatch(getNewsletterTemplates())
  }, [dispatch])

  const columnsConfig = useMemo(
    () => [
      {
        title: t('newsletter.field.template-name'),
        key: 'name',
        dataIndex: 'name'
      },
      {
        title: t('common.actions'),
        key: 'actions',
        colSpan: 1,
        render(record: NewsletterPreviewData) {
          return (
            <CrudButtons
              onSend={() => setSendPopup({ visible: true })}
              onEdit={() => editTemplate(record.id)}
              onDelete={() => {
                setTemplateToDelete({
                  template: record,
                  popupVisible: true
                })
              }}
            />
          )
        }
      }
    ],
    [editTemplate, t]
  )

  const paginationConfig = useMemo((): TablePaginationConfig | false => {
    const baseConfig = basePaginationConfig(isMobile, !!error, pagination)
    return baseConfig.total
      ? {
          ...baseConfig,
          onShowSizeChange: (current, size) => {
            dispatch(
              getNewsletterTemplates({ page: projectPage(size, pagination), pageSize: size })
            )
          },
          onChange: page => {
            dispatch(getNewsletterTemplates({ page }))
          }
        }
      : false
  }, [dispatch, error, isMobile, pagination])

  const headerOptions = (): JSX.Element => (
    <Button type="primary" onClick={() => editTemplate()}>
      {t('common.create')}
    </Button>
  )
  return (
    <div>
      <ResponsiveCard>
        <ResponsiveTable
          headerTitle={t('newsletter.available-templates')}
          headerOptions={headerOptions}
          tableProps={{
            columns: columnsConfig,
            dataSource: templates.map((t, i) => ({ ...t, key: '' + i + t.id })),
            pagination: paginationConfig
          }}
          error={error}
        />
      </ResponsiveCard>
      <GenericPopup
        id={templateToDelete?.template?.id}
        type="delete"
        visible={!!templateToDelete?.popupVisible}
        onOkAction={deleteNewsletterTemplate(templateToDelete?.template?.id!)}
        onCancel={() => setTemplateToDelete({ ...templateToDelete, popupVisible: false })}
        afterClose={() => setTemplateToDelete(null)}
      />
      <GenericModalForm
        modalProps={{
          ...sendPopup,
          title: t('newsletter.popup.title-send'),
          okText: t('common.send'),
          onCancel: () => setSendPopup({ ...sendPopup, visible: false })
        }}
        formProps={{}}
      >
        <Form.Item name="email" label="TEMP field: email" rules={[rule.required()]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="templateName"
          label={t('newsletter.popup.target-segment')}
          rules={[rule.required()]}
        >
          <Select>
            {segments?.map(s => (
              <Select.Option value={s.id}>{s.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
      </GenericModalForm>
    </div>
  )
}
