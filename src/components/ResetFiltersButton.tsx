import React from 'react'
import './ResetFiltersButton.scss'
import { useTranslation } from 'react-i18next'
import { Button } from 'antd'

interface ResetFiltersButtonProps {
  onClick?: React.MouseEventHandler<HTMLElement>
}

export const ResetFiltersButton: React.FC<ResetFiltersButtonProps> = props => {
  const { t } = useTranslation()

  return (
    <Button className="reset-filters-button" type="link" onClick={props.onClick}>
      {t('common.reset-filters')}
    </Button>
  )
}
