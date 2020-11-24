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
 * @interface ProfileDto
 */
export interface ProfileDto {
    /**
     * 
     * @type {string}
     * @memberof ProfileDto
     */
    name?: string | null;
    /**
     * 
     * @type {ProfileStatus}
     * @memberof ProfileDto
     */
    status?: ProfileStatus;
    /**
     * 
     * @type {string}
     * @memberof ProfileDto
     */
    userName?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ProfileDto
     */
    email?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ProfileDto
     */
    profilePictureId?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof ProfileDto
     */
    birthDay?: Date;
    /**
     * 
     * @type {string}
     * @memberof ProfileDto
     */
    phoneNumber?: string | null;
    /**
     * 
     * @type {number}
     * @memberof ProfileDto
     */
    companyId?: number;
    /**
     * 
     * @type {Array<number>}
     * @memberof ProfileDto
     */
    groups?: Array<number> | null;
    /**
     * 
     * @type {number}
     * @memberof ProfileDto
     */
    jobRoleId?: number;
    /**
     * 
     * @type {Array<string>}
     * @memberof ProfileDto
     */
    permissions?: Array<string> | null;
}

export function ProfileDtoFromJSON(json: any): ProfileDto {
    return ProfileDtoFromJSONTyped(json, false);
}

export function ProfileDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): ProfileDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': !exists(json, 'name') ? undefined : json['name'],
        'status': !exists(json, 'status') ? undefined : ProfileStatusFromJSON(json['status']),
        'userName': !exists(json, 'userName') ? undefined : json['userName'],
        'email': !exists(json, 'email') ? undefined : json['email'],
        'profilePictureId': !exists(json, 'profilePictureId') ? undefined : json['profilePictureId'],
        'birthDay': !exists(json, 'birthDay') ? undefined : (new Date(json['birthDay'])),
        'phoneNumber': !exists(json, 'phoneNumber') ? undefined : json['phoneNumber'],
        'companyId': !exists(json, 'companyId') ? undefined : json['companyId'],
        'groups': !exists(json, 'groups') ? undefined : json['groups'],
        'jobRoleId': !exists(json, 'jobRoleId') ? undefined : json['jobRoleId'],
        'permissions': !exists(json, 'permissions') ? undefined : json['permissions'],
    };
}

export function ProfileDtoToJSON(value?: ProfileDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'status': ProfileStatusToJSON(value.status),
        'userName': value.userName,
        'email': value.email,
        'profilePictureId': value.profilePictureId,
        'birthDay': value.birthDay === undefined ? undefined : (value.birthDay.toISOString()),
        'phoneNumber': value.phoneNumber,
        'companyId': value.companyId,
        'groups': value.groups,
        'jobRoleId': value.jobRoleId,
        'permissions': value.permissions,
    };
}


