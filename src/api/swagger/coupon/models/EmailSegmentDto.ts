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
 * @interface EmailSegmentDto
 */
export interface EmailSegmentDto {
    /**
     * 
     * @type {string}
     * @memberof EmailSegmentDto
     */
    segmentName?: string | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof EmailSegmentDto
     */
    emailAddresses?: Array<string> | null;
}

export function EmailSegmentDtoFromJSON(json: any): EmailSegmentDto {
    return EmailSegmentDtoFromJSONTyped(json, false);
}

export function EmailSegmentDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): EmailSegmentDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'segmentName': !exists(json, 'segmentName') ? undefined : json['segmentName'],
        'emailAddresses': !exists(json, 'emailAddresses') ? undefined : json['emailAddresses'],
    };
}

export function EmailSegmentDtoToJSON(value?: EmailSegmentDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'segmentName': value.segmentName,
        'emailAddresses': value.emailAddresses,
    };
}


