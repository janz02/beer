import { useCallback, useEffect, useMemo, useState } from 'react'
import { DeviceType } from './DeviceSelectorButton'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import grapesjs from 'grapesjs'
import { useDispatch, useSelector } from 'hooks/react-redux-hooks'
import { RootState } from 'app/rootReducer'
import { newsletterEditorActions } from 'features/newsletter/newsletter-editor/newsletterEditorSlice'

export interface EmailTemplatePreviewUtils {
  loading: boolean
  selectedDevice: DeviceType
  handleDeviceSelection: (device: DeviceType) => void
}

export const useEmailTemplatePreviewUtils = (height: string): EmailTemplatePreviewUtils => {
  const dispatch = useDispatch()
  const { template, currentTemplateVersionId, templatePreviewLoading } = useSelector(
    (state: RootState) => state.newsletterEditor
  )
  const [selectedDevice, setSelectedDevice] = useState(DeviceType.Desktop)

  const currentTemplateVersion = useMemo(() => {
    const version = template?.history?.find(h => h?.id === currentTemplateVersionId)
    return version
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
    if (editor) {
      editor.on('load', () => {
        editor.runCommand('preview')
      })

      editor.on('update', () => {
        editor.DomComponents.getWrapper().onAll((comp: any) => {
          comp.set({ editable: false, draggable: false })
        })
        dispatch(newsletterEditorActions.setTemplatePreviewLoading(false))
      })
    }
  }, [editor, dispatch])

  useEffect(() => {
    if (editor) {
      // grapesjs issue - when a new template is selected, retain the previously selected device
      // grapesjs editor.setDevice will die when a template is reinitialized
      // handleDeviceSelection(selectedDevice)
      editor.setComponents(currentTemplateVersion?.content ?? '')
    }
  }, [editor, selectedDevice, currentTemplateVersion, handleDeviceSelection])

  useEffect(() => {
    if (editor) {
      setSelectedDevice(DeviceType.Desktop)
    }
  }, [editor, template])

  return { loading: templatePreviewLoading, selectedDevice, handleDeviceSelection }
}
