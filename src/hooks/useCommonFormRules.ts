import { Rule } from 'rc-field-form/lib/interface'
import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useCommonFormRules() {
  const { t } = useTranslation()

  /**
   * no white space
   * @param message (optional) i18n key
   * @param other (optional) extra rule parameters
   */
  const required = useCallback(
    (message?: string, other?: Rule): Rule => ({
      ...other,
      required: true,
      whitespace: true,
      message: t(message ?? 'common.rule-error.field-required')
    }),
    [t]
  )

  /**
   * letter, number, spec char, min 8 char
   * @param message (optional) i18n key
   */
  const password = useCallback(
    (message?: string): Rule => ({
      pattern: new RegExp('^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'),
      message: t(message ?? 'common.rule-error.password-format')
    }),
    [t]
  )

  return { required, password }
}
