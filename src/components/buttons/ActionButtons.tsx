import React, { FC } from 'react'
import './ActionButtons.scss'
import { CrudButtonsProps } from './CrudButtons'

export const ActionButtons: FC<CrudButtonsProps> = props => {
  return <div className="action-buttons">{props.children}</div>
}
