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

import { exists, mapValues } from '../runtime';
import {
    CouponVm,
    CouponVmFromJSON,
    CouponVmFromJSONTyped,
    CouponVmToJSON,
} from './';

/**
 * 
 * @export
 * @interface CouponVmPaginatedResponse
 */
export interface CouponVmPaginatedResponse {
    /**
     * 
     * @type {Array<CouponVm>}
     * @memberof CouponVmPaginatedResponse
     */
    result?: Array<CouponVm> | null;
    /**
     * 
     * @type {number}
     * @memberof CouponVmPaginatedResponse
     */
    page?: number;
    /**
     * 
     * @type {number}
     * @memberof CouponVmPaginatedResponse
     */
    from?: number;
    /**
     * 
     * @type {number}
     * @memberof CouponVmPaginatedResponse
     */
    to?: number;
    /**
     * 
     * @type {number}
     * @memberof CouponVmPaginatedResponse
     */
    size?: number;
}

export function CouponVmPaginatedResponseFromJSON(json: any): CouponVmPaginatedResponse {
    return CouponVmPaginatedResponseFromJSONTyped(json, false);
}

export function CouponVmPaginatedResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): CouponVmPaginatedResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'result': !exists(json, 'result') ? undefined : (json['result'] === null ? null : (json['result'] as Array<any>).map(CouponVmFromJSON)),
        'page': !exists(json, 'page') ? undefined : json['page'],
        'from': !exists(json, 'from') ? undefined : json['from'],
        'to': !exists(json, 'to') ? undefined : json['to'],
        'size': !exists(json, 'size') ? undefined : json['size'],
    };
}

export function CouponVmPaginatedResponseToJSON(value?: CouponVmPaginatedResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'result': value.result === undefined ? undefined : (value.result === null ? null : (value.result as Array<any>).map(CouponVmToJSON)),
        'page': value.page,
        'from': value.from,
        'to': value.to,
        'size': value.size,
    };
}


