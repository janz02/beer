import React, { FC, useState, useEffect, useRef } from 'react'
import './GenericPopup.scss'
import { Modal } from 'antd'
import { ModalProps } from 'antd/lib/modal'
import { useTranslation } from 'react-i18next'
import { NativeButtonProps } from 'antd/lib/button/button'
import { DeleteFilled, SaveFilled, CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { AppThunk } from 'app/store'

type PopupType = 'discard' | 'confirm' | 'save' | 'delete'

// TODO: the async actions are not canceled, introduce sagas if needed

interface GenericPopupProps extends ModalProps {
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

  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState(false)

  // With this we can neglect the return of old/delayed async actions of other items.
  const refId = useRef(id)
  useEffect(() => {
    if (id && id !== refId.current) {
      setError('')
      setLoading(false)
      refId.current = id
    }
  }, [id])

  const okButtonProps: NativeButtonProps = { loading }
  if (type === 'delete') {
    okButtonProps.danger = true
    okButtonProps.icon = <DeleteFilled />
  } else if (type === 'discard') {
    okButtonProps.danger = true
    okButtonProps.icon = <CloseOutlined />
  } else if (type === 'save') {
    okButtonProps.icon = <SaveFilled />
  } else if (type === 'confirm') {
    okButtonProps.icon = <CheckOutlined />
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
          setError(response?.error)
          setLoading(false)
        }
      }
    }
  }

  return (
    <Modal
      className="generic-popup"
      title={t(`common.popup.${type}-title`)}
      okText={t(`common.${type}`)}
      cancelText={t(`common.cancel`)}
      onOk={handleOk}
      {...{ okButtonProps }}
      {...modalProps}
    >
      {children ?? t(`common.popup.${type}-text`)}
      {error && <div className="generic-popup__error"> {t(error)} </div>}
    </Modal>
  )
}
