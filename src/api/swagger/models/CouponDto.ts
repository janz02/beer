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
    CouponMode,
    CouponModeFromJSON,
    CouponModeFromJSONTyped,
    CouponModeToJSON,
    CouponRank,
    CouponRankFromJSON,
    CouponRankFromJSONTyped,
    CouponRankToJSON,
    CouponState,
    CouponStateFromJSON,
    CouponStateFromJSONTyped,
    CouponStateToJSON,
    CouponType,
    CouponTypeFromJSON,
    CouponTypeFromJSONTyped,
    CouponTypeToJSON,
} from './';

/**
 * 
 * @export
 * @interface CouponDto
 */
export interface CouponDto {
    /**
     * 
     * @type {string}
     * @memberof CouponDto
     */
    name?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CouponDto
     */
    description?: string | null;
    /**
     * 
     * @type {CouponRank}
     * @memberof CouponDto
     */
    rank?: CouponRank;
    /**
     * 
     * @type {CouponType}
     * @memberof CouponDto
     */
    type?: CouponType;
    /**
     * 
     * @type {CouponState}
     * @memberof CouponDto
     */
    state?: CouponState;
    /**
     * 
     * @type {Date}
     * @memberof CouponDto
     */
    startDate?: Date;
    /**
     * 
     * @type {Date}
     * @memberof CouponDto
     */
    endDate?: Date;
    /**
     * 
     * @type {Date}
     * @memberof CouponDto
     */
    expireDate?: Date;
    /**
     * 
     * @type {number}
     * @memberof CouponDto
     */
    couponCount?: number;
    /**
     * 
     * @type {number}
     * @memberof CouponDto
     */
    minimumShoppingValue?: number;
    /**
     * 
     * @type {number}
     * @memberof CouponDto
     */
    discountValue?: number;
    /**
     * 
     * @type {number}
     * @memberof CouponDto
     */
    categoryId?: number;
    /**
     * 
     * @type {Array<number>}
     * @memberof CouponDto
     */
    tags?: Array<number> | null;
    /**
     * 
     * @type {CouponMode}
     * @memberof CouponDto
     */
    mode?: CouponMode;
    /**
     * 
     * @type {string}
     * @memberof CouponDto
     */
    predefinedCodesFileId?: string | null;
}

export function CouponDtoFromJSON(json: any): CouponDto {
    return CouponDtoFromJSONTyped(json, false);
}

export function CouponDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): CouponDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': !exists(json, 'name') ? undefined : json['name'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'rank': !exists(json, 'rank') ? undefined : CouponRankFromJSON(json['rank']),
        'type': !exists(json, 'type') ? undefined : CouponTypeFromJSON(json['type']),
        'state': !exists(json, 'state') ? undefined : CouponStateFromJSON(json['state']),
        'startDate': !exists(json, 'startDate') ? undefined : (new Date(json['startDate'])),
        'endDate': !exists(json, 'endDate') ? undefined : (new Date(json['endDate'])),
        'expireDate': !exists(json, 'expireDate') ? undefined : (new Date(json['expireDate'])),
        'couponCount': !exists(json, 'couponCount') ? undefined : json['couponCount'],
        'minimumShoppingValue': !exists(json, 'minimumShoppingValue') ? undefined : json['minimumShoppingValue'],
        'discountValue': !exists(json, 'discountValue') ? undefined : json['discountValue'],
        'categoryId': !exists(json, 'categoryId') ? undefined : json['categoryId'],
        'tags': !exists(json, 'tags') ? undefined : json['tags'],
        'mode': !exists(json, 'mode') ? undefined : CouponModeFromJSON(json['mode']),
        'predefinedCodesFileId': !exists(json, 'predefinedCodesFileId') ? undefined : json['predefinedCodesFileId'],
    };
}

export function CouponDtoToJSON(value?: CouponDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'description': value.description,
        'rank': CouponRankToJSON(value.rank),
        'type': CouponTypeToJSON(value.type),
        'state': CouponStateToJSON(value.state),
        'startDate': value.startDate === undefined ? undefined : (value.startDate.toISOString()),
        'endDate': value.endDate === undefined ? undefined : (value.endDate.toISOString()),
        'expireDate': value.expireDate === undefined ? undefined : (value.expireDate.toISOString()),
        'couponCount': value.couponCount,
        'minimumShoppingValue': value.minimumShoppingValue,
        'discountValue': value.discountValue,
        'categoryId': value.categoryId,
        'tags': value.tags,
        'mode': CouponModeToJSON(value.mode),
        'predefinedCodesFileId': value.predefinedCodesFileId,
    };
}


