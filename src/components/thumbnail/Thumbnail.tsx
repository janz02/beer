import React, { FC, useState, useEffect, useCallback } from 'react'
import { Spin, Tooltip } from 'antd'
import { api } from 'api2'
import { getBase64 } from 'services/file-reader'
import { useTranslation } from 'react-i18next'
import { DisconnectOutlined } from '@ant-design/icons'

interface ImageThumbnail {
  url?: string
  loading?: boolean
  error?: string
}

export interface ThumbnailProps {
  fileId: string
}

export const Thumbnail: FC<ThumbnailProps> = props => {
  const { fileId } = props
  const { t } = useTranslation()

  const [thumbnail, setThumbnail] = useState<ImageThumbnail>()

  const fetch = useCallback(async (): Promise<any> => {
    setTimeout(() => {
      setThumbnail({ loading: true })
    }, 0)

    try {
      const file = await api.files.downloadFile({ id: fileId })
      getBase64(file, imageUrl => {
        setThumbnail({ url: imageUrl, loading: false })
      })
    } catch (e) {
      setThumbnail({ loading: false, error: t('error.file.download-fail') })
    }
  }, [fileId, t])

  useEffect(() => {
    fetch()
  }, [fetch])

  // TODO Use this in the Picture uploadButton
  // TODO propagate the loading to other states, so components can wait till all loaded
  return (
    <Tooltip title={thumbnail?.error} placement="right" style={{ padding: '1.5rem' }}>
      <Spin spinning={!!thumbnail?.loading}>
        {!thumbnail?.error ? (
          <img
            hidden={!thumbnail?.url}
            alt="example"
            style={{ width: '100%' }}
            src={thumbnail?.url}
          />
        ) : (
          <DisconnectOutlined />
        )}
      </Spin>
    </Tooltip>
  )
}
