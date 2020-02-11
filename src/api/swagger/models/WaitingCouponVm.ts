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
    CouponState,
    CouponStateFromJSON,
    CouponStateFromJSONTyped,
    CouponStateToJSON,
} from './';

/**
 * 
 * @export
 * @interface WaitingCouponVm
 */
export interface WaitingCouponVm {
    /**
     * 
     * @type {number}
     * @memberof WaitingCouponVm
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof WaitingCouponVm
     */
    name?: string | null;
    /**
     * 
     * @type {CouponState}
     * @memberof WaitingCouponVm
     */
    state?: CouponState;
    /**
     * 
     * @type {number}
     * @memberof WaitingCouponVm
     */
    categoryId?: number;
    /**
     * 
     * @type {Date}
     * @memberof WaitingCouponVm
     */
    startDate?: Date;
    /**
     * 
     * @type {Date}
     * @memberof WaitingCouponVm
     */
    endDate?: Date;
    /**
     * 
     * @type {Date}
     * @memberof WaitingCouponVm
     */
    expireDate?: Date;
}

export function WaitingCouponVmFromJSON(json: any): WaitingCouponVm {
    return WaitingCouponVmFromJSONTyped(json, false);
}

export function WaitingCouponVmFromJSONTyped(json: any, ignoreDiscriminator: boolean): WaitingCouponVm {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'state': !exists(json, 'state') ? undefined : CouponStateFromJSON(json['state']),
        'categoryId': !exists(json, 'categoryId') ? undefined : json['categoryId'],
        'startDate': !exists(json, 'startDate') ? undefined : (new Date(json['startDate'])),
        'endDate': !exists(json, 'endDate') ? undefined : (new Date(json['endDate'])),
        'expireDate': !exists(json, 'expireDate') ? undefined : (new Date(json['expireDate'])),
    };
}

export function WaitingCouponVmToJSON(value?: WaitingCouponVm | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'state': CouponStateToJSON(value.state),
        'categoryId': value.categoryId,
        'startDate': value.startDate === undefined ? undefined : (value.startDate.toISOString()),
        'endDate': value.endDate === undefined ? undefined : (value.endDate.toISOString()),
        'expireDate': value.expireDate === undefined ? undefined : (value.expireDate.toISOString()),
    };
}


