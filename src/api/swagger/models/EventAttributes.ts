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
export enum EventAttributes {
    None = 'None',
    SpecialName = 'SpecialName',
    ReservedMask = 'ReservedMask',
    ReservedMask = 'ReservedMask'
}

export function EventAttributesFromJSON(json: any): EventAttributes {
    return EventAttributesFromJSONTyped(json, false);
}

export function EventAttributesFromJSONTyped(json: any, ignoreDiscriminator: boolean): EventAttributes {
    return json as EventAttributes;
}

export function EventAttributesToJSON(value?: EventAttributes | null): any {
    return value as any;
}

