export const formatterSeparator = (value: number | string | undefined): string =>
  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

export const parserSeparator = (displayValue: string | undefined): number | string =>
  displayValue ? displayValue?.replace(/( *)/g, '') : ''

export const formatterSeparatorAndFt = (value: number | string | undefined): string =>
  `${value} Ft`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

export const parserSeparatorAndFt = (displayValue: string | undefined): number | string =>
  displayValue ? displayValue?.replace(/[F,t]\s?|( *)/g, '') : ''
