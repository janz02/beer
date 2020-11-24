/* tslint:disable */
/* eslint-disable */
/**
 * Optima Admin
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
import {
    ProfileVm,
    ProfileVmFromJSON,
    ProfileVmFromJSONTyped,
    ProfileVmToJSON,
} from './';

/**
 * 
 * @export
 * @interface ProfileVmPaginatedResponse
 */
export interface ProfileVmPaginatedResponse {
    /**
     * 
     * @type {Array<ProfileVm>}
     * @memberof ProfileVmPaginatedResponse
     */
    result?: Array<ProfileVm> | null;
    /**
     * 
     * @type {number}
     * @memberof ProfileVmPaginatedResponse
     */
    page?: number;
    /**
     * 
     * @type {number}
     * @memberof ProfileVmPaginatedResponse
     */
    from?: number;
    /**
     * 
     * @type {number}
     * @memberof ProfileVmPaginatedResponse
     */
    to?: number;
    /**
     * 
     * @type {number}
     * @memberof ProfileVmPaginatedResponse
     */
    size?: number;
}

export function ProfileVmPaginatedResponseFromJSON(json: any): ProfileVmPaginatedResponse {
    return ProfileVmPaginatedResponseFromJSONTyped(json, false);
}

export function ProfileVmPaginatedResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ProfileVmPaginatedResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'result': !exists(json, 'result') ? undefined : (json['result'] === null ? null : (json['result'] as Array<any>).map(ProfileVmFromJSON)),
        'page': !exists(json, 'page') ? undefined : json['page'],
        'from': !exists(json, 'from') ? undefined : json['from'],
        'to': !exists(json, 'to') ? undefined : json['to'],
        'size': !exists(json, 'size') ? undefined : json['size'],
    };
}

export function ProfileVmPaginatedResponseToJSON(value?: ProfileVmPaginatedResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'result': value.result === undefined ? undefined : (value.result === null ? null : (value.result as Array<any>).map(ProfileVmToJSON)),
        'page': value.page,
        'from': value.from,
        'to': value.to,
        'size': value.size,
    };
}


