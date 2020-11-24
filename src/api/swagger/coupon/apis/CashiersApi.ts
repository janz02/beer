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
    CashierDto,
    CashierDtoFromJSON,
    CashierDtoToJSON,
    CashierVm,
    CashierVmFromJSON,
    CashierVmToJSON,
    CashierVmPaginatedResponse,
    CashierVmPaginatedResponseFromJSON,
    CashierVmPaginatedResponseToJSON,
    Int32EntityCreatedVm,
    Int32EntityCreatedVmFromJSON,
    Int32EntityCreatedVmToJSON,
    OrderByType,
    OrderByTypeFromJSON,
    OrderByTypeToJSON,
    ProblemDetails,
    ProblemDetailsFromJSON,
    ProblemDetailsToJSON,
} from '../models';

export interface CreateCashierRequest {
    xOPTIMATransactionGuid?: string;
    cashierDto?: CashierDto;
}

export interface DeleteCashierRequest {
    id: number;
    xOPTIMATransactionGuid?: string;
}

export interface ExportCashiersRequest {
    siteId?: number;
    page?: number;
    pageSize?: number;
    orderBy?: string | null;
    orderByType?: OrderByType;
    xOPTIMATransactionGuid?: string;
}

export interface GetCashierRequest {
    id: number;
    xOPTIMATransactionGuid?: string;
}

export interface GetCashiersRequest {
    siteId?: number;
    page?: number;
    pageSize?: number;
    orderBy?: string | null;
    orderByType?: OrderByType;
    xOPTIMATransactionGuid?: string;
}

export interface UpdateCashierRequest {
    id: number;
    xOPTIMATransactionGuid?: string;
    cashierDto?: CashierDto;
}

/**
 * no description
 */
export class CashiersApi extends runtime.BaseAPI {

    /**
     * Returns the id of the entity upon success
     * Creates an entity
     */
    async createCashierRaw(requestParameters: CreateCashierRequest): Promise<runtime.ApiResponse<Int32EntityCreatedVm>> {
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
            path: `/api/Cashiers`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CashierDtoToJSON(requestParameters.cashierDto),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => Int32EntityCreatedVmFromJSON(jsonValue));
    }

    /**
     * Returns the id of the entity upon success
     * Creates an entity
     */
    async createCashier(requestParameters: CreateCashierRequest): Promise<Int32EntityCreatedVm> {
        const response = await this.createCashierRaw(requestParameters);
        return await response.value();
    }

    /**
     * Deletes a cashier with the given id
     * Deletes a cashier
     */
    async deleteCashierRaw(requestParameters: DeleteCashierRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteCashier.');
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
            path: `/api/Cashiers/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Deletes a cashier with the given id
     * Deletes a cashier
     */
    async deleteCashier(requestParameters: DeleteCashierRequest): Promise<void> {
        await this.deleteCashierRaw(requestParameters);
    }

    /**
     * Export the Cashier list with the specified filters applied in a csv file
     * Exports a Cashier entity list sorted and filtered
     */
    async exportCashiersRaw(requestParameters: ExportCashiersRequest): Promise<runtime.ApiResponse<Blob>> {
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

        if (requestParameters.xOPTIMATransactionGuid !== undefined && requestParameters.xOPTIMATransactionGuid !== null) {
            headerParameters['X-OPTIMA-Transaction-Guid'] = String(requestParameters.xOPTIMATransactionGuid);
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Cashiers/ExportCashiers`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.BlobApiResponse(response);
    }

    /**
     * Export the Cashier list with the specified filters applied in a csv file
     * Exports a Cashier entity list sorted and filtered
     */
    async exportCashiers(requestParameters: ExportCashiersRequest): Promise<Blob> {
        const response = await this.exportCashiersRaw(requestParameters);
        return await response.value();
    }

    /**
     * Returns the cashier with the specified Id upon success
     * Gets a cashier by Id
     */
    async getCashierRaw(requestParameters: GetCashierRequest): Promise<runtime.ApiResponse<CashierVm>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getCashier.');
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
            path: `/api/Cashiers/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => CashierVmFromJSON(jsonValue));
    }

    /**
     * Returns the cashier with the specified Id upon success
     * Gets a cashier by Id
     */
    async getCashier(requestParameters: GetCashierRequest): Promise<CashierVm> {
        const response = await this.getCashierRaw(requestParameters);
        return await response.value();
    }

    /**
     * Returns the cashier list with the specified filters applied
     * Gets a list of cashiers
     */
    async getCashiersRaw(requestParameters: GetCashiersRequest): Promise<runtime.ApiResponse<CashierVmPaginatedResponse>> {
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

        if (requestParameters.xOPTIMATransactionGuid !== undefined && requestParameters.xOPTIMATransactionGuid !== null) {
            headerParameters['X-OPTIMA-Transaction-Guid'] = String(requestParameters.xOPTIMATransactionGuid);
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Cashiers`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => CashierVmPaginatedResponseFromJSON(jsonValue));
    }

    /**
     * Returns the cashier list with the specified filters applied
     * Gets a list of cashiers
     */
    async getCashiers(requestParameters: GetCashiersRequest): Promise<CashierVmPaginatedResponse> {
        const response = await this.getCashiersRaw(requestParameters);
        return await response.value();
    }

    /**
     * Updates a cashier with the given id
     * Updates a cashier
     */
    async updateCashierRaw(requestParameters: UpdateCashierRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateCashier.');
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
            path: `/api/Cashiers/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: CashierDtoToJSON(requestParameters.cashierDto),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Updates a cashier with the given id
     * Updates a cashier
     */
    async updateCashier(requestParameters: UpdateCashierRequest): Promise<void> {
        await this.updateCashierRaw(requestParameters);
    }

}
