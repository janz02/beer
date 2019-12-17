import { CouponsApi } from './swagger/apis/CouponsApi';
import { Configuration } from './swagger/runtime';

const config: Configuration = new Configuration({
  basePath: process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL
    : 'http://104.199.97.19',
  apiKey: () => `Bearer ${'jwt'}`,
});

export default {
  coupons: new CouponsApi(config),
};
