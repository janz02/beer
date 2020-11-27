/* tslint:disable */
/* eslint-disable */
/**
 * Optima CampaignEditor API
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
    OptimaCampaignEditorApplicationCommonMessagesViewModelsQueryBuilderQuery,
    OptimaCampaignEditorApplicationCommonMessagesViewModelsQueryBuilderQueryFromJSON,
    OptimaCampaignEditorApplicationCommonMessagesViewModelsQueryBuilderQueryFromJSONTyped,
    OptimaCampaignEditorApplicationCommonMessagesViewModelsQueryBuilderQueryToJSON,
    OptimaCampaignEditorApplicationCommonMessagesViewModelsSegmentConditionVm,
    OptimaCampaignEditorApplicationCommonMessagesViewModelsSegmentConditionVmFromJSON,
    OptimaCampaignEditorApplicationCommonMessagesViewModelsSegmentConditionVmFromJSONTyped,
    OptimaCampaignEditorApplicationCommonMessagesViewModelsSegmentConditionVmToJSON,
} from './';

/**
 * 
 * @export
 * @interface OptimaCampaignEditorApplicationCommonMessagesRequestsSegmentationQueryDto
 */
export interface OptimaCampaignEditorApplicationCommonMessagesRequestsSegmentationQueryDto {
    /**
     * 
     * @type {number}
     * @memberof OptimaCampaignEditorApplicationCommonMessagesRequestsSegmentationQueryDto
     */
    id?: number;
    /**
     * 
     * @type {number}
     * @memberof OptimaCampaignEditorApplicationCommonMessagesRequestsSegmentationQueryDto
     */
    segmentationId?: number;
    /**
     * 
     * @type {string}
     * @memberof OptimaCampaignEditorApplicationCommonMessagesRequestsSegmentationQueryDto
     */
    tree?: string | null;
    /**
     * 
     * @type {OptimaCampaignEditorApplicationCommonMessagesViewModelsQueryBuilderQuery}
     * @memberof OptimaCampaignEditorApplicationCommonMessagesRequestsSegmentationQueryDto
     */
    query?: OptimaCampaignEditorApplicationCommonMessagesViewModelsQueryBuilderQuery | null;
    /**
     * 
     * @type {Array<OptimaCampaignEditorApplicationCommonMessagesViewModelsSegmentConditionVm>}
     * @memberof OptimaCampaignEditorApplicationCommonMessagesRequestsSegmentationQueryDto
     */
    conditions?: Array<OptimaCampaignEditorApplicationCommonMessagesViewModelsSegmentConditionVm> | null;
}

export function OptimaCampaignEditorApplicationCommonMessagesRequestsSegmentationQueryDtoFromJSON(json: any): OptimaCampaignEditorApplicationCommonMessagesRequestsSegmentationQueryDto {
    return OptimaCampaignEditorApplicationCommonMessagesRequestsSegmentationQueryDtoFromJSONTyped(json, false);
}

export function OptimaCampaignEditorApplicationCommonMessagesRequestsSegmentationQueryDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): OptimaCampaignEditorApplicationCommonMessagesRequestsSegmentationQueryDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'segmentationId': !exists(json, 'segmentationId') ? undefined : json['segmentationId'],
        'tree': !exists(json, 'tree') ? undefined : json['tree'],
        'query': !exists(json, 'query') ? undefined : OptimaCampaignEditorApplicationCommonMessagesViewModelsQueryBuilderQueryFromJSON(json['query']),
        'conditions': !exists(json, 'conditions') ? undefined : (json['conditions'] === null ? null : (json['conditions'] as Array<any>).map(OptimaCampaignEditorApplicationCommonMessagesViewModelsSegmentConditionVmFromJSON)),
    };
}

export function OptimaCampaignEditorApplicationCommonMessagesRequestsSegmentationQueryDtoToJSON(value?: OptimaCampaignEditorApplicationCommonMessagesRequestsSegmentationQueryDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'segmentationId': value.segmentationId,
        'tree': value.tree,
        'query': OptimaCampaignEditorApplicationCommonMessagesViewModelsQueryBuilderQueryToJSON(value.query),
        'conditions': value.conditions === undefined ? undefined : (value.conditions === null ? null : (value.conditions as Array<any>).map(OptimaCampaignEditorApplicationCommonMessagesViewModelsSegmentConditionVmToJSON)),
    };
}

