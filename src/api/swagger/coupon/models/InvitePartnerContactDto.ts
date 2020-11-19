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

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface InvitePartnerContactDto
 */
export interface InvitePartnerContactDto {
    /**
     * 
     * @type {string}
     * @memberof InvitePartnerContactDto
     */
    email?: string | null;
    /**
     * 
     * @type {number}
     * @memberof InvitePartnerContactDto
     */
    partnerId?: number;
}

export function InvitePartnerContactDtoFromJSON(json: any): InvitePartnerContactDto {
    return InvitePartnerContactDtoFromJSONTyped(json, false);
}

export function InvitePartnerContactDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): InvitePartnerContactDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'email': !exists(json, 'email') ? undefined : json['email'],
        'partnerId': !exists(json, 'partnerId') ? undefined : json['partnerId'],
    };
}

export function InvitePartnerContactDtoToJSON(value?: InvitePartnerContactDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'email': value.email,
        'partnerId': value.partnerId,
    };
}


