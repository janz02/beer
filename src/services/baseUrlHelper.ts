/**
 * Returns the base url of the app
 */
export function getUrl(appendUrl?: string): string {
  const { origin } = window.location
  let apiUrl = ''

  switch (process.env.REACT_APP_MODE) {
    case 'development':
      apiUrl = `${process.env.REACT_APP_API_URL}${appendUrl}`
      break
    case 'production':
      apiUrl = `${origin}${appendUrl}`
      break
    default:
    case 'local':
      apiUrl = `${appendUrl}`
      break
  }

  return apiUrl
}
