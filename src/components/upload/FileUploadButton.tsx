import './FileUploadButton.scss'
import Upload from 'antd/lib/upload'
import Button from 'antd/lib/button'
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons'
import React, { FC } from 'react'
import { Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'
import { useFileUpload, UseFileUploadProps } from './useFileUpload'

export type FileUploadButtonProps = Pick<
  UseFileUploadProps,
  'initialFileId' | 'onRemove' | 'onSuccess'
>

export const FileUploadButton: FC<FileUploadButtonProps> = props => {
  const { t } = useTranslation()

  const {
    handleClear,
    handleFileUpload: handleSingleImageUpload,
    appendedUploadProps,
    thumbnail,
    handleThumbnailDownload
  } = useFileUpload({
    ...props
  })

  const uploadButton = (
    <Button
      icon={<UploadOutlined />}
      loading={thumbnail?.loading}
      className={`file-upload__button ${thumbnail?.error ? 'has-error' : ''}`}
    >
      {t('common.upload')}
    </Button>
  )

  const currentFile = (
    <div
      hidden={!thumbnail?.label}
      className="file-upload__current-file"
      onClick={handleThumbnailDownload}
    >
      <div>{thumbnail?.label}</div>
      <Button
        className="file-upload__current-file__delete-button"
        shape="circle"
        type="link"
        onClick={e => {
          e.stopPropagation()
          handleClear()
        }}
      >
        <DeleteOutlined />
      </Button>
    </div>
  )

  return (
    <>
      <Upload
        {...appendedUploadProps}
        onChange={handleSingleImageUpload}
        showUploadList={false}
        listType="picture-card"
        className={`file-upload ${thumbnail?.error ? 'has-error' : ''}`}
      >
        <Tooltip title={thumbnail?.error} placement="right" style={{ padding: '1.5rem' }}>
          {uploadButton}
        </Tooltip>
      </Upload>
      {currentFile}
    </>
  )
}
