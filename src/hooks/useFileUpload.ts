import { useState, useEffect, useMemo } from 'react'
import { UploadFile, UploadProps, UploadChangeParam } from 'antd/lib/upload/interface'

function getUrl(): string {
  const getUrl = window.location
  return getUrl.protocol + '//' + getUrl.host
}

export interface UseFileUploadProps {
  uploadProps?: UploadProps
  onSuccess?: (id: string) => void
  onRemove?: () => void
  fileId?: string
}
export interface UseFileUploadUtils {
  appendedUploadProps?: UploadProps
  onChangeKeepOnlyLastFile: (info: UploadChangeParam<UploadFile<any>>) => void
  onRemoveAll: () => void
}

export function useFileUpload(props: UseFileUploadProps): UseFileUploadUtils {
  const { fileId, uploadProps, onRemove, onSuccess } = props

  // TODO: Move this logic to Api, this is just a temporary solution
  const basePath = process.env.REACT_APP_API_URL || getUrl()
  const apiKey = (): string => `Bearer ${sessionStorage.getItem('jwt')}`

  const [fileList, setFileList] = useState<UploadFile<any>[]>([])

  const appendedUploadProps = useMemo(
    () => ({
      ...uploadProps,
      action: basePath + '/api/Files',
      headers: { Authorization: apiKey() },
      fileList
    }),
    [basePath, fileList, uploadProps]
  )

  useEffect(() => {
    setFileList(
      fileId
        ? [
            {
              name: fileId,
              uid: fileId,
              size: 0,
              type: ''
            }
          ]
        : []
    )
  }, [fileId])

  const onChangeKeepOnlyLastFile = (info: UploadChangeParam<UploadFile<any>>): void => {
    let componentFileList = [...info.fileList]

    // Only to show the most recent uploaded file, and old one will be replaced by the new
    componentFileList = componentFileList.slice(-1)

    componentFileList = componentFileList.map(file => {
      if (file.response) {
        file.name = file.response.id
      }
      if (file.status === 'done') {
        onSuccess?.(file.response.id)
      }
      return file
    })
    setFileList(componentFileList)
  }

  const onRemoveAll = (): void => {
    setFileList([])
    onRemove?.()
  }

  return {
    appendedUploadProps,
    onChangeKeepOnlyLastFile,
    onRemoveAll
  }
}
