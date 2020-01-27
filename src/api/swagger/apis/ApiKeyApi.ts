/* tslint:disable */
/* eslint-disable */
/**
 * NKM PKM Coupon Api
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    Int32StringCreateSiteApiKeyVm,
    Int32StringCreateSiteApiKeyVmFromJSON,
    Int32StringCreateSiteApiKeyVmToJSON,
    OrderByType,
    OrderByTypeFromJSON,
    OrderByTypeToJSON,
    SiteApiKeyVmPaginatedResponse,
    SiteApiKeyVmPaginatedResponseFromJSON,
    SiteApiKeyVmPaginatedResponseToJSON,
} from '../models';

export interface CreateApiKeyRequest {
    siteId?: number;
}

export interface ListApiKeyRequest {
    page?: number;
    pageSize?: number;
    orderBy?: string;
    orderByType?: OrderByType;
}

/**
 * no description
 */
export class ApiKeyApi extends runtime.BaseAPI {

    /**
     */
    async createApiKeyRaw(requestParameters: CreateApiKeyRequest): Promise<runtime.ApiResponse<Int32StringCreateSiteApiKeyVm>> {
        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.siteId !== undefined) {
            queryParameters['siteId'] = requestParameters.siteId;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/ApiKey`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => Int32StringCreateSiteApiKeyVmFromJSON(jsonValue));
    }

    /**
     */
    async createApiKey(requestParameters: CreateApiKeyRequest): Promise<Int32StringCreateSiteApiKeyVm> {
        const response = await this.createApiKeyRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async listApiKeyRaw(requestParameters: ListApiKeyRequest): Promise<runtime.ApiResponse<SiteApiKeyVmPaginatedResponse>> {
        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.page !== undefined) {
            queryParameters['page'] = requestParameters.page;
        }

        if (requestParameters.pageSize !== undefined) {
            queryParameters['pageSize'] = requestParameters.pageSize;
        }

        if (requestParameters.orderBy !== undefined) {
            queryParameters['orderBy'] = requestParameters.orderBy;
        }

        if (requestParameters.orderByType !== undefined) {
            queryParameters['orderByType'] = requestParameters.orderByType;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/ApiKey`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => SiteApiKeyVmPaginatedResponseFromJSON(jsonValue));
    }

    /**
     */
    async listApiKey(requestParameters: ListApiKeyRequest): Promise<SiteApiKeyVmPaginatedResponse> {
        const response = await this.listApiKeyRaw(requestParameters);
        return await response.value();
    }

}
