import Upload from 'antd/lib/upload'
import Button from 'antd/lib/button'
import { UploadOutlined } from '@ant-design/icons'
import React, { FC } from 'react'
import { useFileUpload, UseFileUploadProps } from 'hooks/useFileUpload'

export type PictureUploadButtonProps = UseFileUploadProps

export const FileUploadButton: FC<PictureUploadButtonProps> = props => {
  const { appendedUploadProps, onChangeKeepOnlyLastFile, onRemoveAll } = useFileUpload(props)

  return (
    <Upload {...appendedUploadProps} onChange={onChangeKeepOnlyLastFile} onRemove={onRemoveAll}>
      <Button style={{ borderRadius: '0.2rem' }}>
        <UploadOutlined /> Upload
      </Button>
    </Upload>
  )
}
