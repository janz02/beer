import { Rule } from 'rc-field-form/lib/interface'
import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'
import {
  FileExtension,
  FrontendFileValue,
  MAX_FILE_SIZE_IN_MB,
  PictureDimensions
} from 'components/upload/fileUploadHelper'

/**
 * Contains validation rules that can be used with Ant Design Forms.
 */
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
      message: message || t('error.validation.common.password-invalid-format')
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
      message: message || t('error.validation.common.email-invalid-format')
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

  /**
   * Max value
   * @param max number, max value of the integer input
   * @param message (optional) string
   */
  const maxValue = useCallback(
    (max: number, message?: string): Rule => ({
      transform: value => {
        return value ? +value : undefined
      },
      type: 'integer',
      max,
      message: message || t('error.common.max-number-exact', { max })
    }),
    [t]
  )

  /**
   * Integer
   * @param message (optional) string
   */
  const positiveInteger = useCallback(
    (message?: string): Rule => ({
      transform: value => {
        return value ? +value : 1
      },

      whitespace: true,
      type: 'integer',
      min: 1,
      required: false,
      message: message || t('error.common.number-must-be-positive-integer')
    }),
    [t]
  )

  /**
   * FileExtension
   * @param extensions string, accept attribute of input fields, example: <input type="file" accept=".jpg,.png">
   * @param message (optional) string
   */
  const fileExtension = useCallback(
    (extensions: string | string[] | FileExtension[], message?: string): Rule => ({
      validator: (rule, value) => {
        return value && !extensions.includes(value.extension)
          ? Promise.reject(new Error('incorrectFileExtension'))
          : Promise.resolve()
      },
      message: message || t('error.common.incorrect-file-extension')
    }),
    [t]
  )

  /**
   * FileSize
   * @param size (optional) number: file size in megabytes
   * @param message (optional) string
   */
  const fileSize = useCallback(
    (size?: number, message?: string): Rule => ({
      validator: (rule, value) => {
        const convertToMB = (valueSize: number): number => valueSize / 1024 / 1024
        const maxSize = size || MAX_FILE_SIZE_IN_MB

        return value && convertToMB(value.size) >= maxSize
          ? Promise.reject(new Error('tooBigFile'))
          : Promise.resolve()
      },
      message: message || t('error.common.file-size-too-big')
    }),
    [t]
  )

  /**
   * ImgDimensions
   * @param dimensions allowed picture dimensions in pixel, example: { width: 300, height: 400 }
   * @param message (optional) string
   */
  const fileImgDimensionsExactMatch = useCallback(
    (dimensions: PictureDimensions, message?: string): Rule => ({
      validator: (rule, value: FrontendFileValue) => {
        if (!value || !value.dimensions) {
          return Promise.resolve()
        } else if (
          dimensions.width === value.dimensions.width &&
          dimensions.height === value.dimensions.height
        ) {
          return Promise.resolve()
        } else {
          return Promise.reject(new Error('imgDimensionsNotValid'))
        }
      },
      message:
        message ||
        t('error.common.img-dimensions-incorrect', {
          width: dimensions.width,
          height: dimensions.height
        })
    }),
    [t]
  )

  return {
    required,
    requiredString,
    password,
    number,
    email,
    max,
    maxValue,
    positiveInteger,
    fileExtension,
    fileSize,
    fileImgDimensionsExactMatch
  }
}
