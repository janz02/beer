import { useCallback, useEffect, useMemo, useState } from 'react'
import { DeviceType } from './DeviceSelectorButton'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import grapesjs from 'grapesjs'
import { useSelector } from 'hooks/react-redux-hooks'
import { RootState } from 'app/rootReducer'

export interface EmailTemplatePreviewUtils {
  handleDeviceSelection: (device: DeviceType) => void
  loading: boolean
  selectedDevice: DeviceType
}

export const useEmailTemplatePreviewUtils = (height: string): EmailTemplatePreviewUtils => {
  const { template, currentTemplateVersionId } = useSelector(
    (state: RootState) => state.newsletterEditor
  )
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedDevice, setSelectedDevice] = useState(DeviceType.Desktop)

  const currentTemplateVersion = useMemo(() => {
    const version = template?.history?.find(h => h?.id === currentTemplateVersionId)
    return version
  }, [currentTemplateVersionId, template])

  const isLatestTemplate = useMemo(() => {
    const newestTemplateVersionId = template?.history?.[0]?.id
    return newestTemplateVersionId === currentTemplateVersionId
  }, [currentTemplateVersionId, template])

  const editor = useMemo(() => {
    if (!template) return
    return grapesjs.init({
      container: '#email-preview',
      height: height,
      showToolbar: 0
    })
  }, [template, height])

  const handleDeviceSelection = useCallback(
    (device: DeviceType): void => {
      if (device !== selectedDevice) {
        setSelectedDevice(device)
      }

      let deviceType
      switch (device) {
        case DeviceType.Mobile:
          deviceType = 'Mobile portrait'
          break
        case DeviceType.Tablet:
          deviceType = 'Tablet'
          break
        case DeviceType.Desktop:
        default:
          deviceType = 'Desktop'
          break
      }

      if (editor) {
        editor.setDevice(deviceType)
      }
    },
    [editor, selectedDevice]
  )

  useEffect(() => {
    if (!editor) return

    handleDeviceSelection(selectedDevice)

    editor.on('load:before', () => {
      setLoading(true)
    })
    editor.on('load', () => {
      editor.runCommand('preview')
    })
    editor.on('run:preview', () => {
      setLoading(false)
      editor.DomComponents.getWrapper().onAll((comp: any) => {
        comp.set({ editable: false })
      })
    })

    editor.setComponents(currentTemplateVersion?.content ?? '')
  }, [
    editor,
    selectedDevice,
    currentTemplateVersion,
    isLatestTemplate,
    template,
    currentTemplateVersionId,
    handleDeviceSelection
  ])

  return { loading, selectedDevice, handleDeviceSelection }
}
