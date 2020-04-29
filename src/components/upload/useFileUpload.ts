import { useState, useEffect, useMemo, useCallback } from 'react'
import { UploadFile, UploadProps, UploadChangeParam } from 'antd/lib/upload/interface'
import { useTranslation } from 'react-i18next'
import { api, RequestError } from 'api'
import { getBase64 } from 'services/file-reader'
import { displayBackendError } from 'services/errorHelpers'

function getUrl(): string {
  const getUrl = window.location
  return getUrl.protocol + '//' + getUrl.host
}

interface FileThumbnail {
  label?: string
  url?: string
  loading?: boolean
  error?: string
}

export interface UseFileUploadProps {
  uploadProps?: UploadProps
  disabled?: boolean
  onSuccess?: (id: string) => void
  onRemove?: () => void
  onClick?: () => void
  initialFileId?: string | null
  mode?: 'image' | 'file'
}

export interface UseFileUploadUtils {
  thumbnail: FileThumbnail | null | undefined
  appendedUploadProps?: UploadProps
  handleClear: () => void
  handleFileUpload: (info: UploadChangeParam<UploadFile<any>>) => void
}

export function useFileUpload(props: UseFileUploadProps): UseFileUploadUtils {
  const { initialFileId, uploadProps, onRemove, onSuccess, mode } = props

  const { t } = useTranslation()

  // TODO: Move this logic to Api, this is just a temporary solution
  const basePath = process.env.REACT_APP_API_URL || getUrl()
  const apiKey = (): string => `Bearer ${sessionStorage.getItem('jwt')}`

  const [thumbnail, setThumbnail] = useState<FileThumbnail>()

  const handleUploadSuccess = useCallback(
    (file: UploadFile<any>) => {
      switch (mode) {
        case 'image':
          getBase64(file.originFileObj, imageUrl => setThumbnail({ url: imageUrl, loading: false }))
          break
        default:
          setThumbnail({ label: file.response.fileName, loading: false })
          break
      }
    },
    [mode]
  )

  const handleFileDownload = useCallback(
    async (fileId: string): Promise<any> => {
      setTimeout(() => {
        setThumbnail({ loading: true })
      }, 0)
      try {
        switch (mode) {
          case 'image': {
            const blob: Blob = await api.files.downloadFile({ id: fileId })
            getBase64(blob, imageUrl => setThumbnail({ url: imageUrl, loading: false }))
            break
          }
          default: {
            // TODO : integrate api
            const fileName = await api.files.getFileName({ id: fileId })
            setThumbnail({ label: fileName, loading: false })
            break
          }
        }
      } catch (e) {
        setThumbnail({ loading: false, error: t('error.file.download-fail') })
      }
    },
    [mode, t]
  )

  useEffect(() => {
    if (!initialFileId) {
      return
    }
    handleFileDownload(initialFileId)
    setThumbnail({ url: '' })
  }, [handleFileDownload, initialFileId])

  const handleFileUpload = useCallback(
    (info: UploadChangeParam<UploadFile<any>>): void => {
      const file = info.file
      if (file.response) {
        file.name = file.response.fileName
        file.uid = file.response.id
      }
      switch (file.status) {
        case 'uploading':
          setThumbnail({ loading: true })
          break
        case 'done':
          handleUploadSuccess(file)
          onSuccess?.(file.response.id)
          break
        case 'removed':
          setThumbnail({ loading: false, error: t('error.unknown-try-again') })
          break
        case 'error': {
          const error: RequestError = info.file.response
          displayBackendError(error, file.error.url)
          setThumbnail({ loading: false, error: t('error.unknown-try-again') })
          break
        }
      }
    },
    [handleUploadSuccess, onSuccess, t]
  )

  const handleClear = (): void => {
    setThumbnail(undefined)
    onRemove?.()
  }

  const appendedUploadProps = useMemo(
    (): UploadProps => ({
      ...uploadProps,
      action: basePath + '/api/Files',
      headers: { Authorization: apiKey() }
    }),
    [basePath, uploadProps]
  )

  return {
    thumbnail,
    appendedUploadProps,
    handleFileUpload: handleFileUpload,
    handleClear
  }
}
