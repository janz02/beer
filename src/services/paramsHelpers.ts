/**
 * Casts the input string to a valid number or otherwise returns undefined.
 * @param {string} param input value to cast
 */
export const toValidId = (param?: string): number | undefined => {
  if (!param) return undefined

  const numberId = +param

  if (isNaN(numberId) || !numberId) return undefined

  return numberId
}
