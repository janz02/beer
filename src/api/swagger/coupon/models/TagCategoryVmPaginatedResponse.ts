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
    TagCategoryVm,
    TagCategoryVmFromJSON,
    TagCategoryVmFromJSONTyped,
    TagCategoryVmToJSON,
} from './';

/**
 * 
 * @export
 * @interface TagCategoryVmPaginatedResponse
 */
export interface TagCategoryVmPaginatedResponse {
    /**
     * 
     * @type {Array<TagCategoryVm>}
     * @memberof TagCategoryVmPaginatedResponse
     */
    result?: Array<TagCategoryVm> | null;
    /**
     * 
     * @type {number}
     * @memberof TagCategoryVmPaginatedResponse
     */
    page?: number;
    /**
     * 
     * @type {number}
     * @memberof TagCategoryVmPaginatedResponse
     */
    from?: number;
    /**
     * 
     * @type {number}
     * @memberof TagCategoryVmPaginatedResponse
     */
    to?: number;
    /**
     * 
     * @type {number}
     * @memberof TagCategoryVmPaginatedResponse
     */
    size?: number;
}

export function TagCategoryVmPaginatedResponseFromJSON(json: any): TagCategoryVmPaginatedResponse {
    return TagCategoryVmPaginatedResponseFromJSONTyped(json, false);
}

export function TagCategoryVmPaginatedResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): TagCategoryVmPaginatedResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'result': !exists(json, 'result') ? undefined : (json['result'] === null ? null : (json['result'] as Array<any>).map(TagCategoryVmFromJSON)),
        'page': !exists(json, 'page') ? undefined : json['page'],
        'from': !exists(json, 'from') ? undefined : json['from'],
        'to': !exists(json, 'to') ? undefined : json['to'],
        'size': !exists(json, 'size') ? undefined : json['size'],
    };
}

export function TagCategoryVmPaginatedResponseToJSON(value?: TagCategoryVmPaginatedResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'result': value.result === undefined ? undefined : (value.result === null ? null : (value.result as Array<any>).map(TagCategoryVmToJSON)),
        'page': value.page,
        'from': value.from,
        'to': value.to,
        'size': value.size,
    };
}

