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

/**
 * 
 * @export
 * @enum {string}
 */
export enum CouponRank {
    Basic = 'Basic',
    Standard = 'Standard',
    Super = 'Super',
    Premium = 'Premium'
}

export function CouponRankFromJSON(json: any): CouponRank {
    return CouponRankFromJSONTyped(json, false);
}

export function CouponRankFromJSONTyped(json: any, ignoreDiscriminator: boolean): CouponRank {
    return json as CouponRank;
}

export function CouponRankToJSON(value?: CouponRank | null): any {
    return value as any;
}
