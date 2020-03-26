import { useState, useEffect, useMemo, useCallback } from 'react'
import { UploadFile, UploadProps, UploadChangeParam, RcFile } from 'antd/lib/upload/interface'
import { useTranslation } from 'react-i18next'

function getUrl(): string {
  const getUrl = window.location
  return getUrl.protocol + '//' + getUrl.host
}

interface PictureThumbnail {
  url?: string
  loading?: boolean
  error?: string
}

export interface UsePictureUploadProps {
  uploadProps?: UploadProps
  onSuccess?: (id: string) => void
  onRemove?: () => void
  initialFileId?: string | null
}

export interface UsePictureUploadUtils {
  thumbnail: PictureThumbnail | null | undefined
  appendedUploadProps?: UploadProps
  handleClear: () => void
  handlePictureUpload: (info: UploadChangeParam<UploadFile<any>>) => void
}

export function getBase64(img: any, callback: (url: any) => any): any {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

export function usePictureUpload(props: UsePictureUploadProps): UsePictureUploadUtils {
  const { initialFileId, uploadProps, onRemove, onSuccess } = props

  const { t } = useTranslation()

  // TODO: Move this logic to Api, this is just a temporary solution
  const basePath = process.env.REACT_APP_API_URL || getUrl()
  const apiKey = (): string => `Bearer ${sessionStorage.getItem('jwt')}`

  const [file, setFile] = useState<UploadFile<any>>()
  const [thumbnail, setThumbnail] = useState<PictureThumbnail>()

  const handlePictureDownload = useCallback((fileId: string): any => {}, [])

  useEffect(() => {
    if (!initialFileId) {
      setFile(undefined)
      return
    }

    // TODO
    const data = handlePictureDownload(initialFileId)

    setFile({
      name: initialFileId,
      uid: initialFileId,
      size: 0,
      type: ''
    })
    setThumbnail({ url: '' })
  }, [handlePictureDownload, initialFileId])

  const beforeUpload = useCallback((file: RcFile, FileList: RcFile[]):
    | boolean
    | PromiseLike<void> => {
    return true
  }, [])

  const handlePictureUpload = useCallback(
    (info: UploadChangeParam<UploadFile<any>>): void => {
      const file = info.file
      if (file.response) {
        file.name = file.response.id
      }
      switch (file.status) {
        case 'uploading':
          setThumbnail({ loading: true })
          break
        case 'done':
          getBase64(file.originFileObj, imageUrl => setThumbnail({ url: imageUrl, loading: false }))
          onSuccess?.(file.response.id)
          break
        case 'removed':
        case 'error':
          setThumbnail({ loading: false, error: t('error.unknown-try-again') })
          break
      }
      setFile(file)
    },
    [onSuccess, t]
  )

  const handleClear = (): void => {
    setFile(undefined)
    setThumbnail(undefined)
    onRemove?.()
  }

  const appendedUploadProps = useMemo(
    (): UploadProps => ({
      ...uploadProps,
      action: basePath + '/api/Files',
      headers: { Authorization: apiKey() },
      beforeUpload
    }),
    [basePath, beforeUpload, uploadProps]
  )

  return {
    thumbnail,
    appendedUploadProps,
    handlePictureUpload,
    handleClear
  }
}
