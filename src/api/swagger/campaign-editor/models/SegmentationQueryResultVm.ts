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
/**
 * 
 * @export
 * @interface SegmentationQueryResultVm
 */
export interface SegmentationQueryResultVm {
    /**
     * 
     * @type {string}
     * @memberof SegmentationQueryResultVm
     */
    ruleId?: string | null;
    /**
     * 
     * @type {number}
     * @memberof SegmentationQueryResultVm
     */
    segmentSize?: number;
    /**
     * 
     * @type {number}
     * @memberof SegmentationQueryResultVm
     */
    filteredSize?: number;
}

export function SegmentationQueryResultVmFromJSON(json: any): SegmentationQueryResultVm {
    return SegmentationQueryResultVmFromJSONTyped(json, false);
}

export function SegmentationQueryResultVmFromJSONTyped(json: any, ignoreDiscriminator: boolean): SegmentationQueryResultVm {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'ruleId': !exists(json, 'ruleId') ? undefined : json['ruleId'],
        'segmentSize': !exists(json, 'segmentSize') ? undefined : json['segmentSize'],
        'filteredSize': !exists(json, 'filteredSize') ? undefined : json['filteredSize'],
    };
}

export function SegmentationQueryResultVmToJSON(value?: SegmentationQueryResultVm | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'ruleId': value.ruleId,
        'segmentSize': value.segmentSize,
        'filteredSize': value.filteredSize,
    };
}

