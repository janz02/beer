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
    CouponCommentDto,
    CouponCommentDtoFromJSON,
    CouponCommentDtoToJSON,
    CouponCommentVm,
    CouponCommentVmFromJSON,
    CouponCommentVmToJSON,
} from '../models';

export interface AddCouponCommentRequest {
    couponId: number;
    couponCommentDto?: CouponCommentDto;
}

export interface DeleteCouponCommentRequest {
    couponId: number;
    commentId: number;
}

export interface GetCouponCommentsRequest {
    couponId: number;
}

/**
 * no description
 */
export class CouponCommentsApi extends runtime.BaseAPI {

    /**
     * Appends a comment with details of \"comment\" to a coupon with an Id of \"couponId\"
     * Adds a comment to a coupon
     */
    async addCouponCommentRaw(requestParameters: AddCouponCommentRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.couponId === null || requestParameters.couponId === undefined) {
            throw new runtime.RequiredError('couponId','Required parameter requestParameters.couponId was null or undefined when calling addCouponComment.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Coupon/{couponId}/Comment`.replace(`{${"couponId"}}`, encodeURIComponent(String(requestParameters.couponId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CouponCommentDtoToJSON(requestParameters.couponCommentDto),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Appends a comment with details of \"comment\" to a coupon with an Id of \"couponId\"
     * Adds a comment to a coupon
     */
    async addCouponComment(requestParameters: AddCouponCommentRequest): Promise<void> {
        await this.addCouponCommentRaw(requestParameters);
    }

    /**
     * Deletes the comment with an Id of \"commentId\" from a coupon with Id of \"couponId\"
     * Deletes a comment from a coupon
     */
    async deleteCouponCommentRaw(requestParameters: DeleteCouponCommentRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.couponId === null || requestParameters.couponId === undefined) {
            throw new runtime.RequiredError('couponId','Required parameter requestParameters.couponId was null or undefined when calling deleteCouponComment.');
        }

        if (requestParameters.commentId === null || requestParameters.commentId === undefined) {
            throw new runtime.RequiredError('commentId','Required parameter requestParameters.commentId was null or undefined when calling deleteCouponComment.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Coupon/{couponId}/Comment/{commentId}`.replace(`{${"couponId"}}`, encodeURIComponent(String(requestParameters.couponId))).replace(`{${"commentId"}}`, encodeURIComponent(String(requestParameters.commentId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Deletes the comment with an Id of \"commentId\" from a coupon with Id of \"couponId\"
     * Deletes a comment from a coupon
     */
    async deleteCouponComment(requestParameters: DeleteCouponCommentRequest): Promise<void> {
        await this.deleteCouponCommentRaw(requestParameters);
    }

    /**
     * Returns the comment list on the coupon with an Id of \"couponId\"
     * Gets the comments on a coupon
     */
    async getCouponCommentsRaw(requestParameters: GetCouponCommentsRequest): Promise<runtime.ApiResponse<Array<CouponCommentVm>>> {
        if (requestParameters.couponId === null || requestParameters.couponId === undefined) {
            throw new runtime.RequiredError('couponId','Required parameter requestParameters.couponId was null or undefined when calling getCouponComments.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Coupon/{couponId}/Comment`.replace(`{${"couponId"}}`, encodeURIComponent(String(requestParameters.couponId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(CouponCommentVmFromJSON));
    }

    /**
     * Returns the comment list on the coupon with an Id of \"couponId\"
     * Gets the comments on a coupon
     */
    async getCouponComments(requestParameters: GetCouponCommentsRequest): Promise<Array<CouponCommentVm>> {
        const response = await this.getCouponCommentsRaw(requestParameters);
        return await response.value();
    }

}
