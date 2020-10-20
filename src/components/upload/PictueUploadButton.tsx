import './PictureUploadButton.scss'
import Upload from 'antd/lib/upload'
import Button from 'antd/lib/button'
import { EyeOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import React, { FC, useState, useMemo } from 'react'
import { Modal, Spin, Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'
import { useFileUploadUtils, FileUploadUtilsProps } from './useFileUploadUtils'

export type PictureUploadButtonProps = Pick<
  FileUploadUtilsProps,
  'disabled' | 'initialFileId' | 'onRemove' | 'onSuccess' | 'allowedExtensions'
>

export const PictureUploadButton: FC<PictureUploadButtonProps> = props => {
  const { t } = useTranslation()

  const {
    handleClear,
    handleFileUpload: handleSingleImageUpload,
    appendedUploadProps,
    thumbnail
  } = useFileUploadUtils({
    mode: 'image',
    ...props
  })

  const [previewVisible, setPreviewVisible] = useState(false)

  const uploadButton = (
    <div hidden={!!thumbnail?.url} className="picture-upload-button">
      {!thumbnail?.loading && (
        <>
          <PlusOutlined />
          <div className="ant-upload-text">{t('common.upload')}</div>
        </>
      )}
    </div>
  )

  const options = useMemo(() => {
    return (
      <div className="picture-upload-options">
        <Button
          hidden={!thumbnail?.url}
          shape="circle"
          onClick={e => {
            e.stopPropagation()
            setPreviewVisible(true)
          }}
          className="picture-upload-options__button picture-upload-options__button--view"
        >
          <EyeOutlined />
        </Button>
        {!props.disabled && (
          <Button
            hidden={!thumbnail?.url}
            shape="circle"
            type="default"
            danger
            onClick={e => {
              e.stopPropagation()
              handleClear(props.initialFileId)
            }}
            className="picture-upload-options__button picture-upload-options__button--delete"
          >
            <DeleteOutlined />
          </Button>
        )}
      </div>
    )
  }, [handleClear, props.disabled, thumbnail, props.initialFileId])

  const upload = useMemo(() => {
    return (
      <Upload
        {...appendedUploadProps}
        disabled={props.disabled}
        onChange={handleSingleImageUpload}
        showUploadList={false}
        listType="picture-card"
        className={`picture-upload ${thumbnail?.error ? 'has-error' : ''}`}
      >
        <Tooltip title={thumbnail?.error} placement="right" style={{ padding: '1.5rem' }}>
          <Spin spinning={!!thumbnail?.loading}>
            <img
              hidden={!thumbnail?.url}
              alt="example"
              style={{ width: '100%' }}
              src={thumbnail?.url}
            />
            {uploadButton}
            {options}
          </Spin>
        </Tooltip>
      </Upload>
    )
  }, [
    appendedUploadProps,
    handleSingleImageUpload,
    options,
    props.disabled,
    thumbnail,
    uploadButton
  ])

  return (
    <>
      {upload}
      <Modal
        className="picture-upload-preview"
        visible={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="preview" style={{ width: '100%' }} src={thumbnail?.url} />
      </Modal>
    </>
  )
}
