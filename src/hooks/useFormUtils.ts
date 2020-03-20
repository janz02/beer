import { useState, useCallback, useRef, useEffect } from 'react'
import { Form } from 'antd'

import { FormInstance } from 'antd/lib/form'

export interface UseFormUtils {
  form: FormInstance
  submitable: boolean
  modified: boolean
  checkFieldsChange: () => void
  resetFormFlags: () => void
  setFieldsValue: (fields: any) => void
  resetFormFields: (fields?: any) => void
  getFieldValue: (field: any) => any
}

export const useFormUtils = (): UseFormUtils => {
  const [form] = Form.useForm()
  const [submitable, setSubmitable] = useState(false)
  const [modified, setModified] = useState(false)

  const checkFieldsChange = useCallback(() => {
    const hasErrors = form.getFieldsError().some(field => field.errors.length)
    setModified(true)
    if (submitable === hasErrors) {
      setSubmitable(!submitable)
    }
  }, [form, submitable])

  const resetFormFlags = useCallback(() => {
    setSubmitable(false)
    setModified(false)
  }, [])

  // TODO: revisit this problem after upgrading andt package.
  // https://github.com/ant-design/ant-design/issues/18983
  // https://github.com/ant-design/ant-design/issues/20987
  // BUG: form shouldn't trigger use effect
  const formRef = useRef(form)
  useEffect(() => {
    formRef.current = form
  }, [form])

  const setFieldsValue = useCallback((fields: any) => {
    fields ? formRef.current.setFieldsValue(fields) : formRef.current.resetFields()
  }, [])

  const getFieldValue = useCallback((name: string) => {
    return formRef.current.getFieldValue(name)
  }, [])

  const resetFormFields = useCallback((fields: any) => {
    formRef.current.resetFields(fields)
  }, [])

  return {
    form,
    submitable,
    modified,
    setFieldsValue,
    checkFieldsChange,
    resetFormFlags,
    resetFormFields,
    getFieldValue
  }
}
