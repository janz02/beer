/* tslint:disable */
/* eslint-disable */
/**
 * NKM RTD CampaignEditor API
 * <h5>UI handler and the main responsibility carrier of the application, the two step transaction handling owner. The API defines the public interface for the UI and all the user exposed functions are routed here. The actual methods are supports basic segmentation creation and CSV upload functionality. CSV upload is supported via sharepoint. Authentication and JWT token are generated here from <b>Active Directory</b> login. The substraction of public api descriptions are on the API descriptions.</h5>
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
    NKMRTDApplicationModelsRequestsDiscountSegmentDto,
    NKMRTDApplicationModelsRequestsDiscountSegmentDtoFromJSON,
    NKMRTDApplicationModelsRequestsDiscountSegmentDtoFromJSONTyped,
    NKMRTDApplicationModelsRequestsDiscountSegmentDtoToJSON,
    NKMRTDApplicationModelsRequestsEmailTemplateDto,
    NKMRTDApplicationModelsRequestsEmailTemplateDtoFromJSON,
    NKMRTDApplicationModelsRequestsEmailTemplateDtoFromJSONTyped,
    NKMRTDApplicationModelsRequestsEmailTemplateDtoToJSON,
} from './';

/**
 * 
 * @export
 * @interface NKMRTDApplicationModelsRequestsDiscountDto
 */
export interface NKMRTDApplicationModelsRequestsDiscountDto {
    /**
     * 
     * @type {number}
     * @memberof NKMRTDApplicationModelsRequestsDiscountDto
     */
    id?: number;
    /**
     * 
     * @type {number}
     * @memberof NKMRTDApplicationModelsRequestsDiscountDto
     */
    treatmentId?: number;
    /**
     * 
     * @type {number}
     * @memberof NKMRTDApplicationModelsRequestsDiscountDto
     */
    discountTypeId?: number;
    /**
     * 
     * @type {number}
     * @memberof NKMRTDApplicationModelsRequestsDiscountDto
     */
    segmentationId?: number;
    /**
     * 
     * @type {number}
     * @memberof NKMRTDApplicationModelsRequestsDiscountDto
     */
    discountAmount?: number;
    /**
     * 
     * @type {Array<NKMRTDApplicationModelsRequestsEmailTemplateDto>}
     * @memberof NKMRTDApplicationModelsRequestsDiscountDto
     */
    templates?: Array<NKMRTDApplicationModelsRequestsEmailTemplateDto> | null;
    /**
     * 
     * @type {NKMRTDApplicationModelsRequestsDiscountSegmentDto}
     * @memberof NKMRTDApplicationModelsRequestsDiscountDto
     */
    segment?: NKMRTDApplicationModelsRequestsDiscountSegmentDto | null;
}

export function NKMRTDApplicationModelsRequestsDiscountDtoFromJSON(json: any): NKMRTDApplicationModelsRequestsDiscountDto {
    return NKMRTDApplicationModelsRequestsDiscountDtoFromJSONTyped(json, false);
}

export function NKMRTDApplicationModelsRequestsDiscountDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): NKMRTDApplicationModelsRequestsDiscountDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'treatmentId': !exists(json, 'treatmentId') ? undefined : json['treatmentId'],
        'discountTypeId': !exists(json, 'discountTypeId') ? undefined : json['discountTypeId'],
        'segmentationId': !exists(json, 'segmentationId') ? undefined : json['segmentationId'],
        'discountAmount': !exists(json, 'discountAmount') ? undefined : json['discountAmount'],
        'templates': !exists(json, 'templates') ? undefined : (json['templates'] === null ? null : (json['templates'] as Array<any>).map(NKMRTDApplicationModelsRequestsEmailTemplateDtoFromJSON)),
        'segment': !exists(json, 'segment') ? undefined : NKMRTDApplicationModelsRequestsDiscountSegmentDtoFromJSON(json['segment']),
    };
}

export function NKMRTDApplicationModelsRequestsDiscountDtoToJSON(value?: NKMRTDApplicationModelsRequestsDiscountDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'treatmentId': value.treatmentId,
        'discountTypeId': value.discountTypeId,
        'segmentationId': value.segmentationId,
        'discountAmount': value.discountAmount,
        'templates': value.templates === undefined ? undefined : (value.templates === null ? null : (value.templates as Array<any>).map(NKMRTDApplicationModelsRequestsEmailTemplateDtoToJSON)),
        'segment': NKMRTDApplicationModelsRequestsDiscountSegmentDtoToJSON(value.segment),
    };
}


