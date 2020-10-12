import { init as initApm } from '@elastic/apm-rum'

initApm({
  serviceName: process.env.REACT_APP_APM_SERVICE_NAME,
  serverUrl: process.env.REACT_APP_APM_SERVER_URL,
  serviceVersion: process.env.REACT_APP_VERSION
})
