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
    ClaimedCouponCodeVm,
    ClaimedCouponCodeVmFromJSON,
    ClaimedCouponCodeVmToJSON,
    MyClaimedCouponVm,
    MyClaimedCouponVmFromJSON,
    MyClaimedCouponVmToJSON,
} from '../models';

export interface BurnCouponRequest {
    userId: string | null;
    couponCode: string | null;
}

export interface CouponCodesCouponUserCodeRequest {
    couponId: number;
}

export interface CouponUserCodeRequest {
    couponId: number;
}

export interface GetClaimedCouponsRequest {
    couponId: number;
}

/**
 * no description
 */
export class CouponUserCodesApi extends runtime.BaseAPI {

    /**
     * Archives every coupon code in the database
     * Archives all coupon codes
     */
    async archiveClaimedCouponsRaw(): Promise<runtime.ApiResponse<void>> {
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
     * Archives every coupon code in the database
     * Archives all coupon codes
     */
    async archiveClaimedCoupons(): Promise<void> {
        await this.archiveClaimedCouponsRaw();
    }

    /**
     * Used to delete a coupon code from user purse
     */
    async burnCouponRaw(requestParameters: BurnCouponRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling burnCoupon.');
        }

        if (requestParameters.couponCode === null || requestParameters.couponCode === undefined) {
            throw new runtime.RequiredError('couponCode','Required parameter requestParameters.couponCode was null or undefined when calling burnCoupon.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/CouponUserCodes/{userId}/BurnCoupon/{couponCode}`.replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters.userId))).replace(`{${"couponCode"}}`, encodeURIComponent(String(requestParameters.couponCode))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Used to delete a coupon code from user purse
     */
    async burnCoupon(requestParameters: BurnCouponRequest): Promise<void> {
        await this.burnCouponRaw(requestParameters);
    }

    /**
     */
    async couponCodesCouponUserCodeRaw(requestParameters: CouponCodesCouponUserCodeRequest): Promise<runtime.ApiResponse<Blob>> {
        if (requestParameters.couponId === null || requestParameters.couponId === undefined) {
            throw new runtime.RequiredError('couponId','Required parameter requestParameters.couponId was null or undefined when calling couponCodesCouponUserCode.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/CouponUserCodes/{couponId}/CouponCodes`.replace(`{${"couponId"}}`, encodeURIComponent(String(requestParameters.couponId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.BlobApiResponse(response);
    }

    /**
     */
    async couponCodesCouponUserCode(requestParameters: CouponCodesCouponUserCodeRequest): Promise<Blob> {
        const response = await this.couponCodesCouponUserCodeRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async couponUserCodeRaw(requestParameters: CouponUserCodeRequest): Promise<runtime.ApiResponse<Blob>> {
        if (requestParameters.couponId === null || requestParameters.couponId === undefined) {
            throw new runtime.RequiredError('couponId','Required parameter requestParameters.couponId was null or undefined when calling couponUserCode.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/CouponUserCodes/{couponId}/RedeemedCouponCodes`.replace(`{${"couponId"}}`, encodeURIComponent(String(requestParameters.couponId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.BlobApiResponse(response);
    }

    /**
     */
    async couponUserCode(requestParameters: CouponUserCodeRequest): Promise<Blob> {
        const response = await this.couponUserCodeRaw(requestParameters);
        return await response.value();
    }

    /**
     * Returns a list of coupon codes that have been claimed for coupon with an Id of couponId
     * Returns the claimed coupon codes for a coupon
     */
    async getClaimedCouponsRaw(requestParameters: GetClaimedCouponsRequest): Promise<runtime.ApiResponse<ClaimedCouponCodeVm>> {
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

        return new runtime.JSONApiResponse(response, (jsonValue) => ClaimedCouponCodeVmFromJSON(jsonValue));
    }

    /**
     * Returns a list of coupon codes that have been claimed for coupon with an Id of couponId
     * Returns the claimed coupon codes for a coupon
     */
    async getClaimedCoupons(requestParameters: GetClaimedCouponsRequest): Promise<ClaimedCouponCodeVm> {
        const response = await this.getClaimedCouponsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Returns claimed coupon codes
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
     * Returns claimed coupon codes
     */
    async getMyClaimedCoupons(): Promise<Array<MyClaimedCouponVm>> {
        const response = await this.getMyClaimedCouponsRaw();
        return await response.value();
    }

}
