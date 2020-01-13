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
    CouponDto,
    CouponDtoFromJSON,
    CouponDtoToJSON,
    CouponVm,
    CouponVmFromJSON,
    CouponVmToJSON,
    CouponVmPaginatedResponse,
    CouponVmPaginatedResponseFromJSON,
    CouponVmPaginatedResponseToJSON,
    Int32EntityCreatedVm,
    Int32EntityCreatedVmFromJSON,
    Int32EntityCreatedVmToJSON,
    OrderByType,
    OrderByTypeFromJSON,
    OrderByTypeToJSON,
} from '../models';

export interface CreateCouponsRequest {
    couponDto?: CouponDto;
}

export interface DeleteCouponsRequest {
    id: number;
}

export interface GetCouponsRequest {
    id: number;
}

export interface ListCouponsRequest {
    name?: string;
    description?: string;
    page?: number;
    pageSize?: number;
    orderBy?: string;
    orderByType?: OrderByType;
}

export interface UpdateCouponsRequest {
    id: number;
    couponDto?: CouponDto;
}

/**
 * no description
 */
export class CouponsApi extends runtime.BaseAPI {

    /**
     */
    async createCouponsRaw(requestParameters: CreateCouponsRequest): Promise<runtime.ApiResponse<Int32EntityCreatedVm>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Coupons`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CouponDtoToJSON(requestParameters.couponDto),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => Int32EntityCreatedVmFromJSON(jsonValue));
    }

    /**
     */
    async createCoupons(requestParameters: CreateCouponsRequest): Promise<Int32EntityCreatedVm> {
        const response = await this.createCouponsRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async deleteCouponsRaw(requestParameters: DeleteCouponsRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteCoupons.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Coupons/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async deleteCoupons(requestParameters: DeleteCouponsRequest): Promise<void> {
        await this.deleteCouponsRaw(requestParameters);
    }

    /**
     */
    async getCouponsRaw(requestParameters: GetCouponsRequest): Promise<runtime.ApiResponse<CouponVm>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getCoupons.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Coupons/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => CouponVmFromJSON(jsonValue));
    }

    /**
     */
    async getCoupons(requestParameters: GetCouponsRequest): Promise<CouponVm> {
        const response = await this.getCouponsRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async listCouponsRaw(requestParameters: ListCouponsRequest): Promise<runtime.ApiResponse<CouponVmPaginatedResponse>> {
        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.name !== undefined) {
            queryParameters['Name'] = requestParameters.name;
        }

        if (requestParameters.description !== undefined) {
            queryParameters['Description'] = requestParameters.description;
        }

        if (requestParameters.page !== undefined) {
            queryParameters['Page'] = requestParameters.page;
        }

        if (requestParameters.pageSize !== undefined) {
            queryParameters['PageSize'] = requestParameters.pageSize;
        }

        if (requestParameters.orderBy !== undefined) {
            queryParameters['OrderBy'] = requestParameters.orderBy;
        }

        if (requestParameters.orderByType !== undefined) {
            queryParameters['OrderByType'] = requestParameters.orderByType;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Coupons`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => CouponVmPaginatedResponseFromJSON(jsonValue));
    }

    /**
     */
    async listCoupons(requestParameters: ListCouponsRequest): Promise<CouponVmPaginatedResponse> {
        const response = await this.listCouponsRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async updateCouponsRaw(requestParameters: UpdateCouponsRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateCoupons.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Coupons/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: CouponDtoToJSON(requestParameters.couponDto),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async updateCoupons(requestParameters: UpdateCouponsRequest): Promise<void> {
        await this.updateCouponsRaw(requestParameters);
    }

}
