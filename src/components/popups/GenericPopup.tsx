import React, { FC, useState, useEffect, useRef } from 'react'
import './GenericPopup.scss'
import { Modal } from 'antd'
import { ModalProps } from 'antd/lib/modal'
import { useTranslation } from 'react-i18next'
import { NativeButtonProps } from 'antd/lib/button/button'
import {
  DeleteFilled,
  SaveFilled,
  CheckOutlined,
  CloseOutlined,
  StopOutlined,
  DisconnectOutlined
} from '@ant-design/icons'
import { useDispatch } from 'hooks/react-redux-hooks'
import { AppThunk } from 'app/store'

export type PopupType =
  | 'discard'
  | 'confirm'
  | 'save'
  | 'delete'
  | 'restore'
  | 'activate'
  | 'inactivate'
  | 'unassign'

// TODO: the async actions are not canceled, introduce sagas if needed

export type PopupState<T extends { id?: number }> = {
  data?: T
  popupVisible?: boolean
} | null

export interface GenericPopupProps extends ModalProps {
  type: PopupType

  /**
   * Id of the current item. Used for filtering out the delayed async actions of older items.
   * If you don't provide it the inbuilt okButton loading and error msg will be disabled.
   */
  id?: number

  /**
   * Put your dispatch-thunk-action here, which should return an object with
   * * error?:  i18n key | string
   * * id: item id
   */
  onOkAction?: AppThunk
}

export const GenericPopup: FC<GenericPopupProps> = props => {
  const { type, children, onOkAction, id, ...modalProps } = props
  const dispatch = useDispatch()
  const { t } = useTranslation()
  // With this we can neglect the return of old/delayed async actions of other items.
  const refId = useRef(id)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (id && id !== refId.current) {
      setLoading(false)
      refId.current = id
    }
  }, [id])

  const okButtonProps: NativeButtonProps = { loading }
  let title = ''
  let okText = ''
  switch (type) {
    case 'delete':
      okButtonProps.danger = true
      okButtonProps.icon = <DeleteFilled />
      title = t(`common.popup.delete-title`)
      okText = t(`common.delete`)
      break
    case 'discard':
      okButtonProps.danger = true
      okButtonProps.icon = <CloseOutlined />
      title = t(`common.popup.discard-title`)
      okText = t(`common.discard`)
      break
    case 'save':
      okButtonProps.icon = <SaveFilled />
      title = t(`common.popup.save-title`)
      okText = t(`common.save`)
      break
    case 'confirm':
      okButtonProps.icon = <CheckOutlined />
      title = t(`common.popup.confirm-title`)
      okText = t(`common.confirm`)
      break
    case 'restore':
      okButtonProps.icon = <CheckOutlined />
      title = t(`common.popup.restore-title`)
      okText = t(`common.restore`)
      break
    case 'activate':
      okButtonProps.icon = <CheckOutlined />
      title = t(`common.popup.activate-title`)
      okText = t(`common.activate`)
      break
    case 'inactivate':
      okButtonProps.danger = true
      okButtonProps.icon = <StopOutlined />
      title = t(`common.popup.inactivate-title`)
      okText = t(`common.inactivate`)
      break
    case 'unassign':
      okButtonProps.icon = <DisconnectOutlined />
      title = t(`common.popup.unassign-title`)
      okText = t(`common.unassign`)
      break
  }

  const handleOk = async (e: React.MouseEvent<HTMLElement>): Promise<void> => {
    if (onOkAction) {
      refId.current && setLoading(true)
      const response: any = await dispatch(onOkAction)
      if (response?.id && response.id === refId.current) {
        if (!response?.error) {
          modalProps.onCancel && modalProps.onCancel(e)
          setLoading(false)
        } else {
          setLoading(false)
        }
      }
    }
  }

  return (
    <Modal
      className="generic-popup"
      title={title}
      okText={okText}
      cancelText={t(`common.cancel`)}
      onOk={handleOk}
      {...{ okButtonProps }}
      {...modalProps}
    >
      {children}
    </Modal>
  )
}
