import React, { FC, useMemo, useCallback, useState, useEffect } from 'react'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { useTranslation } from 'react-i18next'
import { Button, Form, Select, Input } from 'antd'
import { useCommonFormRules } from 'hooks'
import { RootState } from 'app/rootReducer'
import { useSelector } from 'react-redux'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { history } from 'router/router'
import {
  deleteNewsletterTemplate,
  getNewsletterTemplates,
  sendNewsletterEmailToSegment,
  createNewsletterTemplate,
  getSegmentsForEmail
} from './newsletterListSlice'
import { GenericPopup } from 'components/popups/GenericPopup'
import { useDispatch } from 'hooks/react-redux-hooks'
import { NewsletterPreview } from 'models/newsletter'
import { GenericModalForm } from 'components/popups/GenericModalForm'
import { MomentDisplay } from 'components/MomentDisplay'
import { useTableUtils } from 'hooks/useTableUtils'

export const NewsletterList: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const rule = useCommonFormRules()

  const { templates, pagination, error, segments, loading } = useSelector(
    (state: RootState) => state.newsletterList
  )

  const [visibleSaveNewPopup, setVisibleSaveNewPopup] = useState(false)
  const [sendPopup, setSendPopup] = useState<{
    template?: NewsletterPreview
    visible?: boolean
    sending?: boolean
  } | null>()
  const [deletePopup, setDeletePopup] = useState<{
    template?: NewsletterPreview
    visible?: boolean
  } | null>()

  const editTemplate = useCallback((id?: number) => {
    history.push(`/newsletter/${id}`)
  }, [])

  useEffect(() => {
    dispatch(getNewsletterTemplates())
  }, [dispatch])

  const { paginationConfig, handleTableChange, sorterConfig } = useTableUtils({
    error,
    paginationState: pagination,
    getDataAction: getNewsletterTemplates
  })

  const columnsConfig = useMemo(
    () => [
      {
        title: t('newsletter.field.template-name'),
        key: 'name',
        dataIndex: 'name',
        ...sorterConfig
      },
      {
        title: t('newsletter.field.template-version'),
        key: 'version',
        dataIndex: 'version'
      },
      {
        title: t('newsletter.field.template-modified-at'),
        key: 'modifiedAt',
        render(record: NewsletterPreview) {
          return <MomentDisplay date={record.modifiedAt} mode="date/time" />
        }
      },
      {
        title: t('common.actions'),
        key: 'actions',
        colSpan: 1,
        render(record: NewsletterPreview) {
          return (
            <CrudButtons
              onSend={() => {
                dispatch(getSegmentsForEmail())
                setSendPopup({ visible: true, template: record })
              }}
              onEdit={() => editTemplate(record.id)}
              onDelete={() => {
                setDeletePopup({
                  template: record,
                  visible: true
                })
              }}
            />
          )
        }
      }
    ],
    [dispatch, editTemplate, sorterConfig, t]
  )

  const headerOptions = (
    <Button type="primary" onClick={() => setVisibleSaveNewPopup(true)}>
      {t('common.create')}
    </Button>
  )

  return (
    <>
      <ResponsiveCard
        style={{ height: '70vh' }}
        floatingTitle={t('newsletter.available-templates')}
        floatingOptions={headerOptions}
        forTable
      >
        <ResponsiveTable
          tableProps={{
            loading,
            columns: columnsConfig,
            dataSource: templates.map((t, i) => ({ ...t, key: '' + i + t.id })),
            pagination: paginationConfig,
            onChange: handleTableChange
          }}
        />
      </ResponsiveCard>

      <GenericPopup
        id={deletePopup?.template?.id}
        type="delete"
        visible={!!deletePopup?.visible}
        onOkAction={deleteNewsletterTemplate(deletePopup?.template?.id!)}
        onCancel={() => setDeletePopup({ ...deletePopup, visible: false })}
        afterClose={() => setDeletePopup(null)}
      />

      <GenericModalForm
        modalProps={{
          ...sendPopup,
          title: t('newsletter.popup.title-send-segment'),
          okText: t('common.send'),
          okButtonProps: {
            disabled: sendPopup?.sending
          },
          onCancel: () => setSendPopup({ ...sendPopup, visible: false })
        }}
        formProps={{
          onFinish: async (values: any) => {
            setSendPopup({ ...sendPopup, sending: true })
            const sent: any = await dispatch(
              sendNewsletterEmailToSegment(values.segment, sendPopup?.template?.id!)
            )
            setSendPopup(sent ? null : { ...sendPopup, sending: false })
          }
        }}
      >
        <Form.Item
          name="segment"
          label={t('newsletter.popup.target-segment')}
          rules={[rule.required()]}
        >
          <Select onChange={(e: any) => console.log(e)}>
            {segments?.map(s => (
              <Select.Option key={s.id} value={s.id}>
                {s.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </GenericModalForm>

      <GenericModalForm
        modalProps={{
          visible: visibleSaveNewPopup,
          title: t('newsletter.popup.title-save'),
          okText: t('common.save'),
          onCancel: () => {
            setVisibleSaveNewPopup(false)
          }
        }}
        formProps={{
          onFinish: (values: any) => {
            const { templateName } = values
            dispatch(createNewsletterTemplate(templateName))
            setVisibleSaveNewPopup(false)
          }
        }}
      >
        <Form.Item
          name="templateName"
          label={t('newsletter.field.template-name')}
          rules={[rule.required()]}
        >
          <Input />
        </Form.Item>
      </GenericModalForm>
    </>
  )
}
