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
    CouponUserCodeVmPaginatedResponse,
    CouponUserCodeVmPaginatedResponseFromJSON,
    CouponUserCodeVmPaginatedResponseToJSON,
    MyClaimedCouponVm,
    MyClaimedCouponVmFromJSON,
    MyClaimedCouponVmToJSON,
} from '../models';

export interface GetClaimedCouponsRequest {
    couponId: number;
}

/**
 * no description
 */
export class CouponUserCodesApi extends runtime.BaseAPI {

    /**
     */
    async archiveCouponUserCodesRaw(): Promise<runtime.ApiResponse<void>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/CouponUserCodes/Archive`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async archiveCouponUserCodes(): Promise<void> {
        await this.archiveCouponUserCodesRaw();
    }

    /**
     */
    async getClaimedCouponsRaw(requestParameters: GetClaimedCouponsRequest): Promise<runtime.ApiResponse<CouponUserCodeVmPaginatedResponse>> {
        if (requestParameters.couponId === null || requestParameters.couponId === undefined) {
            throw new runtime.RequiredError('couponId','Required parameter requestParameters.couponId was null or undefined when calling getClaimedCoupons.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/CouponUserCodes/Coupon/{couponId}`.replace(`{${"couponId"}}`, encodeURIComponent(String(requestParameters.couponId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => CouponUserCodeVmPaginatedResponseFromJSON(jsonValue));
    }

    /**
     */
    async getClaimedCoupons(requestParameters: GetClaimedCouponsRequest): Promise<CouponUserCodeVmPaginatedResponse> {
        const response = await this.getClaimedCouponsRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async getMyClaimedCouponsRaw(): Promise<runtime.ApiResponse<Array<MyClaimedCouponVm>>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/CouponUserCodes/MyClaimedCoupons`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(MyClaimedCouponVmFromJSON));
    }

    /**
     */
    async getMyClaimedCoupons(): Promise<Array<MyClaimedCouponVm>> {
        const response = await this.getMyClaimedCouponsRaw();
        return await response.value();
    }

}
