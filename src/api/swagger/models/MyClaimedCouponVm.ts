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
 * @interface MyClaimedCouponVm
 */
export interface MyClaimedCouponVm {
    /**
     * 
     * @type {number}
     * @memberof MyClaimedCouponVm
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof MyClaimedCouponVm
     */
    name?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof MyClaimedCouponVm
     */
    expireDate?: Date;
    /**
     * 
     * @type {string}
     * @memberof MyClaimedCouponVm
     */
    couponCode?: string | null;
    /**
     * 
     * @type {string}
     * @memberof MyClaimedCouponVm
     */
    description?: string | null;
    /**
     * 
     * @type {string}
     * @memberof MyClaimedCouponVm
     */
    smallPictureId?: string | null;
    /**
     * 
     * @type {string}
     * @memberof MyClaimedCouponVm
     */
    bigPictureId?: string | null;
}

export function MyClaimedCouponVmFromJSON(json: any): MyClaimedCouponVm {
    return MyClaimedCouponVmFromJSONTyped(json, false);
}

export function MyClaimedCouponVmFromJSONTyped(json: any, ignoreDiscriminator: boolean): MyClaimedCouponVm {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'expireDate': !exists(json, 'expireDate') ? undefined : (new Date(json['expireDate'])),
        'couponCode': !exists(json, 'couponCode') ? undefined : json['couponCode'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'smallPictureId': !exists(json, 'smallPictureId') ? undefined : json['smallPictureId'],
        'bigPictureId': !exists(json, 'bigPictureId') ? undefined : json['bigPictureId'],
    };
}

export function MyClaimedCouponVmToJSON(value?: MyClaimedCouponVm | null): any {
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
        'couponCode': value.couponCode,
        'description': value.description,
        'smallPictureId': value.smallPictureId,
        'bigPictureId': value.bigPictureId,
    };
}


