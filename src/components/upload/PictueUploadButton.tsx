import './PictureUploadButton.scss'
import Upload, { RcFile } from 'antd/lib/upload'
import Button from 'antd/lib/button'
import { EyeOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import React, { FC, useState, useCallback } from 'react'
import { Modal, Spin, Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'
import { useFileUpload, UseFileUploadProps } from './useFileUpload'

export type PictureUploadButtonProps = Pick<
  UseFileUploadProps,
  'initialFileId' | 'onRemove' | 'onSuccess'
>

export const PictureUploadButton: FC<PictureUploadButtonProps> = props => {
  const { t } = useTranslation()

  const {
    handleClear,
    handleFileUpload: handleSingleImageUpload,
    appendedUploadProps,
    thumbnail
  } = useFileUpload({
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

  const options = (
    <div className="picture-upload-options">
      <Button
        hidden={!thumbnail?.url}
        shape="circle"
        onClick={e => {
          e.stopPropagation()
          setPreviewVisible(true)
        }}
      >
        <EyeOutlined />
      </Button>
      <Button
        hidden={!thumbnail?.url}
        shape="circle"
        type="danger"
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
