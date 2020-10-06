import React, { FC, useState, useEffect, useCallback } from 'react'
import { Spin, Tooltip } from 'antd'
import { api } from 'api'
import { getBase64 } from 'services/file-reader'
import { useTranslation } from 'react-i18next'
import { ThumbNailSize } from 'api/swagger/files/models/ThumbNailSize'
import { ReactComponent as NoImage } from 'assets/img/no-image.svg'

import './Thumbnail.scss'

interface ImageThumbnail {
  url?: string
  loading?: boolean
  error?: string
}

export interface ThumbnailProps {
  fileId: string
  size: ThumbNailSize
}

export const Thumbnail: FC<ThumbnailProps> = props => {
  const { fileId, size } = props
  const { t } = useTranslation()

  const [thumbnail, setThumbnail] = useState<ImageThumbnail>()

  const fetch = useCallback(async (): Promise<any> => {
    setTimeout(() => {
      setThumbnail({ loading: true })
    }, 0)

    try {
      const file = await api.files.files.downloadThumbnail({
        id: fileId,
        size: size
      })

      getBase64(file, imageUrl => {
        setThumbnail({ url: imageUrl, loading: false })
      })
    } catch (e) {
      setThumbnail({ loading: false, error: t('error.file.download-fail') })
    }
  }, [fileId, size, t])

  useEffect(() => {
    fetch()
  }, [fetch])

  // TODO Use this in the Picture uploadButton
  // TODO propagate the loading to other states, so components can wait till all loaded
  return (
    <Tooltip title={thumbnail?.error} placement="right" className="thumbnail-tooltip">
      <Spin spinning={!!thumbnail?.loading}>
        {!thumbnail?.error ? (
          <img
            hidden={!thumbnail?.url}
            alt="example"
            className="thumbnail-image"
            src={thumbnail?.url}
          />
        ) : (
          <NoImage className="thumbnail-not-found" />
        )}
      </Spin>
    </Tooltip>
  )
}
