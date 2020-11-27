import React, { FC, useEffect } from 'react'
import './CouponCampaignEditor.scss'
import { Form, Button, Popconfirm, Timeline, Select } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { useTranslation } from 'react-i18next'
import { CouponState } from 'api/swagger/coupon'
import { DeleteFilled, CheckOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import Title from 'antd/lib/typography/Title'
import { MomentDisplay } from 'components/MomentDisplay'
import { useCommonFormRules } from 'hooks'
import { CouponCampaignUtils } from '../../couponCampaignEditor/useCouponCampaignUtils'

interface CommentsProps {
  campaignUtils: CouponCampaignUtils
}

export const Comments: FC<CommentsProps> = ({ campaignUtils }) => {
  const { t } = useTranslation()
  const rule = useCommonFormRules()
  const {
    coupon,
    displayEditor,
    commentFormProps,
    submitableComment,
    prepareCommentFormFields,
    handleDeleteCouponCommment
  } = campaignUtils

  useEffect(() => {
    prepareCommentFormFields()
  }, [prepareCommentFormFields, coupon])

  const couponStatusDropdown = (): JSX.Element => {
    switch (coupon?.state) {
      case CouponState.Created:
        return (
          <Select>
            <Select.Option key={CouponState.Waiting} value={CouponState.Waiting}>
              {t('coupon.state.action.wait')}
            </Select.Option>
          </Select>
        )
      case CouponState.Waiting:
        return (
          <Select>
            <Select.Option key={CouponState.Accepted} value={CouponState.Accepted}>
              {t('coupon.state.action.accept')}
            </Select.Option>
          </Select>
        )
      case CouponState.Accepted:
        return (
          <Select>
            <Select.Option key={CouponState.Closed} value={CouponState.Closed}>
              {t('coupon.state.action.close')}
            </Select.Option>
          </Select>
        )
      case CouponState.Closed:
        return (
          <Select>
            <Select.Option key={CouponState.Archived} value={CouponState.Archived}>
              {t('coupon.state.action.archive')}
            </Select.Option>
          </Select>
        )
      default:
        return <Select />
    }
  }

  return (
    <>
      {!displayEditor && (
        <ResponsiveCard innerTitle={t('coupon-campaign-create.status-title')} paddedBottom>
          <Form name="coupon-campaign-editor-comment-form" layout="vertical" {...commentFormProps}>
            <Form.Item
              name="couponState"
              dependencies={['comment']}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_rule, value) {
                    const comment = getFieldValue('comment')
                    if (!comment && !value) {
                      return Promise.reject(t('error.comment.comment-or-state-required'))
                    }

                    return Promise.resolve()
                  }
                })
              ]}
            >
              {couponStatusDropdown()}
            </Form.Item>

            {coupon &&
              (coupon.state === CouponState.Created || coupon.state === CouponState.Waiting) && (
                <Form.Item
                  name="comment"
                  label={t('coupon-campaign-create.field.comment')}
                  dependencies={['couponState']}
                  rules={[
                    rule.max(200, t('error.validation.coupon.comment.max-length-200')),
                    ({ getFieldValue }) => ({
                      validator(_rule, value) {
                        const couponState = getFieldValue('couponState')
                        if (!couponState && !value) {
                          return Promise.reject(t('error.comment.comment-or-state-required'))
                        }

                        return Promise.resolve()
                      }
                    })
                  ]}
                >
                  <TextArea rows={3} maxLength={200} />
                </Form.Item>
              )}

            <Form.Item className="actions">
              <Button type="primary" htmlType="submit" disabled={!submitableComment}>
                {t('common.save')}
              </Button>
            </Form.Item>
          </Form>
        </ResponsiveCard>
      )}

      <div className="comment-col__comments">
        <Title level={3}>{t('coupon-campaign-editor.timeline-title')}</Title>
        <Timeline>
          {coupon &&
            coupon.comments &&
            coupon.comments.map(x => (
              <Timeline.Item
                key={x.id}
                color="#08979C"
                dot={
                  <div className="time-line-dot-check">
                    <CheckOutlined />
                  </div>
                }
              >
                <div className="timeline-item__title">
                  <MomentDisplay date={x.dateTime} /> &nbsp;
                  {(x.stateFrom || x.stateTo) && (
                    <strong>
                      {x.stateFrom && t(`coupon.state.${x.stateFrom.toLowerCase()}`)}
                      <ArrowRightOutlined />
                      {x.stateTo && t(`coupon.state.${x.stateTo.toLowerCase()}`)}
                    </strong>
                  )}
                </div>
                <div className="timeline-item__body text-faded">
                  {x.comment} - {x.from}
                  <Popconfirm
                    title={t('coupon-campaign-editor.comment-delete-confirm-message')}
                    onConfirm={() => {
                      handleDeleteCouponCommment(coupon, x)
                    }}
                    okText={t('common.ok')}
                    cancelText={t('common.cancel')}
                  >
                    <Button size="small" type="link">
                      <DeleteFilled />
                    </Button>
                  </Popconfirm>
                </div>
              </Timeline.Item>
            ))}
        </Timeline>
      </div>
    </>
  )
}