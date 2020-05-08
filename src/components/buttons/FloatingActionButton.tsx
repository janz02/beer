import './FloatingActionButton.scss'
import React, { FC } from 'react'
import { Button, Badge } from 'antd'
import { ButtonProps } from 'antd/lib/button'

interface FloatingActionButtonProps extends ButtonProps {
  count?: number
  vertical: 'top' | 'bottom'
  horizontal: 'left' | 'right'
}
export const FloatingActionButton: FC<FloatingActionButtonProps> = props => {
  const { vertical, horizontal, count, children, ...buttonProps } = props

  const classNames = `fab fab--v-${vertical} fab--h-${horizontal}`

  return (
    <Button className={classNames} shape="circle" {...buttonProps}>
      <Badge className="fab__badge" count={count}>
        <div>{children}</div>
      </Badge>
    </Button>
  )
}
