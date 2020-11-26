import { useEffect, useMemo, useState } from 'react'
import { DeviceType } from './DeviceSelectorButton'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import grapesjs from 'grapesjs'
import { useSelector } from 'hooks/react-redux-hooks'
import { RootState } from 'app/rootReducer'

export interface EmailTemplatePreviewUtils {
  handleDeviceSelection: (device: DeviceType) => void
  visible: boolean
  selected: DeviceType
}

export const useEmailTemplatePreviewUtils = (height: string): EmailTemplatePreviewUtils => {
  const { template } = useSelector((state: RootState) => state.newsletterEditor)
  const [visible, setVisible] = useState<boolean>(false)
  const [selected, setSelected] = useState(DeviceType.Desktop)

  const editor = useMemo(() => {
    if (!template) return
    return grapesjs.init({
      container: '#email-preview',
      height: height,
      showToolbar: 0
    })
  }, [template, height])

  const handleDeviceSelection = (device: DeviceType): void => {
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
      editor.runCommand('preview')

      setSelected(device)
    }
  }

  useEffect(() => {
    if (!editor) return
    editor.on('load', () => {
      editor.runCommand('preview')
      editor.setDevice(selected)
    })
    editor.on('update', (event: any) => {
      editor.setDevice(selected)
      setVisible(false)
    })
    editor.on('run:preview', () => {
      setVisible(true)
      editor.DomComponents.getWrapper().onAll(
        (comp: { is: (arg0: string) => any; set: (arg0: { editable: boolean }) => any }) =>
          comp.is('text') && comp.set({ editable: false })
      )
    })
  }, [editor, selected])

  return { visible, selected, handleDeviceSelection }
}
