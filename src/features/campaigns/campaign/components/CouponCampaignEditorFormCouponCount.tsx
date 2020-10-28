import React, { FC } from 'react'
import { Form, Button, Row, Col } from 'antd'
import { useTranslation } from 'react-i18next'
import { ExportOutlined } from '@ant-design/icons'
import { FileUploadButton } from 'components/upload/FileUploadButton'
import { separatorFormatter, separatorParser } from 'services/numberInputHelpers'
import { couponCampaignActions } from '../../couponCampaignsSlice'
import { useDispatch } from 'react-redux'
import { CouponCampaignUtils } from '../useCouponCampaignUtils'
import { useCommonFormRules } from 'hooks'
import { FormInstance } from 'antd/lib/form'
import { InputNumberI18n } from 'components/InputNumberI18n'
import { FileExtension } from 'components/upload/fileUploadHelper'

interface CouponCampaignEditorFormCouponCountProps {
  campaignUtils: CouponCampaignUtils
  form: FormInstance
}

export const CouponCampaignEditorFormCouponCount: FC<CouponCampaignEditorFormCouponCountProps> = props => {
  const { form } = props
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const rule = useCommonFormRules()
  const { loading, coupon, displayEditor, rowGutter, prizeOrDiscount } = props.campaignUtils

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
          <InputNumberI18n
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
            name="predefinedCodesFile"
            label={t('coupon-create.field.upload')}
            extra={t('coupon-create.field.upload-help')}
          >
            <FileUploadButton
              disabled={!displayEditor}
              onSuccess={fileDetail => {
                form.setFieldsValue({
                  ...form.getFieldsValue(),
                  predefinedCodesFile: fileDetail
                })

                form.validateFields(['predefinedCodesFile'])
              }}
              onRemove={() => {
                form.setFieldsValue({
                  ...form.getFieldsValue(),
                  predefinedCodesFile: undefined
                })

                form.validateFields(['predefinedCodesFile'])
              }}
              onClick={() => dispatch(couponCampaignActions.downloadPredefinedCodesFile(coupon!))}
              initialFileId={coupon?.predefinedCodesFile?.id}
              allowedExtensions={[FileExtension.CSV, FileExtension.TXT]}
            />
          </Form.Item>
        </Col>
      )}

      {!!coupon?.id && prizeOrDiscount && (
        <Col span={8}>
          <Form.Item name="download" label={t('coupon-create.field.download')}>
            <Button
              type="primary"
              loading={loading}
              icon={<ExportOutlined />}
              onClick={() => {
                dispatch(couponCampaignActions.downloadCoupons(coupon!))
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
