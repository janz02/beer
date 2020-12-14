import { Row, Col, Button } from 'antd'
import React, { FC } from 'react'
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
  return (
    <div className={styles.buttonContainer}>
      <Row>
        {previousText ? (
          <Col>
            <Button className={styles.previousButton} htmlType="button">
              {previousText}
            </Button>
          </Col>
        ) : (
          <></>
        )}
        <Col>
          <Button name="Submit" htmlType="submit">
            {submitText}
          </Button>
        </Col>
        <Col>
          <Button type="primary" name="Next" htmlType="submit">
            {nextText}
          </Button>
        </Col>
      </Row>
    </div>
  )
}
