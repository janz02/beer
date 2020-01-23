import React, { FC, useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'app/rootReducer'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { useIsMobile } from 'hooks'
import { TablePaginationConfig } from 'antd/lib/table/Table'
import { getCategories } from './categoryListSlice'
import { Category } from 'models/category'
import { CategoryDeletePopup } from './CategoryDeletePopup'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { basePaginationConfig, projectPage } from 'models/pagination'

interface CategoryListProps {
  onOpenEditor: (id?: number, createNew?: boolean) => void
}

export const CategoryList: FC<CategoryListProps> = props => {
  const { onOpenEditor } = props

  const isMobile = useIsMobile()
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const error = useSelector((state: RootState) => state.categoryList.error)
  const pagination = useSelector((state: RootState) => state.categoryList.pagination)

  const categories = useSelector((state: RootState) => state.categoryList.categories)

  const [categoryToDelete, setCategoryToDelete] = useState<{
    category?: Category
    popupVisible?: boolean
  } | null>()

  const columnsConfig = useMemo(
    () => [
      {
        title: t('common.data'),
        key: 'data',
        render(record: Category) {
          return (
            <>
              <h4>{record.name}</h4>
            </>
          )
        }
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
    [t, onOpenEditor]
  )

  const paginationConfig = useMemo(
    (): TablePaginationConfig => ({
      ...basePaginationConfig(isMobile, !!error, pagination),
      onShowSizeChange: (current, size) => {
        dispatch(getCategories({ page: projectPage(size, pagination), pageSize: size }))
      },
      onChange: page => {
        dispatch(getCategories({ page }))
      }
    }),
    [isMobile, pagination, error, dispatch]
  )

  const headerOptions = (): JSX.Element => (
    <Button type="primary" onClick={() => onOpenEditor(undefined, true)}>
      {t('common.create')}
    </Button>
  )

  return (
    <>
      <ResponsiveTable
        headerTitle={t('coupon-category.list-title')}
        headerOptions={headerOptions}
        tableProps={{
          columns: columnsConfig,
          dataSource: categories.map((c, i) => ({ ...c, key: '' + i + c.id })),
          pagination: categories.length ? paginationConfig : false
        }}
        error={error}
      />

      <CategoryDeletePopup
        visible={!!categoryToDelete?.popupVisible}
        category={categoryToDelete?.category}
        onExit={() => setCategoryToDelete({ ...categoryToDelete, popupVisible: false })}
        afterClose={() => setCategoryToDelete(null)}
      />
    </>
  )
}
