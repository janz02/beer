import React, { FC, useState, useMemo } from 'react'
import { useSelector } from 'hooks/react-redux-hooks'
import { RootState } from 'app/rootReducer'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { getCategories, deleteCategory } from './categoryListSlice'
import { Category } from 'models/category'
import { GenericPopup } from 'components/popups/GenericPopup'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { useTableUtils } from 'hooks/useTableUtils'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'

interface CategoryListProps {
  onOpenEditor: (id?: number, createNew?: boolean) => void
}

export const CategoryList: FC<CategoryListProps> = props => {
  const { onOpenEditor } = props
  const { t } = useTranslation()
  const { pagination, categories } = useSelector((state: RootState) => state.categoryList)
  const [categoryToDelete, setCategoryToDelete] = useState<{
    category?: Category
    popupVisible?: boolean
  } | null>()

  const { paginationConfig, handleTableChange, sorterConfig } = useTableUtils({
    paginationState: pagination,
    getDataAction: getCategories
  })

  const columnsConfig = useMemo(
    () => [
      {
        title: t('coupon-category.field.name'),
        key: 'name',
        dataIndex: 'name',
        ...sorterConfig
      },
      {
        title: t('common.actions'),
        key: 'actions',
        colSpan: 1,
        render(record: Category) {
          return (
            <CrudButtons
              onEdit={() => onOpenEditor(record.id)}
              onDelete={() => {
                setCategoryToDelete({
                  category: record,
                  popupVisible: true
                })
              }}
            />
          )
        }
      }
    ],
    [t, sorterConfig, onOpenEditor]
  )

  const headerOptions = (
    <Button type="primary" onClick={() => onOpenEditor(undefined, true)}>
      {t('common.create')}
    </Button>
  )

  return (
    <>
      <ResponsiveCard
        style={{ height: '70vh' }}
        forTable
        floatingTitle={t('coupon-category.list-title')}
        floatingOptions={headerOptions}
      >
        <ResponsiveTable
          {...{
            columns: columnsConfig,
            dataSource: categories.map((c, i) => ({ ...c, key: '' + i + c.id })),
            pagination: paginationConfig,
            onChange: handleTableChange
          }}
        />
      </ResponsiveCard>

      <GenericPopup
        id={categoryToDelete?.category?.id}
        type="delete"
        visible={!!categoryToDelete?.popupVisible}
        onOkAction={deleteCategory(categoryToDelete?.category?.id!)}
        onCancel={() => setCategoryToDelete({ ...categoryToDelete, popupVisible: false })}
        afterClose={() => setCategoryToDelete(null)}
      />
    </>
  )
}
