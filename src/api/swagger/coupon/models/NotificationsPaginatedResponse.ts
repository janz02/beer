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
    UserNotificationDto,
    UserNotificationDtoFromJSON,
    UserNotificationDtoFromJSONTyped,
    UserNotificationDtoToJSON,
} from './';

/**
 * 
 * @export
 * @interface NotificationsPaginatedResponse
 */
export interface NotificationsPaginatedResponse {
    /**
     * 
     * @type {number}
     * @memberof NotificationsPaginatedResponse
     */
    unseenCount?: number;
    /**
     * 
     * @type {Array<UserNotificationDto>}
     * @memberof NotificationsPaginatedResponse
     */
    result?: Array<UserNotificationDto> | null;
    /**
     * 
     * @type {number}
     * @memberof NotificationsPaginatedResponse
     */
    page?: number;
    /**
     * 
     * @type {number}
     * @memberof NotificationsPaginatedResponse
     */
    from?: number;
    /**
     * 
     * @type {number}
     * @memberof NotificationsPaginatedResponse
     */
    to?: number;
    /**
     * 
     * @type {number}
     * @memberof NotificationsPaginatedResponse
     */
    size?: number;
}

export function NotificationsPaginatedResponseFromJSON(json: any): NotificationsPaginatedResponse {
    return NotificationsPaginatedResponseFromJSONTyped(json, false);
}

export function NotificationsPaginatedResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): NotificationsPaginatedResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'unseenCount': !exists(json, 'unseenCount') ? undefined : json['unseenCount'],
        'result': !exists(json, 'result') ? undefined : (json['result'] === null ? null : (json['result'] as Array<any>).map(UserNotificationDtoFromJSON)),
        'page': !exists(json, 'page') ? undefined : json['page'],
        'from': !exists(json, 'from') ? undefined : json['from'],
        'to': !exists(json, 'to') ? undefined : json['to'],
        'size': !exists(json, 'size') ? undefined : json['size'],
    };
}

export function NotificationsPaginatedResponseToJSON(value?: NotificationsPaginatedResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'unseenCount': value.unseenCount,
        'result': value.result === undefined ? undefined : (value.result === null ? null : (value.result as Array<any>).map(UserNotificationDtoToJSON)),
        'page': value.page,
        'from': value.from,
        'to': value.to,
        'size': value.size,
    };
}


