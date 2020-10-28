import React, { FC, useEffect } from 'react'
import './CouponCampaignEditor.scss'
import { Form, Button, Row, Col, Collapse } from 'antd'
import { useTranslation } from 'react-i18next'
import { CouponState } from 'api/swagger/coupon'
import { history } from 'router/router'
import { CouponCampaignUtils } from '../useCouponCampaignUtils'
import { CouponCampaignEditorFormBasics } from './CouponCampaignEditorFormBasics'
import { CouponCampaignEditorFormDetails } from './CouponCampaignEditorFormDetails'
import { CouponCampaignEditorFormCouponCount } from './CouponCampaignEditorFormCouponCount'
import { CouponCampaignEditorFormClientActivities } from './CouponCampaignEditorFormClientActivities'
import { CouponCampaignEditorFormAudit } from './CouponCampaignEditorFormAudit'
import { useDispatch } from 'react-redux'

interface CouponCampaignEditorFormProps {
  campaignUtils: CouponCampaignUtils
}

export const CouponCampaignEditorForm: FC<CouponCampaignEditorFormProps> = props => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const {
    loading,
    couponIsNew,
    coupon,
    displayEditor,
    form,
    formProps,
    submitable,
    handleCouponChange,
    setStateForCreate
  } = props.campaignUtils

  useEffect(() => {
    handleCouponChange()
  }, [handleCouponChange, coupon])

  return (
    <Form name="coupon-editor-form" layout="vertical" form={form} {...formProps}>
      <Collapse defaultActiveKey={['1']}>
        <Collapse.Panel header={t('coupon-create.campaign-basics')} key="1">
          <CouponCampaignEditorFormBasics campaignUtils={props.campaignUtils} />
        </Collapse.Panel>
      </Collapse>

      <Collapse defaultActiveKey={['1']}>
        <Collapse.Panel header={t('coupon-create.campaign-details')} key="1">
          <CouponCampaignEditorFormDetails form={form} campaignUtils={props.campaignUtils} />
        </Collapse.Panel>
      </Collapse>

      <Collapse defaultActiveKey={['1']}>
        <Collapse.Panel header={t('coupon-create.field.coupon-count')} key="1">
          <CouponCampaignEditorFormCouponCount form={form} campaignUtils={props.campaignUtils} />
        </Collapse.Panel>
      </Collapse>

      {!displayEditor && (
        <Collapse defaultActiveKey={['1']}>
          <Collapse.Panel header={t('coupon-create.client-activities')} key="1">
            <CouponCampaignEditorFormClientActivities campaignUtils={props.campaignUtils} />
          </Collapse.Panel>
        </Collapse>
      )}

      {!displayEditor && (
        <Collapse defaultActiveKey={['1']}>
          <Collapse.Panel header={t('coupon-create.audit')} key="1">
            <CouponCampaignEditorFormAudit campaignUtils={props.campaignUtils} />
          </Collapse.Panel>
        </Collapse>
      )}

      {displayEditor && (
        <Row justify="space-between">
          <Col span={12}>
            <Button
              type="ghost"
              htmlType="submit"
              onClick={() => history.push('/campaigns/')}
              disabled={!submitable}
            >
              {t('common.cancel')}
            </Button>
          </Col>

          <Col span={12} className="actions-right">
            {couponIsNew && (
              <Button
                type="ghost"
                htmlType="submit"
                onClick={() => dispatch(setStateForCreate(CouponState.Waiting))}
                disabled={!submitable}
                loading={loading}
              >
                {t('coupon-create.create-and-accept')}
              </Button>
            )}

            <Button
              type="primary"
              htmlType="submit"
              onClick={() => dispatch(setStateForCreate(CouponState.Created))}
              disabled={!submitable}
              loading={loading}
            >
              {couponIsNew ? t('coupon-create.create') : t('common.save')}
            </Button>
          </Col>
        </Row>
      )}
    </Form>
  )
}
