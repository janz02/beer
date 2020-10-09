import React, { FC } from 'react'
import { Modal } from 'antd'
import styles from './BpHistoryViewer.module.scss'
import { useTranslation } from 'react-i18next'

interface BpHistoryViewerProps {
  title?: string | null
  content?: string | null
  onCancel?: () => void
}

export const BpHistoryViewer: FC<BpHistoryViewerProps> = props => {
  const { t } = useTranslation()

  return (
    <Modal
      className={styles.templateContainer}
      title={`${t('bp-history.modal.title')}: ${props.title || ''}`}
      visible={!!props.content && !!props.title}
      footer={null}
      onCancel={props.onCancel}
      centered
    >
      <div dangerouslySetInnerHTML={{ __html: props.content || '' }} />
    </Modal>
  )
}
