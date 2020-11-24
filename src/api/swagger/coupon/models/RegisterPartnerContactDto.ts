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
 * @interface RegisterPartnerContactDto
 */
export interface RegisterPartnerContactDto {
    /**
     * 
     * @type {string}
     * @memberof RegisterPartnerContactDto
     */
    fullName?: string | null;
    /**
     * 
     * @type {string}
     * @memberof RegisterPartnerContactDto
     */
    email?: string | null;
    /**
     * 
     * @type {string}
     * @memberof RegisterPartnerContactDto
     */
    password?: string | null;
    /**
     * 
     * @type {string}
     * @memberof RegisterPartnerContactDto
     */
    phone?: string | null;
    /**
     * 
     * @type {string}
     * @memberof RegisterPartnerContactDto
     */
    code?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof RegisterPartnerContactDto
     */
    acceptUserAgreements?: boolean;
}

export function RegisterPartnerContactDtoFromJSON(json: any): RegisterPartnerContactDto {
    return RegisterPartnerContactDtoFromJSONTyped(json, false);
}

export function RegisterPartnerContactDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): RegisterPartnerContactDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'fullName': !exists(json, 'fullName') ? undefined : json['fullName'],
        'email': !exists(json, 'email') ? undefined : json['email'],
        'password': !exists(json, 'password') ? undefined : json['password'],
        'phone': !exists(json, 'phone') ? undefined : json['phone'],
        'code': !exists(json, 'code') ? undefined : json['code'],
        'acceptUserAgreements': !exists(json, 'acceptUserAgreements') ? undefined : json['acceptUserAgreements'],
    };
}

export function RegisterPartnerContactDtoToJSON(value?: RegisterPartnerContactDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'fullName': value.fullName,
        'email': value.email,
        'password': value.password,
        'phone': value.phone,
        'code': value.code,
        'acceptUserAgreements': value.acceptUserAgreements,
    };
}


