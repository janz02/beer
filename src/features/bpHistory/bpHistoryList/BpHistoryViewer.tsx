import React, { FC } from 'react'
import { Modal } from 'antd'
import styles from './BpHistoryViewer.module.scss'

interface BpHistoryViewerProps {
  content?: string | null
  onCancel: () => void
}

export const BpHistoryViewer: FC<BpHistoryViewerProps> = props => {
  return (
    <Modal
      className={styles.templateContainer}
      visible={!!props.content}
      footer={null}
      onCancel={props.onCancel}
      centered
    >
      <div dangerouslySetInnerHTML={{ __html: props.content || '' }} />
    </Modal>
  )
}
