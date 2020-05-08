export const toValidId = (param?: string): number | undefined => {
  if (!param) return undefined

  const numberId = +param

  if (isNaN(numberId) || !numberId) return undefined

  return numberId
}
