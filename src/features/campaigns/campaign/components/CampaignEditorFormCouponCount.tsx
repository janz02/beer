import React, { FC } from 'react'
import { Form, Button, Row, Col, InputNumber } from 'antd'
import { useTranslation } from 'react-i18next'
import { ExportOutlined } from '@ant-design/icons'
import { FileUploadButton } from 'components/upload/FileUploadButton'
import { separatorFormatter, separatorParser } from 'services/numberInputHelpers'
import { campaignActions } from '../../campaignsSlice'
import { useDispatch } from 'react-redux'
import { useCampaign } from '../useCampaign'
import { useCommonFormRules } from 'hooks'
import { FormInstance } from 'antd/lib/form'

interface CampaignEditorFormCouponCountProps {
  form: FormInstance
}

export const CampaignEditorFormCouponCount: FC<CampaignEditorFormCouponCountProps> = props => {
  const { form } = props
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const rule = useCommonFormRules()
  const { loading, coupon, displayEditor, rowGutter, prizeOrDiscount } = useCampaign()

  return (
    <Row gutter={rowGutter}>
      <Col span={8}>
        <Form.Item
          name="couponCount"
          label={t('coupon-create.field.coupon-count')}
          extra={t('coupon-create.field.coupon-count-help')}
          rules={[
            rule.required(t('error.validation.coupon.count-required')),
            rule.positiveInteger()
          ]}
        >
          <InputNumber
            disabled={!displayEditor}
            formatter={separatorFormatter}
            parser={separatorParser}
            min={1}
            max={100000000}
          />
        </Form.Item>
      </Col>
      {prizeOrDiscount && (
        <Col span={8}>
          <Form.Item
            name="predefinedCodesFileId"
            label={t('coupon-create.field.upload')}
            extra={t('coupon-create.field.upload-help')}
          >
            <FileUploadButton
              disabled={!displayEditor}
              onSuccess={fileId => {
                form.setFieldsValue({
                  ...form.getFieldsValue(),
                  predefinedCodesFileId: fileId
                })

                form.validateFields()
              }}
              onRemove={() => {
                form.setFieldsValue({
                  ...form.getFieldsValue(),
                  predefinedCodesFileId: undefined
                })

                form.validateFields()
              }}
              onClick={() => dispatch(campaignActions.downloadPredefinedCodesFile(coupon!))}
              initialFileId={coupon?.predefinedCodesFileId}
            />
          </Form.Item>
        </Col>
      )}

      {!!coupon?.id && prizeOrDiscount && (
        <Col span={8}>
          <Form.Item
            name="download"
            label={t('coupon-create.field.download')}
            extra={t('coupon-create.field.download-help')}
          >
            <Button
              type="primary"
              loading={loading}
              icon={<ExportOutlined />}
              onClick={() => {
                dispatch(campaignActions.downloadCoupons(coupon!))
              }}
            >
              {t('coupon-create.download-coupons')}
            </Button>
          </Form.Item>
        </Col>
      )}
    </Row>
  )
}
