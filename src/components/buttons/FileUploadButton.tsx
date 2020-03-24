import Upload, { UploadProps } from 'antd/lib/upload'
import Button from 'antd/lib/button'
import { UploadOutlined } from '@ant-design/icons'
import React, { FC, useState, useEffect } from 'react'
import { UploadFile } from 'antd/lib/upload/interface'

export interface UploadButtonProps {
  uploadProps: UploadProps
  onSuccess?: (id: string) => void
  onRemove?: () => void
  fileId?: string
}

function getUrl(): string {
  const getUrl = window.location
  return getUrl.protocol + '//' + getUrl.host
}

export const FileUploadButton: FC<UploadButtonProps> = ({ ...props }) => {
  // TODO Move this logic to Api, this is just a temporary solution
  const basePath = process.env.REACT_APP_API_URL || getUrl()
  const apiKey = (): string => `Bearer ${sessionStorage.getItem('jwt')}`

  const [fileList, setFileList] = useState<UploadFile<any>[]>([])

  useEffect(() => {
    setFileList(
      props.fileId
        ? [
            {
              name: props.fileId,
              uid: props.fileId,
              size: 0,
              type: ''
            }
          ]
        : []
    )
  }, [props.fileId])

  return (
    <Upload
      {...props.uploadProps}
      action={basePath + '/api/Files'}
      headers={{ Authorization: apiKey() }}
      fileList={fileList}
      onChange={info => {
        let componentFileList = [...info.fileList]

        // Only to show the most recent uploaded file, and old one will be replaced by the new
        componentFileList = componentFileList.slice(-1)

        componentFileList = componentFileList.map(file => {
          if (file.response) {
            file.name = file.response.id
          }
          if (file.status === 'done') {
            props.onSuccess?.(file.response.id)
          }
          return file
        })
        setFileList(componentFileList)
      }}
      // There is only 1 file, so you know what to do...
      onRemove={() => props.onRemove?.()}
    >
      <Button style={{ borderRadius: '0.2rem' }}>
        <UploadOutlined /> Upload
      </Button>
    </Upload>
  )
}
