import React, { FC, useMemo, useCallback, useState, useEffect } from 'react'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { useTranslation } from 'react-i18next'
import { Form, Input } from 'antd'
import { useCommonFormRules } from 'hooks'
import { RootState } from 'app/rootReducer'
import { useSelector } from 'react-redux'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { history } from 'router/router'
import {
  deleteNewsletterTemplate,
  getNewsletterTemplates,
  createNewsletterTemplate
} from './newsletterListSlice'
import { GenericPopup } from 'components/popups/GenericPopup'
import { useDispatch } from 'hooks/react-redux-hooks'
import { NewsletterPreview } from 'models/newsletter'
import { GenericModalForm } from 'components/popups/GenericModalForm'
import { useTableUtils, FilterMode } from 'hooks/useTableUtils'
import { ColumnType } from 'antd/lib/table'
import { AddButton } from 'components/buttons/AddButton'

export const NewsletterList: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const rule = useCommonFormRules()

  const { templates, listParams, loading, loadingCreate } = useSelector(
    (state: RootState) => state.newsletterList
  )

  const [visibleSaveNewPopup, setVisibleSaveNewPopup] = useState(false)
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

  const { paginationConfig, handleTableChange, columnConfig, actionColumnConfig } = useTableUtils<
    NewsletterPreview
  >({
    listParamsState: listParams,
    filterKeys: ['name'],
    getDataAction: getNewsletterTemplates
  })

  const columnsConfig: ColumnType<NewsletterPreview>[] = useMemo(
    () => [
      columnConfig({
        title: t('newsletter.field.template-name'),
        key: 'name',
        sort: true,
        width: '35%',
        filterMode: FilterMode.SEARCH
      }),
      columnConfig({
        title: t('newsletter.field.template-version'),
        key: 'version',
        width: '4rem'
      }),
      columnConfig({
        title: t('newsletter.field.template-version'),
        key: 'modifiedAt',
        width: '10rem',
        renderMode: 'date time'
      }),
      columnConfig({
        title: t('newsletter.field.template-modified-by'),
        key: 'modifiedBy'
      }),
      actionColumnConfig({
        render: (record: NewsletterPreview) => (
          <CrudButtons
            onEdit={() => editTemplate(record.id)}
            onDelete={() => {
              setDeletePopup({
                template: record,
                visible: true
              })
            }}
          />
        )
      })
    ],
    [actionColumnConfig, columnConfig, editTemplate, t]
  )

  const handleSave = async (values: any): Promise<void> => {
    const { templateName } = values
    const created = await dispatch(createNewsletterTemplate(templateName))
    created && setVisibleSaveNewPopup(false)
  }

  const headerOptions = (
    <AddButton onClick={() => setVisibleSaveNewPopup(true)}>{t('newsletter.add')}</AddButton>
  )

  return (
    <>
      <ResponsiveCard
        floatingTitle={t('newsletter.available-templates')}
        floatingOptions={headerOptions}
        forTable
        width="normal"
      >
        <ResponsiveTable
          {...{
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
        loadingAction={loadingCreate}
        modalProps={{
          visible: visibleSaveNewPopup,
          title: t('newsletter.popup.title-save'),
          okText: t('common.save'),
          onCancel: () => {
            setVisibleSaveNewPopup(false)
          }
        }}
        formProps={{
          onFinish: handleSave
        }}
      >
        <Form.Item
          name="templateName"
          label={t('newsletter.field.template-name')}
          rules={[rule.requiredString(), rule.max(35)]}
        >
          <Input maxLength={35} />
        </Form.Item>
      </GenericModalForm>
    </>
  )
}
