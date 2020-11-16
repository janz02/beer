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
    NKMRTDCampaignEditorApplicationModelsSegmentationQueryBuilderField,
    NKMRTDCampaignEditorApplicationModelsSegmentationQueryBuilderFieldFromJSON,
    NKMRTDCampaignEditorApplicationModelsSegmentationQueryBuilderFieldFromJSONTyped,
    NKMRTDCampaignEditorApplicationModelsSegmentationQueryBuilderFieldToJSON,
} from './';

/**
 * 
 * @export
 * @interface NKMRTDCampaignEditorApplicationModelsSegmentationQueryBuilderFieldConfig
 */
export interface NKMRTDCampaignEditorApplicationModelsSegmentationQueryBuilderFieldConfig {
    /**
     * 
     * @type {Array<NKMRTDCampaignEditorApplicationModelsSegmentationQueryBuilderField>}
     * @memberof NKMRTDCampaignEditorApplicationModelsSegmentationQueryBuilderFieldConfig
     */
    readonly fields?: Array<NKMRTDCampaignEditorApplicationModelsSegmentationQueryBuilderField> | null;
}

export function NKMRTDCampaignEditorApplicationModelsSegmentationQueryBuilderFieldConfigFromJSON(json: any): NKMRTDCampaignEditorApplicationModelsSegmentationQueryBuilderFieldConfig {
    return NKMRTDCampaignEditorApplicationModelsSegmentationQueryBuilderFieldConfigFromJSONTyped(json, false);
}

export function NKMRTDCampaignEditorApplicationModelsSegmentationQueryBuilderFieldConfigFromJSONTyped(json: any, ignoreDiscriminator: boolean): NKMRTDCampaignEditorApplicationModelsSegmentationQueryBuilderFieldConfig {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'fields': !exists(json, 'fields') ? undefined : (json['fields'] === null ? null : (json['fields'] as Array<any>).map(NKMRTDCampaignEditorApplicationModelsSegmentationQueryBuilderFieldFromJSON)),
    };
}

export function NKMRTDCampaignEditorApplicationModelsSegmentationQueryBuilderFieldConfigToJSON(value?: NKMRTDCampaignEditorApplicationModelsSegmentationQueryBuilderFieldConfig | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
    };
}


