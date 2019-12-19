import { Configuration } from './swagger/runtime';
import { CouponsApi, CategoriesApi } from './swagger/apis';

const config: Configuration = new Configuration({
  basePath: process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL
    : 'http://104.199.97.19',
  apiKey: () => `Bearer ${'jwt'}`,
});

export default {
  coupons: new CouponsApi(config),
  categories: new CategoriesApi(config),
};
