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
export enum Roles {
    Administrator = 'Administrator',
    CampaignManager = 'CampaignManager',
    PartnerManager = 'PartnerManager',
    BusinessPartnerManager = 'BusinessPartnerManager',
    PartnerContactApprover = 'PartnerContactApprover',
    PartnerContactEditor = 'PartnerContactEditor',
    User = 'User',
    ServiceAccount = 'ServiceAccount',
    KprServiceAccount = 'KprServiceAccount'
}

export function RolesFromJSON(json: any): Roles {
    return RolesFromJSONTyped(json, false);
}

export function RolesFromJSONTyped(json: any, ignoreDiscriminator: boolean): Roles {
    return json as Roles;
}

export function RolesToJSON(value?: Roles | null): any {
    return value as any;
}

