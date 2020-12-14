import { Button } from 'antd'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './CampaignEditorFormFooter.module.scss'

export interface CampaignEditorFormFooterProps {
  submitText: string
  nextText: string
  previousText?: string
}

export const CampaignEditorFormFooter: FC<CampaignEditorFormFooterProps> = ({
  submitText,
  nextText,
  previousText
}) => {
  const { t } = useTranslation()

  return (
    <div className={styles.buttonContainer}>
      <Button className={styles.cancelButton} type="link" htmlType="button">
        {t('campaign-create.cancel-changes')}
      </Button>
      {previousText ? (
        <Button className={styles.previousButton} htmlType="button">
          {previousText}
        </Button>
      ) : (
        <></>
      )}
      <Button name="Submit" htmlType="submit">
        {submitText}
      </Button>
      <Button type="primary" name="Next" htmlType="submit">
        {nextText}
      </Button>
    </div>
  )
}
