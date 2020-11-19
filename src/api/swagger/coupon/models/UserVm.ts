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
 * @interface UserVm
 */
export interface UserVm {
    /**
     * 
     * @type {string}
     * @memberof UserVm
     */
    jwtToken?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UserVm
     */
    refreshToken?: string | null;
}

export function UserVmFromJSON(json: any): UserVm {
    return UserVmFromJSONTyped(json, false);
}

export function UserVmFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserVm {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'jwtToken': !exists(json, 'jwtToken') ? undefined : json['jwtToken'],
        'refreshToken': !exists(json, 'refreshToken') ? undefined : json['refreshToken'],
    };
}

export function UserVmToJSON(value?: UserVm | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'jwtToken': value.jwtToken,
        'refreshToken': value.refreshToken,
    };
}


