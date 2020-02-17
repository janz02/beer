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
    ChangeCouponStateDto,
    ChangeCouponStateDtoFromJSON,
    ChangeCouponStateDtoToJSON,
    CouponCodeVm,
    CouponCodeVmFromJSON,
    CouponCodeVmToJSON,
    CouponDto,
    CouponDtoFromJSON,
    CouponDtoToJSON,
    CouponState,
    CouponStateFromJSON,
    CouponStateToJSON,
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
    WaitingCouponVmPaginatedResponse,
    WaitingCouponVmPaginatedResponseFromJSON,
    WaitingCouponVmPaginatedResponseToJSON,
} from '../models';

export interface ClaimCouponRequest {
    id: number;
}

export interface CreateCouponsRequest {
    couponDto?: CouponDto;
}

export interface DeleteCouponsRequest {
    id: number;
}

export interface GetCouponsRequest {
    name?: string;
    description?: string;
    includeArchived?: boolean;
    page?: number;
    pageSize?: number;
    orderBy?: string;
    orderByType?: OrderByType;
}

export interface GetOneCouponRequest {
    id: number;
}

export interface GetWaitingCouponsRequest {
    name?: string;
    state?: CouponState;
    categoryId?: number;
    startDate?: Date;
    endDate?: Date;
    expireDate?: Date;
    page?: number;
    pageSize?: number;
    orderBy?: string;
    orderByType?: OrderByType;
}

export interface UpdateCouponRequest {
    id: number;
    couponDto?: CouponDto;
}

export interface UpdateCouponStatusRequest {
    id: number;
    changeCouponStateDto?: ChangeCouponStateDto;
}

/**
 * no description
 */
export class CouponsApi extends runtime.BaseAPI {

    /**
     * Claims a coupon to put it in the used up coupons for the user
     * Claims a coupon for the logged in user
     */
    async claimCouponRaw(requestParameters: ClaimCouponRequest): Promise<runtime.ApiResponse<CouponCodeVm>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling claimCoupon.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Coupons/{id}/Claim`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => CouponCodeVmFromJSON(jsonValue));
    }

    /**
     * Claims a coupon to put it in the used up coupons for the user
     * Claims a coupon for the logged in user
     */
    async claimCoupon(requestParameters: ClaimCouponRequest): Promise<CouponCodeVm> {
        const response = await this.claimCouponRaw(requestParameters);
        return await response.value();
    }

    /**
     * Returns the id of the new Coupon upon success
     * Creates a Coupon entity
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
     * Returns the id of the new Coupon upon success
     * Creates a Coupon entity
     */
    async createCoupons(requestParameters: CreateCouponsRequest): Promise<Int32EntityCreatedVm> {
        const response = await this.createCouponsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Deletes the Coupon entity with Id of \"id\"
     * Deletes a Coupon entity
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
     * Deletes the Coupon entity with Id of \"id\"
     * Deletes a Coupon entity
     */
    async deleteCoupons(requestParameters: DeleteCouponsRequest): Promise<void> {
        await this.deleteCouponsRaw(requestParameters);
    }

    /**
     * Returns the Coupon list with the specified filters applied
     * Gets a Coupon entity list sorted and filtered
     */
    async getCouponsRaw(requestParameters: GetCouponsRequest): Promise<runtime.ApiResponse<CouponVmPaginatedResponse>> {
        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.name !== undefined) {
            queryParameters['name'] = requestParameters.name;
        }

        if (requestParameters.description !== undefined) {
            queryParameters['description'] = requestParameters.description;
        }

        if (requestParameters.includeArchived !== undefined) {
            queryParameters['includeArchived'] = requestParameters.includeArchived;
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
            path: `/api/Coupons`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => CouponVmPaginatedResponseFromJSON(jsonValue));
    }

    /**
     * Returns the Coupon list with the specified filters applied
     * Gets a Coupon entity list sorted and filtered
     */
    async getCoupons(requestParameters: GetCouponsRequest): Promise<CouponVmPaginatedResponse> {
        const response = await this.getCouponsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Returns the Coupon with the specified Id upon success
     * Gets a Coupon entity by Id
     */
    async getOneCouponRaw(requestParameters: GetOneCouponRequest): Promise<runtime.ApiResponse<CouponVm>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getOneCoupon.');
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
     * Returns the Coupon with the specified Id upon success
     * Gets a Coupon entity by Id
     */
    async getOneCoupon(requestParameters: GetOneCouponRequest): Promise<CouponVm> {
        const response = await this.getOneCouponRaw(requestParameters);
        return await response.value();
    }

    /**
     * Returns the Coupon list with the specified filters applied with only Coupons that are in waiting state
     * Gets a Coupon entity list sorted and filtered with only Coupons that are in waiting state
     */
    async getWaitingCouponsRaw(requestParameters: GetWaitingCouponsRequest): Promise<runtime.ApiResponse<WaitingCouponVmPaginatedResponse>> {
        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.name !== undefined) {
            queryParameters['name'] = requestParameters.name;
        }

        if (requestParameters.state !== undefined) {
            queryParameters['state'] = requestParameters.state;
        }

        if (requestParameters.categoryId !== undefined) {
            queryParameters['categoryId'] = requestParameters.categoryId;
        }

        if (requestParameters.startDate !== undefined) {
            queryParameters['startDate'] = (requestParameters.startDate as any).toISOString();
        }

        if (requestParameters.endDate !== undefined) {
            queryParameters['endDate'] = (requestParameters.endDate as any).toISOString();
        }

        if (requestParameters.expireDate !== undefined) {
            queryParameters['expireDate'] = (requestParameters.expireDate as any).toISOString();
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
            path: `/api/Coupons/Waiting`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => WaitingCouponVmPaginatedResponseFromJSON(jsonValue));
    }

    /**
     * Returns the Coupon list with the specified filters applied with only Coupons that are in waiting state
     * Gets a Coupon entity list sorted and filtered with only Coupons that are in waiting state
     */
    async getWaitingCoupons(requestParameters: GetWaitingCouponsRequest): Promise<WaitingCouponVmPaginatedResponse> {
        const response = await this.getWaitingCouponsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Updates a Coupon entity with Id of \"id\" to entity \"item\"
     * Updates a Coupon entity
     */
    async updateCouponRaw(requestParameters: UpdateCouponRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateCoupon.');
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
     * Updates a Coupon entity with Id of \"id\" to entity \"item\"
     * Updates a Coupon entity
     */
    async updateCoupon(requestParameters: UpdateCouponRequest): Promise<void> {
        await this.updateCouponRaw(requestParameters);
    }

    /**
     * Updates a Coupon entity status only with Id of \"id\" to entity \"changeCouponStateDto\"
     * Updates a Coupon entity status only
     */
    async updateCouponStatusRaw(requestParameters: UpdateCouponStatusRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateCouponStatus.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Coupons/{id}/Status`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: ChangeCouponStateDtoToJSON(requestParameters.changeCouponStateDto),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Updates a Coupon entity status only with Id of \"id\" to entity \"changeCouponStateDto\"
     * Updates a Coupon entity status only
     */
    async updateCouponStatus(requestParameters: UpdateCouponStatusRequest): Promise<void> {
        await this.updateCouponStatusRaw(requestParameters);
    }

}
