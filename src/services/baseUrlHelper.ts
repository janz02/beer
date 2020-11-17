/**
 * Returns the base url of the app
 */
export function getUrl(appendUrl?: string): string {
  return process.env.REACT_APP_MODE === 'development'
    ? `${process.env.REACT_APP_API_URL}${appendUrl}`
    : `${appendUrl}`
}
