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
 * @interface ServiceInfo
 */
export interface ServiceInfo {
    /**
     * 
     * @type {string}
     * @memberof ServiceInfo
     */
    serviceName?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ServiceInfo
     */
    version?: string | null;
    /**
     * 
     * @type {Array<ServiceInfo>}
     * @memberof ServiceInfo
     */
    externalServices?: Array<ServiceInfo> | null;
}

export function ServiceInfoFromJSON(json: any): ServiceInfo {
    return ServiceInfoFromJSONTyped(json, false);
}

export function ServiceInfoFromJSONTyped(json: any, ignoreDiscriminator: boolean): ServiceInfo {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'serviceName': !exists(json, 'serviceName') ? undefined : json['serviceName'],
        'version': !exists(json, 'version') ? undefined : json['version'],
        'externalServices': !exists(json, 'externalServices') ? undefined : (json['externalServices'] === null ? null : (json['externalServices'] as Array<any>).map(ServiceInfoFromJSON)),
    };
}

export function ServiceInfoToJSON(value?: ServiceInfo | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'serviceName': value.serviceName,
        'version': value.version,
        'externalServices': value.externalServices === undefined ? undefined : (value.externalServices === null ? null : (value.externalServices as Array<any>).map(ServiceInfoToJSON)),
    };
}


