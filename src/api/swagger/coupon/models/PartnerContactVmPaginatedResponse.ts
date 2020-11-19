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
import {
    PartnerContactVm,
    PartnerContactVmFromJSON,
    PartnerContactVmFromJSONTyped,
    PartnerContactVmToJSON,
} from './';

/**
 * 
 * @export
 * @interface PartnerContactVmPaginatedResponse
 */
export interface PartnerContactVmPaginatedResponse {
    /**
     * 
     * @type {Array<PartnerContactVm>}
     * @memberof PartnerContactVmPaginatedResponse
     */
    result?: Array<PartnerContactVm> | null;
    /**
     * 
     * @type {number}
     * @memberof PartnerContactVmPaginatedResponse
     */
    page?: number;
    /**
     * 
     * @type {number}
     * @memberof PartnerContactVmPaginatedResponse
     */
    from?: number;
    /**
     * 
     * @type {number}
     * @memberof PartnerContactVmPaginatedResponse
     */
    to?: number;
    /**
     * 
     * @type {number}
     * @memberof PartnerContactVmPaginatedResponse
     */
    size?: number;
}

export function PartnerContactVmPaginatedResponseFromJSON(json: any): PartnerContactVmPaginatedResponse {
    return PartnerContactVmPaginatedResponseFromJSONTyped(json, false);
}

export function PartnerContactVmPaginatedResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): PartnerContactVmPaginatedResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'result': !exists(json, 'result') ? undefined : (json['result'] === null ? null : (json['result'] as Array<any>).map(PartnerContactVmFromJSON)),
        'page': !exists(json, 'page') ? undefined : json['page'],
        'from': !exists(json, 'from') ? undefined : json['from'],
        'to': !exists(json, 'to') ? undefined : json['to'],
        'size': !exists(json, 'size') ? undefined : json['size'],
    };
}

export function PartnerContactVmPaginatedResponseToJSON(value?: PartnerContactVmPaginatedResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'result': value.result === undefined ? undefined : (value.result === null ? null : (value.result as Array<any>).map(PartnerContactVmToJSON)),
        'page': value.page,
        'from': value.from,
        'to': value.to,
        'size': value.size,
    };
}


