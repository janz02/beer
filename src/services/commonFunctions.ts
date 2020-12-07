// returns true if all elements of an array are contained in an other
export const arrayElementsContainedInAnother = (a: any, b: any): boolean => {
  if (!Array.isArray(a) || !Array.isArray(b) || (a.length === 0 && b.length === 0)) return false

  return a.every(val => b.includes(val))
}

// returns true if some elements of an array are contained in an another
export const someArrayElementsContainedInAnother = (a: any, b: any): boolean => {
  if (!Array.isArray(a) || !Array.isArray(b) || (a.length === 0 && b.length === 0)) return false

  return a.some(val => b.includes(val))
}

export const sum = (items: any[], prop: string): number => {
  return items.reduce((a, b) => {
    return (a || 0) + (b ? b[prop] : 0)
  }, 0)
}
