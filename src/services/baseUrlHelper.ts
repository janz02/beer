/**
 * Returns the base url of the app
 */
export function getUrl(): string {
  const baseUrl = window.location
  return process.env.REACT_APP_API_URL || baseUrl.protocol + '//' + baseUrl.host
}
