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
    Roles,
    RolesFromJSON,
    RolesFromJSONTyped,
    RolesToJSON,
} from './';

/**
 * 
 * @export
 * @interface PartnerContactStateDto
 */
export interface PartnerContactStateDto {
    /**
     * 
     * @type {Roles}
     * @memberof PartnerContactStateDto
     */
    role?: Roles;
    /**
     * 
     * @type {boolean}
     * @memberof PartnerContactStateDto
     */
    active?: boolean;
}

export function PartnerContactStateDtoFromJSON(json: any): PartnerContactStateDto {
    return PartnerContactStateDtoFromJSONTyped(json, false);
}

export function PartnerContactStateDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): PartnerContactStateDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'role': !exists(json, 'role') ? undefined : RolesFromJSON(json['role']),
        'active': !exists(json, 'active') ? undefined : json['active'],
    };
}

export function PartnerContactStateDtoToJSON(value?: PartnerContactStateDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'role': RolesToJSON(value.role),
        'active': value.active,
    };
}

