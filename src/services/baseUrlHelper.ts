/**
 * Returns the base url of the app
 */
export function getUrl(baseUrl?: string): string {
  const location = window.location
  return baseUrl || location.protocol + '//' + location.host
}
