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
 * @interface CategoryVm
 */
export interface CategoryVm {
    /**
     * 
     * @type {number}
     * @memberof CategoryVm
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof CategoryVm
     */
    name?: string | null;
}

export function CategoryVmFromJSON(json: any): CategoryVm {
    return CategoryVmFromJSONTyped(json, false);
}

export function CategoryVmFromJSONTyped(json: any, ignoreDiscriminator: boolean): CategoryVm {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
    };
}

export function CategoryVmToJSON(value?: CategoryVm | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
    };
}


