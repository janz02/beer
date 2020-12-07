import { LoadingOutlined } from '@ant-design/icons'
import React, { FC } from 'react'
import './LoadingIndicator.scss'

interface LoadingIndicatorProps {
  isLoading: boolean
  children?: React.ReactNode
}

export const LoadingIndicator: FC<LoadingIndicatorProps> = ({ isLoading, children }) => {
  return isLoading ? (
    <div className="center">
      <LoadingOutlined />{' '}
    </div>
  ) : (
    <> {children} </>
  )
}
