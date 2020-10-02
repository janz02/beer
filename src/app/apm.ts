import { init as initApm } from '@elastic/apm-rum'

initApm({
  serviceName: 'pkm-couponmanager',
  serverUrl: process.env.REACT_APP_APM_SERVER_URL,
  serviceVersion: ''
})
