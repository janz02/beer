import './FileUploadButton.scss'
import Upload from 'antd/lib/upload'
import Button from 'antd/lib/button'
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons'
import React, { FC } from 'react'
import { Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'
import { useFileUploadUtils, FileUploadUtilsProps } from './useFileUploadUtils'

export type FileUploadButtonProps = Pick<
  FileUploadUtilsProps,
  'disabled' | 'initialFileId' | 'onRemove' | 'onSuccess' | 'onClick' | 'allowedExtensions'
>

export const FileUploadButton: FC<FileUploadButtonProps> = props => {
  const { t } = useTranslation()

  const {
    handleClear,
    handleFileUpload: handleSingleImageUpload,
    appendedUploadProps,
    thumbnail,
    acceptFileExtensions
  } = useFileUploadUtils({
    ...props
  })

  const uploadButton = (
    <Button
      icon={<UploadOutlined />}
      disabled={props.disabled}
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
      onClick={() => props.onClick?.()}
    >
      <div>{thumbnail?.label}</div>
      {!props.disabled && (
        <Button
          className="file-upload__current-file__delete-button"
          shape="circle"
          type="link"
          onClick={e => {
            e.stopPropagation()
            handleClear(props.initialFileId)
          }}
        >
          <DeleteOutlined />
        </Button>
      )}
    </div>
  )

  return (
    <>
      <Upload
        {...appendedUploadProps}
        onChange={handleSingleImageUpload}
        disabled={props.disabled}
        showUploadList={false}
        listType="picture-card"
        className={`file-upload ${thumbnail?.error ? 'has-error' : ''}`}
        accept={acceptFileExtensions}
      >
        <Tooltip title={thumbnail?.error} placement="right" style={{ padding: '1.5rem' }}>
          {uploadButton}
        </Tooltip>
      </Upload>
      {currentFile}
    </>
  )
}
