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
import {
    SegmentVm,
    SegmentVmFromJSON,
    SegmentVmFromJSONTyped,
    SegmentVmToJSON,
} from './';

/**
 * 
 * @export
 * @interface SegmentVmPaginatedResponse
 */
export interface SegmentVmPaginatedResponse {
    /**
     * 
     * @type {Array<SegmentVm>}
     * @memberof SegmentVmPaginatedResponse
     */
    result?: Array<SegmentVm> | null;
    /**
     * 
     * @type {number}
     * @memberof SegmentVmPaginatedResponse
     */
    page?: number;
    /**
     * 
     * @type {number}
     * @memberof SegmentVmPaginatedResponse
     */
    from?: number;
    /**
     * 
     * @type {number}
     * @memberof SegmentVmPaginatedResponse
     */
    to?: number;
    /**
     * 
     * @type {number}
     * @memberof SegmentVmPaginatedResponse
     */
    size?: number;
}

export function SegmentVmPaginatedResponseFromJSON(json: any): SegmentVmPaginatedResponse {
    return SegmentVmPaginatedResponseFromJSONTyped(json, false);
}

export function SegmentVmPaginatedResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): SegmentVmPaginatedResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'result': !exists(json, 'result') ? undefined : (json['result'] === null ? null : (json['result'] as Array<any>).map(SegmentVmFromJSON)),
        'page': !exists(json, 'page') ? undefined : json['page'],
        'from': !exists(json, 'from') ? undefined : json['from'],
        'to': !exists(json, 'to') ? undefined : json['to'],
        'size': !exists(json, 'size') ? undefined : json['size'],
    };
}

export function SegmentVmPaginatedResponseToJSON(value?: SegmentVmPaginatedResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'result': value.result === undefined ? undefined : (value.result === null ? null : (value.result as Array<any>).map(SegmentVmToJSON)),
        'page': value.page,
        'from': value.from,
        'to': value.to,
        'size': value.size,
    };
}


