/* tslint:disable */
/* eslint-disable */
/**
 * NKM PKN Coupon Api
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
export enum OrderByType {
    Ascending = 'Ascending',
    Descending = 'Descending'
}

export function OrderByTypeFromJSON(json: any): OrderByType {
    return OrderByTypeFromJSONTyped(json, false);
}

export function OrderByTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): OrderByType {
    return json as OrderByType;
}

export function OrderByTypeToJSON(value?: OrderByType | null): any {
    return value as any;
}

