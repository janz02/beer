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
export enum PartnerState {
    Inactive = 'Inactive',
    Active = 'Active',
    Deleted = 'Deleted'
}

export function PartnerStateFromJSON(json: any): PartnerState {
    return PartnerStateFromJSONTyped(json, false);
}

export function PartnerStateFromJSONTyped(json: any, ignoreDiscriminator: boolean): PartnerState {
    return json as PartnerState;
}

export function PartnerStateToJSON(value?: PartnerState | null): any {
    return value as any;
}

