import { useState, useCallback, useRef, useEffect } from 'react'
import { Form } from 'antd'

import { FormInstance } from 'antd/lib/form'

export interface FormUtils<T = any> {
  form: FormInstance
  submitable: boolean
  modified: boolean
  checkFieldsChange: () => void
  resetFormFlags: () => void
  setFieldsValue: (fields: T) => void
  resetFormFields: (fields?: any) => void
  getFieldValue: (field: any) => any
}

/**
 * Utility hook for forms with a Save button
 */
export function useFormUtils<T = any>(): FormUtils<T> {
  const [form] = Form.useForm()
  const [submitable, setSubmitable] = useState(false)
  const [modified, setModified] = useState(false)

  /**
   * This function needs to be called when a field on the form changes.
   * If there are no validation errors, the form will be submittable. But the form also won't be
   * submittable if the user hasn't changed anything yet.
   */
  const checkFieldsChange = useCallback(() => {
    const hasErrors = form.getFieldsError().some(field => field.errors.length)
    setModified(true)
    if (submitable === hasErrors) {
      setSubmitable(!submitable)
    }
  }, [form, submitable])

  /**
   * Resets the form, so it won't be submittable until the user changes something again on the form.
   */
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

  const setFieldsValue = useCallback((fields: T) => {
    fields ? formRef.current.setFieldsValue(fields) : formRef.current.resetFields()
  }, [])

  const getFieldValue = useCallback((name: string | keyof T) => {
    return formRef.current.getFieldValue(name as string)
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
