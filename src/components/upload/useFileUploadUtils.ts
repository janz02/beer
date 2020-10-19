import { useState, useEffect, useMemo, useCallback } from 'react'
import { UploadFile, UploadProps, UploadChangeParam, RcFile } from 'antd/lib/upload/interface'
import { useTranslation } from 'react-i18next'
import { api } from 'api'
import { getBase64 } from 'services/file-reader'
import { displayBackendError } from 'services/errorHelpers'
import { getUrl } from 'services/baseUrlHelper'
import { RequestError } from 'api/middleware'
import { notification } from 'antd'
import {
  FileExtension,
  FILE_TYPES,
  FrontendFileValue,
  MAX_FILE_SIZE_IN_MB
} from './fileUploadHelper'

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
  initialFileId?: string | null | undefined
  mode?: 'image' | 'file'
  allowedExtensions?: FileExtension[]
}

export interface FileUploadUtils {
  thumbnail: FileThumbnail | null | undefined
  appendedUploadProps?: UploadProps
  handleClear: (id: any) => void
  handleFileUpload: (info: UploadChangeParam<UploadFile<any>>) => void
  acceptFileExtensions?: string
  beforeUpload: (file: RcFile) => boolean
}

export function useFileUploadUtils(props: FileUploadUtilsProps): FileUploadUtils {
  const { initialFileId, uploadProps, onRemove, onSuccess, mode, allowedExtensions } = props

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
            extension: file.response.extension,
            size: file.size,
            dimensions: {
              width: +file.response?.properties?.Width || null,
              height: +file.response?.properties?.Height || null
            }
          } as FrontendFileValue)
          setFileId(file.response.id)
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

  const handleClear = async () => {
    try {
      setThumbnail(undefined)
      onRemove?.()
    } catch (error) {
      displayBackendError(error)
    }
  }

  const acceptFileExtensions = useMemo(
    () => (allowedExtensions ? allowedExtensions.join(',') : undefined),
    [allowedExtensions]
  )

  const isAllowedType = useCallback(
    (type: any): boolean => {
      const allowedMimes = allowedExtensions
        ? allowedExtensions.map(extension => FILE_TYPES.find(t => t.extension === extension))
        : []

      return !!allowedMimes?.find(el => el?.mimeType === type)
    },
    [allowedExtensions]
  )

  const beforeUpload = useCallback(
    (file: RcFile): boolean => {
      // extension check
      const isOkExtension = isAllowedType(file.type)
      if (!isOkExtension) {
        notification.error({
          message: t('error.common.incorrect-file-extension'),
          duration: null
        })
      }

      // file size check
      const isLessThanMax = file.size / 1024 / 1024 < MAX_FILE_SIZE_IN_MB
      if (!isLessThanMax) {
        notification.error({
          message: t('error.common.file-size-too-big'),
          duration: null
        })
      }
      return isOkExtension && isLessThanMax
    },
    [t, isAllowedType]
  )

  const appendedUploadProps = useMemo(
    (): UploadProps => ({
      ...uploadProps,
      action: uploadUrl,
      headers: { Authorization: apiKey },
      beforeUpload: beforeUpload,
      accept: acceptFileExtensions
    }),
    [uploadProps, apiKey, uploadUrl, beforeUpload, acceptFileExtensions]
  )

  return {
    thumbnail,
    appendedUploadProps,
    handleFileUpload: handleFileUpload,
    handleClear,
    acceptFileExtensions,
    beforeUpload
  }
}
