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
 * @interface SystemParameterDto
 */
export interface SystemParameterDto {
    /**
     * 
     * @type {string}
     * @memberof SystemParameterDto
     */
    value?: string | null;
}

export function SystemParameterDtoFromJSON(json: any): SystemParameterDto {
    return SystemParameterDtoFromJSONTyped(json, false);
}

export function SystemParameterDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): SystemParameterDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'value': !exists(json, 'value') ? undefined : json['value'],
    };
}

export function SystemParameterDtoToJSON(value?: SystemParameterDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'value': value.value,
    };
}


