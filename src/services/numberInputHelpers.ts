export const separatorFormatter = (value: number | string | undefined): string =>
  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

export const separatorParser = (displayValue: string | undefined): number | string =>
  displayValue ? displayValue?.replace(/( *)/g, '') : ''

export const getSeparatorAndSuffixFormatter = (
  suffix: string
): ((value: number | string | undefined) => string) => value =>
  `${value} ${suffix}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

export const getSeparatorAndSuffixParser = (
  suffix: string
): ((displayValue: string | undefined) => number | string) => displayValue =>
  displayValue
    ? displayValue?.replace(new RegExp(`[${suffix.split('').join(',')}]s?|( *)`, 'g'), '')
    : ''
