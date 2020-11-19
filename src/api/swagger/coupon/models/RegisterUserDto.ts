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
 * @interface RegisterUserDto
 */
export interface RegisterUserDto {
    /**
     * 
     * @type {string}
     * @memberof RegisterUserDto
     */
    email?: string | null;
    /**
     * 
     * @type {string}
     * @memberof RegisterUserDto
     */
    password?: string | null;
    /**
     * 
     * @type {string}
     * @memberof RegisterUserDto
     */
    name?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof RegisterUserDto
     */
    dateOfBirth?: Date;
    /**
     * 
     * @type {string}
     * @memberof RegisterUserDto
     */
    placeOfBirth?: string | null;
    /**
     * 
     * @type {string}
     * @memberof RegisterUserDto
     */
    mothersMaidenName?: string | null;
    /**
     * 
     * @type {string}
     * @memberof RegisterUserDto
     */
    city?: string | null;
}

export function RegisterUserDtoFromJSON(json: any): RegisterUserDto {
    return RegisterUserDtoFromJSONTyped(json, false);
}

export function RegisterUserDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): RegisterUserDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'email': !exists(json, 'email') ? undefined : json['email'],
        'password': !exists(json, 'password') ? undefined : json['password'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'dateOfBirth': !exists(json, 'dateOfBirth') ? undefined : (new Date(json['dateOfBirth'])),
        'placeOfBirth': !exists(json, 'placeOfBirth') ? undefined : json['placeOfBirth'],
        'mothersMaidenName': !exists(json, 'mothersMaidenName') ? undefined : json['mothersMaidenName'],
        'city': !exists(json, 'city') ? undefined : json['city'],
    };
}

export function RegisterUserDtoToJSON(value?: RegisterUserDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'email': value.email,
        'password': value.password,
        'name': value.name,
        'dateOfBirth': value.dateOfBirth === undefined ? undefined : (value.dateOfBirth.toISOString()),
        'placeOfBirth': value.placeOfBirth,
        'mothersMaidenName': value.mothersMaidenName,
        'city': value.city,
    };
}


