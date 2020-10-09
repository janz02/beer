import React, { FC, PropsWithChildren, useEffect } from 'react'
import { Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import { useCommonFormRules } from 'hooks'
import { GenericModalFormEditorParams } from 'hooks/useGenericModalEditorUtils'
import { GenericModalForm } from 'components/popups/GenericModalForm'
import { useSystemParamsEditorUtils } from './useSystemParamsEditorUtils'

interface SystemParamsEditorProps extends PropsWithChildren<any> {
  isReadonly: boolean
  params: GenericModalFormEditorParams
  handleExit: () => void
  afterClose: () => void
}

export const SystemParamsEditor: FC<SystemParamsEditorProps> = props => {
  const { params, handleExit, isReadonly } = props
  const { visible } = params

  const { t } = useTranslation()
  const rule = useCommonFormRules()

  const {
    initialValues,
    loading,
    getSystemParamById,
    handleSave,
    afterCloseExtended
  } = useSystemParamsEditorUtils(props)

  useEffect(() => {
    getSystemParamById()
  }, [getSystemParamById])

  return (
    <GenericModalForm
      loadingAction={loading}
      loadingContent={loading}
      modalProps={{
        visible: visible,
        title: t('system-params.editor.title'),
        okText: t('common.save'),
        afterClose: afterCloseExtended,
        onCancel: handleExit
      }}
      formProps={{
        name: 'system-params-editor',
        onFinish: handleSave
      }}
      initialValues={initialValues}
      hideFooter={isReadonly}
    >
      <Form.Item label={t('system-params.field.name')} name="name">
        <Input disabled className="readonly-form-item" />
      </Form.Item>

      <Form.Item label={t('system-params.field.description')} name="description">
        <Input.TextArea disabled className="readonly-form-item" />
      </Form.Item>

      <Form.Item
        label={t('system-params.field.value')}
        name="value"
        rules={
          !isReadonly
            ? [
                rule.requiredString(t('error.common.field-required')),
                rule.max(500, t('error.common.max-length-exact', { max: 500 }))
              ]
            : []
        }
      >
        <Input
          maxLength={500}
          disabled={isReadonly}
          className={isReadonly ? 'readonly-form-item' : ''}
        />
      </Form.Item>
    </GenericModalForm>
  )
}
