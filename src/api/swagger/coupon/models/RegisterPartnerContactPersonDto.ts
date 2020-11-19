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
 * @interface RegisterPartnerContactPersonDto
 */
export interface RegisterPartnerContactPersonDto {
    /**
     * 
     * @type {string}
     * @memberof RegisterPartnerContactPersonDto
     */
    name?: string | null;
    /**
     * 
     * @type {string}
     * @memberof RegisterPartnerContactPersonDto
     */
    email?: string | null;
    /**
     * 
     * @type {string}
     * @memberof RegisterPartnerContactPersonDto
     */
    phone?: string | null;
    /**
     * 
     * @type {string}
     * @memberof RegisterPartnerContactPersonDto
     */
    password?: string | null;
}

export function RegisterPartnerContactPersonDtoFromJSON(json: any): RegisterPartnerContactPersonDto {
    return RegisterPartnerContactPersonDtoFromJSONTyped(json, false);
}

export function RegisterPartnerContactPersonDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): RegisterPartnerContactPersonDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': !exists(json, 'name') ? undefined : json['name'],
        'email': !exists(json, 'email') ? undefined : json['email'],
        'phone': !exists(json, 'phone') ? undefined : json['phone'],
        'password': !exists(json, 'password') ? undefined : json['password'],
    };
}

export function RegisterPartnerContactPersonDtoToJSON(value?: RegisterPartnerContactPersonDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'email': value.email,
        'phone': value.phone,
        'password': value.password,
    };
}


