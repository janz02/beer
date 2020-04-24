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
    UserNotificationDto,
    UserNotificationDtoFromJSON,
    UserNotificationDtoFromJSONTyped,
    UserNotificationDtoToJSON,
} from './';

/**
 * 
 * @export
 * @interface UserNotificationDtoPaginatedResponse
 */
export interface UserNotificationDtoPaginatedResponse {
    /**
     * 
     * @type {Array<UserNotificationDto>}
     * @memberof UserNotificationDtoPaginatedResponse
     */
    result?: Array<UserNotificationDto> | null;
    /**
     * 
     * @type {number}
     * @memberof UserNotificationDtoPaginatedResponse
     */
    page?: number;
    /**
     * 
     * @type {number}
     * @memberof UserNotificationDtoPaginatedResponse
     */
    from?: number;
    /**
     * 
     * @type {number}
     * @memberof UserNotificationDtoPaginatedResponse
     */
    to?: number;
    /**
     * 
     * @type {number}
     * @memberof UserNotificationDtoPaginatedResponse
     */
    size?: number;
}

export function UserNotificationDtoPaginatedResponseFromJSON(json: any): UserNotificationDtoPaginatedResponse {
    return UserNotificationDtoPaginatedResponseFromJSONTyped(json, false);
}

export function UserNotificationDtoPaginatedResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserNotificationDtoPaginatedResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'result': !exists(json, 'result') ? undefined : (json['result'] === null ? null : (json['result'] as Array<any>).map(UserNotificationDtoFromJSON)),
        'page': !exists(json, 'page') ? undefined : json['page'],
        'from': !exists(json, 'from') ? undefined : json['from'],
        'to': !exists(json, 'to') ? undefined : json['to'],
        'size': !exists(json, 'size') ? undefined : json['size'],
    };
}

export function UserNotificationDtoPaginatedResponseToJSON(value?: UserNotificationDtoPaginatedResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'result': value.result === undefined ? undefined : (value.result === null ? null : (value.result as Array<any>).map(UserNotificationDtoToJSON)),
        'page': value.page,
        'from': value.from,
        'to': value.to,
        'size': value.size,
    };
}


