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
 * @interface SystemParameterVm
 */
export interface SystemParameterVm {
    /**
     * 
     * @type {string}
     * @memberof SystemParameterVm
     */
    key?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SystemParameterVm
     */
    value?: string | null;
}

export function SystemParameterVmFromJSON(json: any): SystemParameterVm {
    return SystemParameterVmFromJSONTyped(json, false);
}

export function SystemParameterVmFromJSONTyped(json: any, ignoreDiscriminator: boolean): SystemParameterVm {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'key': !exists(json, 'key') ? undefined : json['key'],
        'value': !exists(json, 'value') ? undefined : json['value'],
    };
}

export function SystemParameterVmToJSON(value?: SystemParameterVm | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'key': value.key,
        'value': value.value,
    };
}


