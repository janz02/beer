import { apm, init as initApm } from '@elastic/apm-rum'

const getEnvironmentFromHostname = (hostname: string): string => {
  if (hostname.includes('dev')) return 'dev'
  if (hostname.includes('qa')) return 'qa'

  return hostname === 'localhost' ? 'dev' : 'prod'
}

export const withCurrentTransaction = <T>(f: (t: Transaction) => T): T | undefined => {
  const transaction = apm.getCurrentTransaction()
  if (transaction) {
    return f(transaction)
  }
}

initApm({
  serviceName: process.env.REACT_APP_APM_SERVICE_NAME,
  serverUrl: process.env.REACT_APP_APM_SERVER_URL,
  serviceVersion: process.env.REACT_APP_VERSION,
  // eslint-disable-next-line no-restricted-globals
  environment: getEnvironmentFromHostname(location.hostname)
})
