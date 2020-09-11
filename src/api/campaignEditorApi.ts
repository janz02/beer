import {
  CampaignsApi,
  PermissionsApi,
  ProductsApi,
  SegmentationCategoriesApi,
  SegmentationQueriesApi,
  SegmentationsApi,
  SharepointApi,
  TemplatesApi,
  TestGroupCategoriesApi
} from './campaign-editor-api/apis'
import { campaignApiConfig } from './apiConfigs'

export const campaignApi = {
  campaigns: new CampaignsApi(campaignApiConfig),
  permissions: new PermissionsApi(campaignApiConfig),
  products: new ProductsApi(campaignApiConfig),
  segmentationCategories: new SegmentationCategoriesApi(campaignApiConfig),
  segmentationQueries: new SegmentationQueriesApi(campaignApiConfig),
  segmentations: new SegmentationsApi(campaignApiConfig),
  sharepoint: new SharepointApi(campaignApiConfig),
  templates: new TemplatesApi(campaignApiConfig),
  testGroupCategories: new TestGroupCategoriesApi(campaignApiConfig)
}
