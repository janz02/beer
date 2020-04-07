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
    CouponCommentVm,
    CouponCommentVmFromJSON,
    CouponCommentVmFromJSONTyped,
    CouponCommentVmToJSON,
    CouponDiscountType,
    CouponDiscountTypeFromJSON,
    CouponDiscountTypeFromJSONTyped,
    CouponDiscountTypeToJSON,
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
 * @interface CouponVm
 */
export interface CouponVm {
    /**
     * 
     * @type {number}
     * @memberof CouponVm
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof CouponVm
     */
    name?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CouponVm
     */
    description?: string | null;
    /**
     * 
     * @type {CouponRank}
     * @memberof CouponVm
     */
    rank?: CouponRank;
    /**
     * 
     * @type {CouponType}
     * @memberof CouponVm
     */
    type?: CouponType;
    /**
     * 
     * @type {CouponState}
     * @memberof CouponVm
     */
    state?: CouponState;
    /**
     * 
     * @type {Date}
     * @memberof CouponVm
     */
    startDate?: Date;
    /**
     * 
     * @type {Date}
     * @memberof CouponVm
     */
    endDate?: Date;
    /**
     * 
     * @type {Date}
     * @memberof CouponVm
     */
    expireDate?: Date | null;
    /**
     * 
     * @type {number}
     * @memberof CouponVm
     */
    couponCount?: number;
    /**
     * 
     * @type {number}
     * @memberof CouponVm
     */
    minimumShoppingValue?: number | null;
    /**
     * 
     * @type {CouponDiscountType}
     * @memberof CouponVm
     */
    discountType?: CouponDiscountType;
    /**
     * 
     * @type {number}
     * @memberof CouponVm
     */
    discountValue?: number | null;
    /**
     * 
     * @type {number}
     * @memberof CouponVm
     */
    categoryId?: number;
    /**
     * 
     * @type {Array<number>}
     * @memberof CouponVm
     */
    tags?: Array<number> | null;
    /**
     * 
     * @type {Array<CouponCommentVm>}
     * @memberof CouponVm
     */
    comments?: Array<CouponCommentVm> | null;
    /**
     * 
     * @type {string}
     * @memberof CouponVm
     */
    predefinedCodesFileId?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CouponVm
     */
    createdBy?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof CouponVm
     */
    createdDate?: Date | null;
    /**
     * 
     * @type {string}
     * @memberof CouponVm
     */
    modifiedBy?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof CouponVm
     */
    modifiedDate?: Date | null;
    /**
     * 
     * @type {string}
     * @memberof CouponVm
     */
    approvedBy?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof CouponVm
     */
    approvedDate?: Date | null;
    /**
     * 
     * @type {string}
     * @memberof CouponVm
     */
    bigPictureId?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CouponVm
     */
    smallPictureId?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof CouponVm
     */
    isActive?: boolean;
    /**
     * 
     * @type {string}
     * @memberof CouponVm
     */
    smallPicture?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CouponVm
     */
    bigPicture?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CouponVm
     */
    onlineClaimLink?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CouponVm
     */
    productDetails?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof CouponVm
     */
    drawDate?: Date | null;
    /**
     * 
     * @type {string}
     * @memberof CouponVm
     */
    prizeRulesFileId?: string | null;
    /**
     * 
     * @type {number}
     * @memberof CouponVm
     */
    itemPrice?: number | null;
    /**
     * 
     * @type {number}
     * @memberof CouponVm
     */
    previousYearAverageBasketValue?: number | null;
    /**
     * 
     * @type {boolean}
     * @memberof CouponVm
     */
    awardedCampaign?: boolean;
    /**
     * 
     * @type {CouponMode}
     * @memberof CouponVm
     */
    mode?: CouponMode;
    /**
     * 
     * @type {number}
     * @memberof CouponVm
     */
    partnerId?: number;
    /**
     * 
     * @type {number}
     * @memberof CouponVm
     */
    showCount?: number;
    /**
     * 
     * @type {number}
     * @memberof CouponVm
     */
    clickCount?: number;
    /**
     * 
     * @type {number}
     * @memberof CouponVm
     */
    claimCount?: number;
    /**
     * 
     * @type {number}
     * @memberof CouponVm
     */
    discardCount?: number;
    /**
     * 
     * @type {boolean}
     * @memberof CouponVm
     */
    isPartnerActive?: boolean;
    /**
     * 
     * @type {number}
     * @memberof CouponVm
     */
    prizeValue?: number | null;
}

export function CouponVmFromJSON(json: any): CouponVm {
    return CouponVmFromJSONTyped(json, false);
}

export function CouponVmFromJSONTyped(json: any, ignoreDiscriminator: boolean): CouponVm {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'rank': !exists(json, 'rank') ? undefined : CouponRankFromJSON(json['rank']),
        'type': !exists(json, 'type') ? undefined : CouponTypeFromJSON(json['type']),
        'state': !exists(json, 'state') ? undefined : CouponStateFromJSON(json['state']),
        'startDate': !exists(json, 'startDate') ? undefined : (new Date(json['startDate'])),
        'endDate': !exists(json, 'endDate') ? undefined : (new Date(json['endDate'])),
        'expireDate': !exists(json, 'expireDate') ? undefined : (json['expireDate'] === null ? null : new Date(json['expireDate'])),
        'couponCount': !exists(json, 'couponCount') ? undefined : json['couponCount'],
        'minimumShoppingValue': !exists(json, 'minimumShoppingValue') ? undefined : json['minimumShoppingValue'],
        'discountType': !exists(json, 'discountType') ? undefined : CouponDiscountTypeFromJSON(json['discountType']),
        'discountValue': !exists(json, 'discountValue') ? undefined : json['discountValue'],
        'categoryId': !exists(json, 'categoryId') ? undefined : json['categoryId'],
        'tags': !exists(json, 'tags') ? undefined : json['tags'],
        'comments': !exists(json, 'comments') ? undefined : (json['comments'] === null ? null : (json['comments'] as Array<any>).map(CouponCommentVmFromJSON)),
        'predefinedCodesFileId': !exists(json, 'predefinedCodesFileId') ? undefined : json['predefinedCodesFileId'],
        'createdBy': !exists(json, 'createdBy') ? undefined : json['createdBy'],
        'createdDate': !exists(json, 'createdDate') ? undefined : (json['createdDate'] === null ? null : new Date(json['createdDate'])),
        'modifiedBy': !exists(json, 'modifiedBy') ? undefined : json['modifiedBy'],
        'modifiedDate': !exists(json, 'modifiedDate') ? undefined : (json['modifiedDate'] === null ? null : new Date(json['modifiedDate'])),
        'approvedBy': !exists(json, 'approvedBy') ? undefined : json['approvedBy'],
        'approvedDate': !exists(json, 'approvedDate') ? undefined : (json['approvedDate'] === null ? null : new Date(json['approvedDate'])),
        'bigPictureId': !exists(json, 'bigPictureId') ? undefined : json['bigPictureId'],
        'smallPictureId': !exists(json, 'smallPictureId') ? undefined : json['smallPictureId'],
        'isActive': !exists(json, 'isActive') ? undefined : json['isActive'],
        'smallPicture': !exists(json, 'smallPicture') ? undefined : json['smallPicture'],
        'bigPicture': !exists(json, 'bigPicture') ? undefined : json['bigPicture'],
        'onlineClaimLink': !exists(json, 'onlineClaimLink') ? undefined : json['onlineClaimLink'],
        'productDetails': !exists(json, 'productDetails') ? undefined : json['productDetails'],
        'drawDate': !exists(json, 'drawDate') ? undefined : (json['drawDate'] === null ? null : new Date(json['drawDate'])),
        'prizeRulesFileId': !exists(json, 'prizeRulesFileId') ? undefined : json['prizeRulesFileId'],
        'itemPrice': !exists(json, 'itemPrice') ? undefined : json['itemPrice'],
        'previousYearAverageBasketValue': !exists(json, 'previousYearAverageBasketValue') ? undefined : json['previousYearAverageBasketValue'],
        'awardedCampaign': !exists(json, 'awardedCampaign') ? undefined : json['awardedCampaign'],
        'mode': !exists(json, 'mode') ? undefined : CouponModeFromJSON(json['mode']),
        'partnerId': !exists(json, 'partnerId') ? undefined : json['partnerId'],
        'showCount': !exists(json, 'showCount') ? undefined : json['showCount'],
        'clickCount': !exists(json, 'clickCount') ? undefined : json['clickCount'],
        'claimCount': !exists(json, 'claimCount') ? undefined : json['claimCount'],
        'discardCount': !exists(json, 'discardCount') ? undefined : json['discardCount'],
        'isPartnerActive': !exists(json, 'isPartnerActive') ? undefined : json['isPartnerActive'],
        'prizeValue': !exists(json, 'prizeValue') ? undefined : json['prizeValue'],
    };
}

export function CouponVmToJSON(value?: CouponVm | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'description': value.description,
        'rank': CouponRankToJSON(value.rank),
        'type': CouponTypeToJSON(value.type),
        'state': CouponStateToJSON(value.state),
        'startDate': value.startDate === undefined ? undefined : (value.startDate.toISOString()),
        'endDate': value.endDate === undefined ? undefined : (value.endDate.toISOString()),
        'expireDate': value.expireDate === undefined ? undefined : (value.expireDate === null ? null : value.expireDate.toISOString()),
        'couponCount': value.couponCount,
        'minimumShoppingValue': value.minimumShoppingValue,
        'discountType': CouponDiscountTypeToJSON(value.discountType),
        'discountValue': value.discountValue,
        'categoryId': value.categoryId,
        'tags': value.tags,
        'comments': value.comments === undefined ? undefined : (value.comments === null ? null : (value.comments as Array<any>).map(CouponCommentVmToJSON)),
        'predefinedCodesFileId': value.predefinedCodesFileId,
        'createdBy': value.createdBy,
        'createdDate': value.createdDate === undefined ? undefined : (value.createdDate === null ? null : value.createdDate.toISOString()),
        'modifiedBy': value.modifiedBy,
        'modifiedDate': value.modifiedDate === undefined ? undefined : (value.modifiedDate === null ? null : value.modifiedDate.toISOString()),
        'approvedBy': value.approvedBy,
        'approvedDate': value.approvedDate === undefined ? undefined : (value.approvedDate === null ? null : value.approvedDate.toISOString()),
        'bigPictureId': value.bigPictureId,
        'smallPictureId': value.smallPictureId,
        'isActive': value.isActive,
        'smallPicture': value.smallPicture,
        'bigPicture': value.bigPicture,
        'onlineClaimLink': value.onlineClaimLink,
        'productDetails': value.productDetails,
        'drawDate': value.drawDate === undefined ? undefined : (value.drawDate === null ? null : value.drawDate.toISOString()),
        'prizeRulesFileId': value.prizeRulesFileId,
        'itemPrice': value.itemPrice,
        'previousYearAverageBasketValue': value.previousYearAverageBasketValue,
        'awardedCampaign': value.awardedCampaign,
        'mode': CouponModeToJSON(value.mode),
        'partnerId': value.partnerId,
        'showCount': value.showCount,
        'clickCount': value.clickCount,
        'claimCount': value.claimCount,
        'discardCount': value.discardCount,
        'isPartnerActive': value.isPartnerActive,
        'prizeValue': value.prizeValue,
    };
}


