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
/**
 * 
 * @export
 * @interface MyCouponVm
 */
export interface MyCouponVm {
    /**
     * 
     * @type {number}
     * @memberof MyCouponVm
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof MyCouponVm
     */
    name?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof MyCouponVm
     */
    expireDate?: Date;
    /**
     * 
     * @type {string}
     * @memberof MyCouponVm
     */
    description?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof MyCouponVm
     */
    isClaimed?: boolean;
}

export function MyCouponVmFromJSON(json: any): MyCouponVm {
    return MyCouponVmFromJSONTyped(json, false);
}

export function MyCouponVmFromJSONTyped(json: any, ignoreDiscriminator: boolean): MyCouponVm {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'expireDate': !exists(json, 'expireDate') ? undefined : (new Date(json['expireDate'])),
        'description': !exists(json, 'description') ? undefined : json['description'],
        'isClaimed': !exists(json, 'isClaimed') ? undefined : json['isClaimed'],
    };
}

export function MyCouponVmToJSON(value?: MyCouponVm | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'expireDate': value.expireDate === undefined ? undefined : (value.expireDate.toISOString()),
        'description': value.description,
        'isClaimed': value.isClaimed,
    };
}


