import { useState, useEffect, useMemo, useCallback } from 'react'
import { UploadFile, UploadProps, UploadChangeParam } from 'antd/lib/upload/interface'
import { useTranslation } from 'react-i18next'
import { api } from 'api'
import { getBase64 } from 'services/file-reader'
import { displayBackendError } from 'services/errorHelpers'
import { getUrl } from 'services/baseUrlHelper'
import { RequestError } from 'api/middleware'

export interface PictureDimensions {
  width: number
  height: number
}

interface FileThumbnail {
  label?: string | undefined | null
  url?: string
  loading?: boolean
  error?: string
}

export interface FileUploadUtilsProps {
  uploadProps?: UploadProps
  disabled?: boolean
  onSuccess?: (fileDetail: any) => void
  onRemove?: () => void
  onClick?: () => void
  onError?: (error: string) => void
  initialFileId?: string | null | undefined
  mode?: 'image' | 'file'
  allowedFileSize?: number
  allowedExtensions?: string
  allowedImgDimensions?: PictureDimensions
}

export interface FileUploadUtils {
  thumbnail: FileThumbnail | null | undefined
  appendedUploadProps?: UploadProps
  handleClear: (id: any) => void
  handleFileUpload: (info: UploadChangeParam<UploadFile<any>>) => void
  acceptFileExtensions?: string
}

export function useFileUploadUtils(props: FileUploadUtilsProps): FileUploadUtils {
  const {
    initialFileId,
    uploadProps,
    onRemove,
    onSuccess,
    mode,
    allowedExtensions,
    allowedImgDimensions,
    allowedFileSize,
    onError
  } = props

  const [fileId, setFileId] = useState<any>()

  useEffect(() => {
    if (!fileId) {
      setFileId(initialFileId)
    }
  }, [initialFileId, fileId])

  const { t } = useTranslation()

  // TODO: Move this logic to Api, this is just a temporary solution
  const uploadUrl = `${getUrl(process.env.REACT_APP_FILES_API_URL)}/api/Files`
  const apiKey = `Bearer ${sessionStorage.getItem('jwt')}`

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
            const blob: Blob = await api.files.files.downloadFile({ id: fileId })
            getBase64(blob, imageUrl => setThumbnail({ url: imageUrl, loading: false }))
            break
          }
          default: {
            const fileInfo = await api.files.files.infoFile({ id: fileId })
            setThumbnail({ label: fileInfo.fileName, loading: false })
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
    if (!fileId) {
      return
    }
    handleFileDownload(fileId)
    setThumbnail({ url: '' })
  }, [handleFileDownload, fileId])

  const validateImgDimensions = useCallback(
    originImgBlob => {
      if (mode === 'image') {
        const img: HTMLImageElement = new Image()
        const objectUrl = URL.createObjectURL(originImgBlob)
        img.onload = () => {
          if (
            img.width !== allowedImgDimensions?.width ||
            img.height !== allowedImgDimensions.height
          ) {
            onError?.('dimension')
          }
        }
        img.src = objectUrl
      }
    },
    [allowedImgDimensions, mode, onError]
  )

  const validateFileSize = useCallback(
    size => {
      if ((!allowedFileSize && size > 50) || (allowedFileSize && size > allowedFileSize)) {
        onError?.('size')
      }
    },
    [onError, allowedFileSize]
  )

  const validateFileExtension = useCallback(
    extension => {
      console.log(extension, allowedExtensions)
      if (!allowedExtensions?.includes(extension)) {
        onError?.('extension')
      }
    },
    [onError, allowedExtensions]
  )

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
          onSuccess?.({
            id: file.response.id,
            extension: file.response.exstension,
            size: file.size,
            objectUrl: URL.createObjectURL(file.originFileObj)
          })
          setFileId(file.response.id)

          // validation triggers
          // validateImgDimensions(file.originFileObj)
          // validateFileSize(file.size)
          // validateFileExtension(file.response.extension)
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
    [
      handleUploadSuccess,
      onSuccess,
      t
      // validateImgDimensions,
      // validateFileSize,
      // validateFileExtension
    ]
  )

  const handleClear = async () => {
    try {
      setThumbnail(undefined)
      onRemove?.()
    } catch (error) {
      displayBackendError(error)
    }
  }

  const appendedUploadProps = useMemo(
    (): UploadProps => ({
      ...uploadProps,
      action: uploadUrl,
      headers: { Authorization: apiKey }
    }),
    [uploadProps, apiKey, uploadUrl]
  )

  const acceptFileExtensions = useMemo(() => {
    if (allowedExtensions) return allowedExtensions

    switch (mode) {
      case 'image':
        return '.jpg,.png'
      case 'file':
        return '.csv,.pdf,.txt'
      default:
    }
  }, [allowedExtensions, mode])

  return {
    thumbnail,
    appendedUploadProps,
    handleFileUpload: handleFileUpload,
    handleClear,
    acceptFileExtensions
  }
}
