/**
 * Returns the base url of the app
 */
export function getUrl(appendUrl?: string, isRtd?: boolean): string {
  const { origin } = window.location
  let baseUrl, apiUrl

  if (process.env.NODE_ENV === 'development') {
    baseUrl = isRtd ? process.env.REACT_APP_RTD_API_URL : process.env.REACT_APP_API_URL
    apiUrl = `${baseUrl}${appendUrl}`
  } else {
    baseUrl = isRtd ? origin.replace('optima', 'rtd') : origin
    apiUrl = `${baseUrl}${appendUrl}`
  }

  return apiUrl
}
