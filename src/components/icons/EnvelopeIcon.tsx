import React, { FC } from 'react'
import styles from './EnvelopeIcon.module.scss'
import Icon from '@ant-design/icons'
import { ReactComponent as EnvelopeOpen } from 'assets/img/ic_envelope_opened.svg'
import { ReactComponent as EnvelopeClosed } from 'assets/img/ic_envelope_closed.svg'

interface EnvelopeIconProps {
  opened?: boolean
  onClick?: any
}
export const EnvelopeIcon: FC<EnvelopeIconProps> = props => {
  const { opened, onClick, ...rest } = props

  return (
    <Icon
      onClick={onClick}
      className={styles.envelopeIcon}
      component={() => (opened ? <EnvelopeOpen /> : <EnvelopeClosed />)}
      {...rest}
    />
  )
}
