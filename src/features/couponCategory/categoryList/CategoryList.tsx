import React, { FC, useState, useMemo } from 'react'
import { useSelector } from 'hooks/react-redux-hooks'
import { RootState } from 'app/rootReducer'
import { useTranslation } from 'react-i18next'
import { getCategories, deleteCategory } from './categoryListSlice'
import { Category } from 'models/category'
import { GenericPopup } from 'components/popups/GenericPopup'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { useTableUtils, FilterMode } from 'hooks/useTableUtils'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { hasPermission } from 'services/jwt-reader'
import { Roles } from 'api/swagger/models'
import { ColumnType } from 'antd/lib/table'
import { AddButton } from 'components/buttons/AddButton'

interface CategoryListProps {
  onOpenEditor: (id?: number) => void
}

export const CategoryList: FC<CategoryListProps> = props => {
  const { onOpenEditor } = props
  const { t } = useTranslation()
  const { listParams, categories, loading } = useSelector((state: RootState) => state.categoryList)
  const [categoryToDelete, setCategoryToDelete] = useState<{
    category?: Category
    popupVisible?: boolean
  } | null>()

  const { paginationConfig, handleTableChange, columnConfig, actionColumnConfig } = useTableUtils<
    Category
  >({
    listParamsState: listParams,
    filterKeys: ['name'],
    getDataAction: getCategories
  })

  const columnsConfig: ColumnType<Category>[] = useMemo(
    () => [
      columnConfig({
        title: t('coupon-category.field.name'),
        key: 'name',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      hasPermission([Roles.Administrator])
        ? actionColumnConfig({
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
          })
        : {}
    ],
    [columnConfig, t, actionColumnConfig, onOpenEditor]
  )

  const headerOptions = hasPermission([Roles.Administrator]) ? (
    <AddButton onClick={() => onOpenEditor()}>{t('coupon-category.add')}</AddButton>
  ) : (
    undefined
  )

  return (
    <>
      <ResponsiveCard
        forTable
        floatingTitle={t('coupon-category.list-title')}
        floatingOptions={headerOptions}
      >
        <ResponsiveTable
          {...{
            loading,
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
