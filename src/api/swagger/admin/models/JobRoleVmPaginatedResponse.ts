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
    JobRoleVm,
    JobRoleVmFromJSON,
    JobRoleVmFromJSONTyped,
    JobRoleVmToJSON,
} from './';

/**
 * 
 * @export
 * @interface JobRoleVmPaginatedResponse
 */
export interface JobRoleVmPaginatedResponse {
    /**
     * 
     * @type {Array<JobRoleVm>}
     * @memberof JobRoleVmPaginatedResponse
     */
    result?: Array<JobRoleVm> | null;
    /**
     * 
     * @type {number}
     * @memberof JobRoleVmPaginatedResponse
     */
    page?: number;
    /**
     * 
     * @type {number}
     * @memberof JobRoleVmPaginatedResponse
     */
    from?: number;
    /**
     * 
     * @type {number}
     * @memberof JobRoleVmPaginatedResponse
     */
    to?: number;
    /**
     * 
     * @type {number}
     * @memberof JobRoleVmPaginatedResponse
     */
    size?: number;
}

export function JobRoleVmPaginatedResponseFromJSON(json: any): JobRoleVmPaginatedResponse {
    return JobRoleVmPaginatedResponseFromJSONTyped(json, false);
}

export function JobRoleVmPaginatedResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): JobRoleVmPaginatedResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'result': !exists(json, 'result') ? undefined : (json['result'] === null ? null : (json['result'] as Array<any>).map(JobRoleVmFromJSON)),
        'page': !exists(json, 'page') ? undefined : json['page'],
        'from': !exists(json, 'from') ? undefined : json['from'],
        'to': !exists(json, 'to') ? undefined : json['to'],
        'size': !exists(json, 'size') ? undefined : json['size'],
    };
}

export function JobRoleVmPaginatedResponseToJSON(value?: JobRoleVmPaginatedResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'result': value.result === undefined ? undefined : (value.result === null ? null : (value.result as Array<any>).map(JobRoleVmToJSON)),
        'page': value.page,
        'from': value.from,
        'to': value.to,
        'size': value.size,
    };
}


