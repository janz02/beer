import React, { FC } from 'react'
import './CategoryList.scss'
import { useTranslation } from 'react-i18next'
import { GenericPopup } from 'components/popups/GenericPopup'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { hasPermission } from 'services/jwt-reader'
import { Roles } from 'api/swagger/models'
import { AddButton } from 'components/buttons/AddButton'
import { useCategoryList } from './useCategoryList'

interface CategoryListProps {
  onOpenEditor: (id?: number) => void
}

export const CategoryList: FC<CategoryListProps> = props => {
  const { onOpenEditor } = props
  const { t } = useTranslation()
  const { tableProps, popupProps } = useCategoryList({ onOpenEditor })

  const headerOptions = hasPermission([Roles.Administrator]) ? (
    <AddButton onClick={() => onOpenEditor()}>{t('coupon-category.add')}</AddButton>
  ) : (
    undefined
  )

  return (
    <div className="category-list">
      <ResponsiveCard
        forTable
        floatingTitle={t('coupon-category.list-title')}
        floatingOptions={headerOptions}
      >
        <ResponsiveTable {...tableProps} />
      </ResponsiveCard>
      <GenericPopup {...popupProps} />
    </div>
  )
}
