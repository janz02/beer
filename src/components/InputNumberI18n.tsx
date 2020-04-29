import React from 'react'
import { useTranslation } from 'react-i18next'
import { InputNumber } from 'antd'
import { InputNumberProps } from 'antd/lib/input-number'

export const InputNumberI18n: React.FC<InputNumberProps> = props => {
  const { i18n } = useTranslation()

  return <InputNumber {...props} decimalSeparator={i18n.language === 'hu' ? ',' : '.'} />
}
