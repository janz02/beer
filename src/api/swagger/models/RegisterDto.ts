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
/**
 * 
 * @export
 * @interface RegisterDto
 */
export interface RegisterDto {
    /**
     * 
     * @type {string}
     * @memberof RegisterDto
     */
    email?: string | null;
    /**
     * 
     * @type {string}
     * @memberof RegisterDto
     */
    password?: string | null;
    /**
     * 
     * @type {string}
     * @memberof RegisterDto
     */
    partnerName?: string | null;
    /**
     * 
     * @type {string}
     * @memberof RegisterDto
     */
    fullName?: string | null;
    /**
     * 
     * @type {number}
     * @memberof RegisterDto
     */
    phone?: number;
}

export function RegisterDtoFromJSON(json: any): RegisterDto {
    return RegisterDtoFromJSONTyped(json, false);
}

export function RegisterDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): RegisterDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'email': !exists(json, 'email') ? undefined : json['email'],
        'password': !exists(json, 'password') ? undefined : json['password'],
        'partnerName': !exists(json, 'partnerName') ? undefined : json['partnerName'],
        'fullName': !exists(json, 'fullName') ? undefined : json['fullName'],
        'phone': !exists(json, 'phone') ? undefined : json['phone'],
    };
}

export function RegisterDtoToJSON(value?: RegisterDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'email': value.email,
        'password': value.password,
        'partnerName': value.partnerName,
        'fullName': value.fullName,
        'phone': value.phone,
    };
}


