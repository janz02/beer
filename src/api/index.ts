import { Configuration } from './swagger/runtime';
import { CouponsApi, CategoriesApi, AuthApi } from './swagger/apis';

const config: Configuration = new Configuration({
  basePath: process.env.REACT_APP_API_URL,
  apiKey: () => `Bearer ${'jwt'}`,
});

export default {
  coupons: new CouponsApi(config),
  categories: new CategoriesApi(config),
  auth: new AuthApi(config)
};
