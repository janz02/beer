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
 * @interface ProfileVm
 */
export interface ProfileVm {
    /**
     * 
     * @type {number}
     * @memberof ProfileVm
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof ProfileVm
     */
    name?: string | null;
    /**
     * 
     * @type {ProfileStatus}
     * @memberof ProfileVm
     */
    status?: ProfileStatus;
    /**
     * 
     * @type {string}
     * @memberof ProfileVm
     */
    userName?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ProfileVm
     */
    email?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof ProfileVm
     */
    createdDate?: Date;
    /**
     * 
     * @type {number}
     * @memberof ProfileVm
     */
    groupCount?: number;
    /**
     * 
     * @type {number}
     * @memberof ProfileVm
     */
    permissionCount?: number;
    /**
     * 
     * @type {number}
     * @memberof ProfileVm
     */
    jobDescription?: number;
    /**
     * 
     * @type {string}
     * @memberof ProfileVm
     */
    profilePictureId?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof ProfileVm
     */
    birthDay?: Date;
    /**
     * 
     * @type {string}
     * @memberof ProfileVm
     */
    phoneNumber?: string | null;
    /**
     * 
     * @type {number}
     * @memberof ProfileVm
     */
    companyId?: number;
    /**
     * 
     * @type {string}
     * @memberof ProfileVm
     */
    companyName?: string | null;
}

export function ProfileVmFromJSON(json: any): ProfileVm {
    return ProfileVmFromJSONTyped(json, false);
}

export function ProfileVmFromJSONTyped(json: any, ignoreDiscriminator: boolean): ProfileVm {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'status': !exists(json, 'status') ? undefined : ProfileStatusFromJSON(json['status']),
        'userName': !exists(json, 'userName') ? undefined : json['userName'],
        'email': !exists(json, 'email') ? undefined : json['email'],
        'createdDate': !exists(json, 'createdDate') ? undefined : (new Date(json['createdDate'])),
        'groupCount': !exists(json, 'groupCount') ? undefined : json['groupCount'],
        'permissionCount': !exists(json, 'permissionCount') ? undefined : json['permissionCount'],
        'jobDescription': !exists(json, 'jobDescription') ? undefined : json['jobDescription'],
        'profilePictureId': !exists(json, 'profilePictureId') ? undefined : json['profilePictureId'],
        'birthDay': !exists(json, 'birthDay') ? undefined : (new Date(json['birthDay'])),
        'phoneNumber': !exists(json, 'phoneNumber') ? undefined : json['phoneNumber'],
        'companyId': !exists(json, 'companyId') ? undefined : json['companyId'],
        'companyName': !exists(json, 'companyName') ? undefined : json['companyName'],
    };
}

export function ProfileVmToJSON(value?: ProfileVm | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'status': ProfileStatusToJSON(value.status),
        'userName': value.userName,
        'email': value.email,
        'createdDate': value.createdDate === undefined ? undefined : (value.createdDate.toISOString()),
        'groupCount': value.groupCount,
        'permissionCount': value.permissionCount,
        'jobDescription': value.jobDescription,
        'profilePictureId': value.profilePictureId,
        'birthDay': value.birthDay === undefined ? undefined : (value.birthDay.toISOString()),
        'phoneNumber': value.phoneNumber,
        'companyId': value.companyId,
        'companyName': value.companyName,
    };
}


