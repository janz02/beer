/**
 * * Contains formatters and parsers for Ant Design InputNumber component.
 */

/**
 * Used with Ant Design InputNumber component.
 * Specifies the format of the value presented.
 * Used with number inputs.
 * @param {number | string | undefined} value input to format
 */
export const separatorFormatter = (value: number | string | undefined): string =>
  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

/**
 * Used with Ant Design InputNumber component.
 * Specifies the value extracted from formatter.
 * Used with number inputs.
 * @param {string | undefined} displayValue
 */
export const separatorParser = (displayValue: string | undefined): number | string =>
  displayValue ? displayValue?.replace(/( *)/g, '') : ''

/**
 * Used with Ant Design InputNumber component.
 * Specifies the format of the value presented.
 * Used with custom inputs, eg. currency, percentage.
 * @param suffix
 */
export const getSeparatorAndSuffixFormatter = (
  suffix: string
): ((value: number | string | undefined) => string) => value =>
  `${value} ${suffix}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

/**
 * Used with Ant Design InputNumber component.
 * Specifies the value extracted from formatter.
 * Used with custom inputs, eg. currency, percentage.
 * @param suffix
 */
export const getSeparatorAndSuffixParser = (
  suffix: string
): ((displayValue: string | undefined) => number | string) => displayValue =>
  displayValue
    ? displayValue?.replace(new RegExp(`[${suffix.split('').join(',')}]s?|( *)`, 'g'), '')
    : ''
