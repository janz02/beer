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
    EmailSegmentDto,
    EmailSegmentDtoFromJSON,
    EmailSegmentDtoFromJSONTyped,
    EmailSegmentDtoToJSON,
} from './';

/**
 * 
 * @export
 * @interface CreateSegmentationCommand
 */
export interface CreateSegmentationCommand {
    /**
     * 
     * @type {Array<EmailSegmentDto>}
     * @memberof CreateSegmentationCommand
     */
    segments?: Array<EmailSegmentDto> | null;
    /**
     * 
     * @type {boolean}
     * @memberof CreateSegmentationCommand
     */
    oneTimeUse?: boolean;
}

export function CreateSegmentationCommandFromJSON(json: any): CreateSegmentationCommand {
    return CreateSegmentationCommandFromJSONTyped(json, false);
}

export function CreateSegmentationCommandFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateSegmentationCommand {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'segments': !exists(json, 'segments') ? undefined : (json['segments'] === null ? null : (json['segments'] as Array<any>).map(EmailSegmentDtoFromJSON)),
        'oneTimeUse': !exists(json, 'oneTimeUse') ? undefined : json['oneTimeUse'],
    };
}

export function CreateSegmentationCommandToJSON(value?: CreateSegmentationCommand | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'segments': value.segments === undefined ? undefined : (value.segments === null ? null : (value.segments as Array<any>).map(EmailSegmentDtoToJSON)),
        'oneTimeUse': value.oneTimeUse,
    };
}


