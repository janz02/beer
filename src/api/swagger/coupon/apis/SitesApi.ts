/* tslint:disable */
/* eslint-disable */
/**
 * Optima Coupon
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
    Int32EntityCreatedVm,
    Int32EntityCreatedVmFromJSON,
    Int32EntityCreatedVmToJSON,
    OrderByType,
    OrderByTypeFromJSON,
    OrderByTypeToJSON,
    ProblemDetails,
    ProblemDetailsFromJSON,
    ProblemDetailsToJSON,
    SiteDto,
    SiteDtoFromJSON,
    SiteDtoToJSON,
    SiteVm,
    SiteVmFromJSON,
    SiteVmToJSON,
    SiteVmPaginatedResponse,
    SiteVmPaginatedResponseFromJSON,
    SiteVmPaginatedResponseToJSON,
} from '../models';

export interface CreateSiteRequest {
    xOPTIMATransactionGuid?: string;
    siteDto?: SiteDto;
}

export interface DeleteSiteRequest {
    id: number;
    xOPTIMATransactionGuid?: string;
}

export interface ExportSitesRequest {
    name?: string | null;
    address?: string | null;
    partnerId?: number | null;
    page?: number;
    pageSize?: number;
    orderBy?: string | null;
    orderByType?: OrderByType;
    xOPTIMATransactionGuid?: string;
}

export interface GetSiteRequest {
    id: number;
    xOPTIMATransactionGuid?: string;
}

export interface GetSitesRequest {
    name?: string | null;
    address?: string | null;
    partnerId?: number | null;
    page?: number;
    pageSize?: number;
    orderBy?: string | null;
    orderByType?: OrderByType;
    xOPTIMATransactionGuid?: string;
}

export interface UpdateSiteRequest {
    id: number;
    xOPTIMATransactionGuid?: string;
    siteDto?: SiteDto;
}

/**
 * no description
 */
export class SitesApi extends runtime.BaseAPI {

    /**
     * Returns the id of the entity upon success
     * Creates an entity
     */
    async createSiteRaw(requestParameters: CreateSiteRequest): Promise<runtime.ApiResponse<Int32EntityCreatedVm>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (requestParameters.xOPTIMATransactionGuid !== undefined && requestParameters.xOPTIMATransactionGuid !== null) {
            headerParameters['X-OPTIMA-Transaction-Guid'] = String(requestParameters.xOPTIMATransactionGuid);
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Sites`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: SiteDtoToJSON(requestParameters.siteDto),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => Int32EntityCreatedVmFromJSON(jsonValue));
    }

    /**
     * Returns the id of the entity upon success
     * Creates an entity
     */
    async createSite(requestParameters: CreateSiteRequest): Promise<Int32EntityCreatedVm> {
        const response = await this.createSiteRaw(requestParameters);
        return await response.value();
    }

    /**
     * Deletes an entity with Id of \"id\"
     * Deletes an entity
     */
    async deleteSiteRaw(requestParameters: DeleteSiteRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteSite.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.xOPTIMATransactionGuid !== undefined && requestParameters.xOPTIMATransactionGuid !== null) {
            headerParameters['X-OPTIMA-Transaction-Guid'] = String(requestParameters.xOPTIMATransactionGuid);
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Sites/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
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
    async deleteSite(requestParameters: DeleteSiteRequest): Promise<void> {
        await this.deleteSiteRaw(requestParameters);
    }

    /**
     * Exports the entity list with the specified filters applied in a csv file
     * Exports an entity list sorted and filtered
     */
    async exportSitesRaw(requestParameters: ExportSitesRequest): Promise<runtime.ApiResponse<Blob>> {
        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.name !== undefined) {
            queryParameters['name'] = requestParameters.name;
        }

        if (requestParameters.address !== undefined) {
            queryParameters['address'] = requestParameters.address;
        }

        if (requestParameters.partnerId !== undefined) {
            queryParameters['partnerId'] = requestParameters.partnerId;
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

        if (requestParameters.xOPTIMATransactionGuid !== undefined && requestParameters.xOPTIMATransactionGuid !== null) {
            headerParameters['X-OPTIMA-Transaction-Guid'] = String(requestParameters.xOPTIMATransactionGuid);
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Sites/ExportSites`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.BlobApiResponse(response);
    }

    /**
     * Exports the entity list with the specified filters applied in a csv file
     * Exports an entity list sorted and filtered
     */
    async exportSites(requestParameters: ExportSitesRequest): Promise<Blob> {
        const response = await this.exportSitesRaw(requestParameters);
        return await response.value();
    }

    /**
     * Returns the entity with the specified Id upon success
     * Gets an entity by Id
     */
    async getSiteRaw(requestParameters: GetSiteRequest): Promise<runtime.ApiResponse<SiteVm>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getSite.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.xOPTIMATransactionGuid !== undefined && requestParameters.xOPTIMATransactionGuid !== null) {
            headerParameters['X-OPTIMA-Transaction-Guid'] = String(requestParameters.xOPTIMATransactionGuid);
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Sites/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => SiteVmFromJSON(jsonValue));
    }

    /**
     * Returns the entity with the specified Id upon success
     * Gets an entity by Id
     */
    async getSite(requestParameters: GetSiteRequest): Promise<SiteVm> {
        const response = await this.getSiteRaw(requestParameters);
        return await response.value();
    }

    /**
     * Returns the entity list with the specified filters applied
     * Gets an entity list sorted and filtered
     */
    async getSitesRaw(requestParameters: GetSitesRequest): Promise<runtime.ApiResponse<SiteVmPaginatedResponse>> {
        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.name !== undefined) {
            queryParameters['name'] = requestParameters.name;
        }

        if (requestParameters.address !== undefined) {
            queryParameters['address'] = requestParameters.address;
        }

        if (requestParameters.partnerId !== undefined) {
            queryParameters['partnerId'] = requestParameters.partnerId;
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

        if (requestParameters.xOPTIMATransactionGuid !== undefined && requestParameters.xOPTIMATransactionGuid !== null) {
            headerParameters['X-OPTIMA-Transaction-Guid'] = String(requestParameters.xOPTIMATransactionGuid);
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Sites`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => SiteVmPaginatedResponseFromJSON(jsonValue));
    }

    /**
     * Returns the entity list with the specified filters applied
     * Gets an entity list sorted and filtered
     */
    async getSites(requestParameters: GetSitesRequest): Promise<SiteVmPaginatedResponse> {
        const response = await this.getSitesRaw(requestParameters);
        return await response.value();
    }

    /**
     * Updates an entity with Id of \"id\" to entity \"dto\"
     * Updates an entity
     */
    async updateSiteRaw(requestParameters: UpdateSiteRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateSite.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (requestParameters.xOPTIMATransactionGuid !== undefined && requestParameters.xOPTIMATransactionGuid !== null) {
            headerParameters['X-OPTIMA-Transaction-Guid'] = String(requestParameters.xOPTIMATransactionGuid);
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Sites/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: SiteDtoToJSON(requestParameters.siteDto),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Updates an entity with Id of \"id\" to entity \"dto\"
     * Updates an entity
     */
    async updateSite(requestParameters: UpdateSiteRequest): Promise<void> {
        await this.updateSiteRaw(requestParameters);
    }

}
