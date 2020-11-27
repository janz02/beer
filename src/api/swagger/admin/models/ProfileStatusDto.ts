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
    ProfileStatus,
    ProfileStatusFromJSON,
    ProfileStatusFromJSONTyped,
    ProfileStatusToJSON,
} from './';

/**
 * 
 * @export
 * @interface ProfileStatusDto
 */
export interface ProfileStatusDto {
    /**
     * 
     * @type {ProfileStatus}
     * @memberof ProfileStatusDto
     */
    status?: ProfileStatus;
}

export function ProfileStatusDtoFromJSON(json: any): ProfileStatusDto {
    return ProfileStatusDtoFromJSONTyped(json, false);
}

export function ProfileStatusDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): ProfileStatusDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'status': !exists(json, 'status') ? undefined : ProfileStatusFromJSON(json['status']),
    };
}

export function ProfileStatusDtoToJSON(value?: ProfileStatusDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'status': ProfileStatusToJSON(value.status),
    };
}

