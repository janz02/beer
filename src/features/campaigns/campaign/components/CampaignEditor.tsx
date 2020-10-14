import React, { useEffect, FC } from 'react'
import './CampaignEditor.scss'
import { Button, Row, Col } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { NavigationAlert } from 'components/popups/NavigationAlert'
import { BackButton } from 'components/buttons/BackButton'
import { history } from 'router/router'
import { hasPermission } from 'services/jwt-reader'
import { ResponsiveHeader } from 'components/responsive/ResponsiveHeader'
import { comboRoles } from 'services/roleHelpers'
import { useDispatch } from 'react-redux'
import { CampaignUtils } from '../useCampaignUtils'
import { CampaignEditorForm } from './CampaignEditorForm'
import { Comments } from './Comments'
import { CouponState, Roles } from 'api/swagger/coupon'

export interface CampaignEditorProps {
  campaignUtils: CampaignUtils
  editing: boolean
}

export const CampaignEditor: FC<CampaignEditorProps> = props => {
  const { editing } = props
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const {
    coupon,
    displayEditor,
    modified,
    handleCouponActivate,
    setEditing,
    getCategories,
    getMajorPartners
  } = props.campaignUtils

  useEffect(() => {
    dispatch(setEditing(editing))
  }, [dispatch, setEditing, editing])

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch, getCategories])

  useEffect(() => {
    if (!hasPermission(comboRoles.forNkm)) return

    dispatch(getMajorPartners())
  }, [dispatch, getMajorPartners])

  const couponActionButtons = (
    <div className="campaign-editor-form__actions">
      {!displayEditor && (
        <>
          {coupon &&
            (coupon.state === CouponState.Created || coupon.state === CouponState.Waiting) && (
              <Button type="primary" htmlType="button">
                <Link to={`/campaign/${coupon?.id}/edit`}>{t('coupon-create.edit')}</Link>
              </Button>
            )}
          {hasPermission([
            Roles.Administrator,
            Roles.CampaignManager,
            Roles.PartnerContactEditor,
            Roles.PartnerContactApprover
          ]) &&
            coupon &&
            coupon.state === CouponState.Accepted && (
              <Button
                type="primary"
                htmlType="button"
                onClick={() => {
                  handleCouponActivate()
                }}
              >
                {coupon.isActive ? t('coupon-create.inactivate') : t('coupon-create.activate')}
              </Button>
            )}
        </>
      )}
      <BackButton onClick={() => history.push('/campaigns/')} primary={!modified} />
    </div>
  )

  return (
    <Row className="campaign-editor-form">
      <Col span={18} className="editor-col">
        <ResponsiveHeader
          type="floating"
          title={t('coupon-create.editor-title')}
          options={couponActionButtons}
        />

        <NavigationAlert when={modified} />
        <CampaignEditorForm campaignUtils={props.campaignUtils} />
      </Col>

      <Col span={6} className="comment-col">
        <Comments campaignUtils={props.campaignUtils} />
      </Col>
    </Row>
  )
}
