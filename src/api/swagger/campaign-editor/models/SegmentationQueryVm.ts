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
    QueryBuilderQuery,
    QueryBuilderQueryFromJSON,
    QueryBuilderQueryFromJSONTyped,
    QueryBuilderQueryToJSON,
    SegmentConditionVm,
    SegmentConditionVmFromJSON,
    SegmentConditionVmFromJSONTyped,
    SegmentConditionVmToJSON,
} from './';

/**
 * 
 * @export
 * @interface SegmentationQueryVm
 */
export interface SegmentationQueryVm {
    /**
     * 
     * @type {number}
     * @memberof SegmentationQueryVm
     */
    id?: number;
    /**
     * 
     * @type {number}
     * @memberof SegmentationQueryVm
     */
    segmentationId?: number;
    /**
     * 
     * @type {string}
     * @memberof SegmentationQueryVm
     */
    tree?: string | null;
    /**
     * 
     * @type {QueryBuilderQuery}
     * @memberof SegmentationQueryVm
     */
    query?: QueryBuilderQuery | null;
    /**
     * 
     * @type {Array<SegmentConditionVm>}
     * @memberof SegmentationQueryVm
     */
    conditions?: Array<SegmentConditionVm> | null;
}

export function SegmentationQueryVmFromJSON(json: any): SegmentationQueryVm {
    return SegmentationQueryVmFromJSONTyped(json, false);
}

export function SegmentationQueryVmFromJSONTyped(json: any, ignoreDiscriminator: boolean): SegmentationQueryVm {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'segmentationId': !exists(json, 'segmentationId') ? undefined : json['segmentationId'],
        'tree': !exists(json, 'tree') ? undefined : json['tree'],
        'query': !exists(json, 'query') ? undefined : QueryBuilderQueryFromJSON(json['query']),
        'conditions': !exists(json, 'conditions') ? undefined : (json['conditions'] === null ? null : (json['conditions'] as Array<any>).map(SegmentConditionVmFromJSON)),
    };
}

export function SegmentationQueryVmToJSON(value?: SegmentationQueryVm | null): any {
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
        'query': QueryBuilderQueryToJSON(value.query),
        'conditions': value.conditions === undefined ? undefined : (value.conditions === null ? null : (value.conditions as Array<any>).map(SegmentConditionVmToJSON)),
    };
}


