import React, { useState, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'app/rootReducer'
import { FeatureState } from 'models/featureState'
import { PopupState, GenericPopupProps } from 'components/popups/GenericPopup'
import { NewsletterPreview } from 'models/newsletter'
import { useTableUtils, FilterMode } from 'hooks/useTableUtils'
import { ColumnType } from 'antd/lib/table'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { newsletterListActions } from './newsletterListSlice'
import { history } from 'router/router'
import { ResponsiveTableProps } from 'components/responsive/ResponsiveTable'
import { GenericModalFormProps } from 'components/popups/GenericModalForm'

const {
  createNewsletterTemplate,
  deleteNewsletterTemplate,
  getNewsletterTemplates,
  resetNewsletterTemplateFilters
} = newsletterListActions

interface NewsletterListUtils {
  tableProps: ResponsiveTableProps
  deletePopupProps: GenericPopupProps
  createModalFormProps: GenericModalFormProps
  openCreateTemplateModal: () => void
  handleGetNewsletterTemplates: () => void
  resetFilters: () => void
}
export const useNewsletterListUtils = (): NewsletterListUtils => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const { templateList, listParams, listState, createState } = useSelector(
    (state: RootState) => state.newsletterList
  )
  const [deletePopup, setDeletePopup] = useState<PopupState<NewsletterPreview>>()
  const [visibleCreateTemplatePopup, setVisibleCreateTemplatePopup] = useState(false)

  const loadingList = listState === FeatureState.Loading
  const loadingCreate = createState === FeatureState.Loading

  const openCreateTemplateModal = (): void => setVisibleCreateTemplatePopup(true)

  const handleGetNewsletterTemplates = useCallback((): void => {
    dispatch(getNewsletterTemplates())
  }, [dispatch])

  const editTemplate = useCallback((id?: number) => {
    history.push(`/newsletter/${id}`)
  }, [])

  const {
    paginationConfig,
    handleTableChange,
    columnConfig,
    actionColumnConfig,
    addKeyProp
  } = useTableUtils<NewsletterPreview>({
    listParamsState: listParams,
    filterKeys: ['name', 'modifiedAt'],
    getDataAction: getNewsletterTemplates
  })

  const resetFilters = (): void => {
    dispatch(resetNewsletterTemplateFilters())
  }

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
        title: t('newsletter.field.template-modified-at'),
        key: 'modifiedAt',
        width: '13rem',
        renderMode: 'date time',
        filterMode: FilterMode.DATEPICKER
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
                data: record,
                popupVisible: true
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
    created && setVisibleCreateTemplatePopup(false)
  }

  const tableProps: ResponsiveTableProps = {
    loading: loadingList,
    columns: columnsConfig,
    dataSource: addKeyProp(templateList),
    pagination: paginationConfig,
    onChange: handleTableChange
  }

  const deletePopupProps: GenericPopupProps = {
    id: deletePopup?.data?.id,
    type: 'delete',
    visible: !!deletePopup?.popupVisible,
    onOkAction: deleteNewsletterTemplate(deletePopup?.data?.id!),
    onCancel: () => setDeletePopup({ ...deletePopup, popupVisible: false }),
    afterClose: () => setDeletePopup(null)
  }

  const createModalFormProps: GenericModalFormProps = {
    loadingAction: loadingCreate,
    modalProps: {
      visible: visibleCreateTemplatePopup,
      title: t('newsletter.popup.title-save'),
      okText: t('common.save'),
      onCancel: () => {
        setVisibleCreateTemplatePopup(false)
      }
    },
    formProps: {
      onFinish: handleSave
    }
  }

  return {
    tableProps,
    deletePopupProps,
    createModalFormProps,
    openCreateTemplateModal,
    handleGetNewsletterTemplates,
    resetFilters
  }
}
