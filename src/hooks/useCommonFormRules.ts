import { Rule } from 'rc-field-form/lib/interface'
import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useCommonFormRules() {
  const { t } = useTranslation()

  /**
   * Required
   * @param message (optional) string
   * @param other (optional) extra rule parameters
   */
  const required = useCallback(
    (message?: string, other?: Rule): Rule => ({
      ...other,
      required: true,
      message: message || t('error.common.field-required')
    }),
    [t]
  )

  /**
   * Required string - it's the same as required but with whitespace: true.
   * @param message (optional) string
   * @param other (optional) extra rule parameters
   */
  const requiredString = useCallback(
    (message?: string, other?: Rule): Rule => ({
      ...other,
      required: true,
      whitespace: true,
      message: message || t('error.common.field-required')
    }),
    [t]
  )

  /**
   * Password
   * The password must be 8-64 characters long, include at least one number, lower and uppercase
   * letter, special character (https://owasp.org/www-community/password-special-characters) and doesn't includes non-english letters and space.
   * @param message (optional) string
   */
  const password = useCallback(
    (message?: string): Rule => ({
      pattern: new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~])[A-Za-z\\d!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~]{8,64}$'
      ),
      message: message || t('error.common.password-format')
    }),
    [t]
  )

  /**
   * Number
   * @param message (optional) string
   */
  const number = useCallback(
    (message?: string): Rule => ({
      pattern: new RegExp('^\\d+$'),
      message: message || t('error.common.field-number')
    }),
    [t]
  )

  /**
   * Email (https://emailregex.com/)
   * @param message (optional) string
   */
  const email = useCallback(
    (message?: string): Rule => ({
      pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: message || t('error.common.email-format')
    }),
    [t]
  )

  /**
   * Max
   * @param message (optional) string
   */
  const max = useCallback(
    (max: number, message?: string): Rule => ({
      max,
      message: message || t('error.common.max-length-exact', { max })
    }),
    [t]
  )

  return { required, requiredString, password, number, email, max }
}
