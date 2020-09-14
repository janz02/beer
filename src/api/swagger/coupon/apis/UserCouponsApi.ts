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
    MyCouponVm,
    MyCouponVmFromJSON,
    MyCouponVmToJSON,
} from '../models';

/**
 * no description
 */
export class UserCouponsApi extends runtime.BaseAPI {

    /**
     * Archives every pair of coupons and users, used before generating new pairs
     * Archives every pair of coupons and users
     */
    async archiveUserCouponsRaw(): Promise<runtime.ApiResponse<void>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/UserCoupons/Archive`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Archives every pair of coupons and users, used before generating new pairs
     * Archives every pair of coupons and users
     */
    async archiveUserCoupons(): Promise<void> {
        await this.archiveUserCouponsRaw();
    }

    /**
     * Returns a coupon list that contains up to 8 coupons for the user for today
     * Returns the coupons generated for the user
     */
    async getMyUserCouponsRaw(): Promise<runtime.ApiResponse<Array<MyCouponVm>>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/UserCoupons/MyCoupons`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(MyCouponVmFromJSON));
    }

    /**
     * Returns a coupon list that contains up to 8 coupons for the user for today
     * Returns the coupons generated for the user
     */
    async getMyUserCoupons(): Promise<Array<MyCouponVm>> {
        const response = await this.getMyUserCouponsRaw();
        return await response.value();
    }

}