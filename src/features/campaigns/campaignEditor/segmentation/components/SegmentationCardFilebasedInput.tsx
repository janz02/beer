import { FileTextOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Collapse, Typography } from 'antd'
import { FileUploadButton } from 'components/upload/FileUploadButton'
import { FileExtension } from 'components/upload/fileUploadHelper'
import React, { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './SegmentationCardBase.module.scss'

export interface SegmentationCardFilebasedInputValue {
  result?: number
  fileId?: string
}

export interface SegmentationCardFilebasedInputProps {
  onRemove: () => void
  onDownload: (fileId?: string) => void
  value?: SegmentationCardFilebasedInputValue // from Form.Item
  onChange?: Function // from Form.Item
}

export const SegmentationCardFilebasedInput: FC<SegmentationCardFilebasedInputProps> = ({
  value,
  onChange,
  onRemove,
  onDownload
}) => {
  const { t } = useTranslation()

  const [innerValue, setInnerValue] = useState<SegmentationCardFilebasedInputValue>({ ...value })

  useEffect(() => {
    setInnerValue({ ...value })
  }, [value])

  const handleUploadSuccess = (fileInfo: any): void => {
    const newValue = {
      ...innerValue,
      fileId: fileInfo.id,
      result: Math.floor(Math.random() * 65) + 1
    }

    onChange?.(newValue)
  }

  const handleRemoveFile = (): void => {
    const newValue = { ...innerValue, fileId: null, result: 0 }

    onChange?.(newValue)
  }

  return (
    <Collapse
      defaultActiveKey={['card']}
      expandIcon={() => undefined}
      className={styles.card__container}
    >
      <Collapse.Panel
        key="card"
        className={`custom-form-item-card custom-form-item-card--filebased ${styles.card__panel}`}
        header={
          <span className={styles.card__headerContainer}>
            <FileTextOutlined />
            <span className={styles.card__titleAndBtnContainer}>
              <span className={styles.card__headerTitleContainer}>
                <Typography.Text strong>
                  {t('campaign-create.segmentation.definition')}
                </Typography.Text>
                <span>
                  <Typography.Text>
                    {`${t('campaign-create.segmentation.filtered-results')}: `}
                  </Typography.Text>
                  <Typography.Text strong>{innerValue?.result || 0}</Typography.Text>
                </span>
              </span>
              <Button
                onClick={e => {
                  e.stopPropagation()
                  onRemove()
                }}
                className={styles.card__deleteBtn}
              >
                <DeleteOutlined />
              </Button>
            </span>
          </span>
        }
      >
        <FileUploadButton
          onSuccess={handleUploadSuccess}
          onRemove={handleRemoveFile}
          onClick={() => onDownload(innerValue?.fileId)}
          initialFileId={innerValue.fileId}
          allowedExtensions={[FileExtension.CSV, FileExtension.TXT]}
        />
      </Collapse.Panel>
    </Collapse>
  )
}
