/* tslint:disable */
/* eslint-disable */
/**
 * Optima Coupon
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
export enum CouponDiscountType {
    FixValue = 'FixValue',
    PercentValue = 'PercentValue'
}

export function CouponDiscountTypeFromJSON(json: any): CouponDiscountType {
    return CouponDiscountTypeFromJSONTyped(json, false);
}

export function CouponDiscountTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): CouponDiscountType {
    return json as CouponDiscountType;
}

export function CouponDiscountTypeToJSON(value?: CouponDiscountType | null): any {
    return value as any;
}

