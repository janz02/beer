import React, { FC, useState } from 'react'
import { Modal } from 'antd'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { deleteSite } from '../siteSlice'
import { Site } from 'models/site'

interface SiteDeletePopupProps {
  visible: boolean
  site: Site | undefined
  onExit: () => void
  afterClose: () => void
}

export const SiteDeletePopup: FC<SiteDeletePopupProps> = props => {
  const { visible, site, onExit, afterClose } = props
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [error, setError] = useState('')

  const onDelete = async (): Promise<void> => {
    if (site?.id) {
      const response = await dispatch(deleteSite(site.id))
      if (!response) {
        onExit()
      } else {
        setError(response as any)
      }
    }
  }

  return (
    <Modal
      visible={visible}
      title={t(`site.delete-popup.title`)}
      onOk={onDelete}
      onCancel={onExit}
      okText={t('common.delete')}
      afterClose={() => {
        afterClose()
        setError('')
      }}
    >
      <p>{t(`site.delete-popup.text`)}</p>
      <h4>{site?.name}</h4>
      <div>{error}</div>
    </Modal>
  )
}
