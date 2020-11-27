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
/**
 * 
 * @export
 * @interface CompanyStatusDto
 */
export interface CompanyStatusDto {
    /**
     * 
     * @type {boolean}
     * @memberof CompanyStatusDto
     */
    isActive?: boolean;
}

export function CompanyStatusDtoFromJSON(json: any): CompanyStatusDto {
    return CompanyStatusDtoFromJSONTyped(json, false);
}

export function CompanyStatusDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): CompanyStatusDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'isActive': !exists(json, 'isActive') ? undefined : json['isActive'],
    };
}

export function CompanyStatusDtoToJSON(value?: CompanyStatusDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'isActive': value.isActive,
    };
}

