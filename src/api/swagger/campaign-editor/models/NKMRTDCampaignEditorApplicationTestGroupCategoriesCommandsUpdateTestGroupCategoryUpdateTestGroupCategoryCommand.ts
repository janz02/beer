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
 * @interface NKMRTDCampaignEditorApplicationTestGroupCategoriesCommandsUpdateTestGroupCategoryUpdateTestGroupCategoryCommand
 */
export interface NKMRTDCampaignEditorApplicationTestGroupCategoriesCommandsUpdateTestGroupCategoryUpdateTestGroupCategoryCommand {
    /**
     * 
     * @type {number}
     * @memberof NKMRTDCampaignEditorApplicationTestGroupCategoriesCommandsUpdateTestGroupCategoryUpdateTestGroupCategoryCommand
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof NKMRTDCampaignEditorApplicationTestGroupCategoriesCommandsUpdateTestGroupCategoryUpdateTestGroupCategoryCommand
     */
    name?: string | null;
    /**
     * 
     * @type {number}
     * @memberof NKMRTDCampaignEditorApplicationTestGroupCategoriesCommandsUpdateTestGroupCategoryUpdateTestGroupCategoryCommand
     */
    requestId?: number;
}

export function NKMRTDCampaignEditorApplicationTestGroupCategoriesCommandsUpdateTestGroupCategoryUpdateTestGroupCategoryCommandFromJSON(json: any): NKMRTDCampaignEditorApplicationTestGroupCategoriesCommandsUpdateTestGroupCategoryUpdateTestGroupCategoryCommand {
    return NKMRTDCampaignEditorApplicationTestGroupCategoriesCommandsUpdateTestGroupCategoryUpdateTestGroupCategoryCommandFromJSONTyped(json, false);
}

export function NKMRTDCampaignEditorApplicationTestGroupCategoriesCommandsUpdateTestGroupCategoryUpdateTestGroupCategoryCommandFromJSONTyped(json: any, ignoreDiscriminator: boolean): NKMRTDCampaignEditorApplicationTestGroupCategoriesCommandsUpdateTestGroupCategoryUpdateTestGroupCategoryCommand {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'requestId': !exists(json, 'requestId') ? undefined : json['requestId'],
    };
}

export function NKMRTDCampaignEditorApplicationTestGroupCategoriesCommandsUpdateTestGroupCategoryUpdateTestGroupCategoryCommandToJSON(value?: NKMRTDCampaignEditorApplicationTestGroupCategoriesCommandsUpdateTestGroupCategoryUpdateTestGroupCategoryCommand | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'requestId': value.requestId,
    };
}


