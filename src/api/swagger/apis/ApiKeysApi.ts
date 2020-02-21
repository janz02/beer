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
    CreateSiteApiKeyDto,
    CreateSiteApiKeyDtoFromJSON,
    CreateSiteApiKeyDtoToJSON,
    Int32StringEntityCreatedCompositeVm,
    Int32StringEntityCreatedCompositeVmFromJSON,
    Int32StringEntityCreatedCompositeVmToJSON,
    OrderByType,
    OrderByTypeFromJSON,
    OrderByTypeToJSON,
    SiteApiKeyVm,
    SiteApiKeyVmFromJSON,
    SiteApiKeyVmToJSON,
    SiteApiKeyVmPaginatedResponse,
    SiteApiKeyVmPaginatedResponseFromJSON,
    SiteApiKeyVmPaginatedResponseToJSON,
} from '../models';

export interface CreateApiKeyRequest {
    createSiteApiKeyDto?: CreateSiteApiKeyDto;
}

export interface DeleteApiKeyRequest {
    id: number;
}

export interface GetApiKeyRequest {
    id: number;
}

export interface GetApiKeysRequest {
    siteId?: number;
    page?: number;
    pageSize?: number;
    orderBy?: string;
    orderByType?: OrderByType;
}

export interface UpdateApiKeyRequest {
    id: number;
    createSiteApiKeyDto?: CreateSiteApiKeyDto;
}

/**
 * no description
 */
export class ApiKeysApi extends runtime.BaseAPI {

    /**
     * Returns the id of the entity upon success
     * Creates an entity
     */
    async createApiKeyRaw(requestParameters: CreateApiKeyRequest): Promise<runtime.ApiResponse<Int32StringEntityCreatedCompositeVm>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/ApiKeys`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateSiteApiKeyDtoToJSON(requestParameters.createSiteApiKeyDto),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => Int32StringEntityCreatedCompositeVmFromJSON(jsonValue));
    }

    /**
     * Returns the id of the entity upon success
     * Creates an entity
     */
    async createApiKey(requestParameters: CreateApiKeyRequest): Promise<Int32StringEntityCreatedCompositeVm> {
        const response = await this.createApiKeyRaw(requestParameters);
        return await response.value();
    }

    /**
     * Deletes an entity with Id of \"id\"
     * Deletes an entity
     */
    async deleteApiKeyRaw(requestParameters: DeleteApiKeyRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteApiKey.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/ApiKeys/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Deletes an entity with Id of \"id\"
     * Deletes an entity
     */
    async deleteApiKey(requestParameters: DeleteApiKeyRequest): Promise<void> {
        await this.deleteApiKeyRaw(requestParameters);
    }

    /**
     * Returns the entity with the specified Id upon success
     * Gets an entity by Id
     */
    async getApiKeyRaw(requestParameters: GetApiKeyRequest): Promise<runtime.ApiResponse<SiteApiKeyVm>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getApiKey.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/ApiKeys/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => SiteApiKeyVmFromJSON(jsonValue));
    }

    /**
     * Returns the entity with the specified Id upon success
     * Gets an entity by Id
     */
    async getApiKey(requestParameters: GetApiKeyRequest): Promise<SiteApiKeyVm> {
        const response = await this.getApiKeyRaw(requestParameters);
        return await response.value();
    }

    /**
     * Returns the entity list with the specified filters applied
     * Gets an entity list sorted and filtered
     */
    async getApiKeysRaw(requestParameters: GetApiKeysRequest): Promise<runtime.ApiResponse<SiteApiKeyVmPaginatedResponse>> {
        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.siteId !== undefined) {
            queryParameters['siteId'] = requestParameters.siteId;
        }

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
            path: `/api/ApiKeys`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => SiteApiKeyVmPaginatedResponseFromJSON(jsonValue));
    }

    /**
     * Returns the entity list with the specified filters applied
     * Gets an entity list sorted and filtered
     */
    async getApiKeys(requestParameters: GetApiKeysRequest): Promise<SiteApiKeyVmPaginatedResponse> {
        const response = await this.getApiKeysRaw(requestParameters);
        return await response.value();
    }

    /**
     * Updates an entity with Id of \"id\" to entity \"dto\"
     * Updates an entity
     */
    async updateApiKeyRaw(requestParameters: UpdateApiKeyRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateApiKey.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/ApiKeys/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: CreateSiteApiKeyDtoToJSON(requestParameters.createSiteApiKeyDto),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Updates an entity with Id of \"id\" to entity \"dto\"
     * Updates an entity
     */
    async updateApiKey(requestParameters: UpdateApiKeyRequest): Promise<void> {
        await this.updateApiKeyRaw(requestParameters);
    }

}
