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
 * @interface NKMRTDCampaignEditorStandaloneUsersCommandsValidatePasswordChangeValidatePasswordChangeCommand
 */
export interface NKMRTDCampaignEditorStandaloneUsersCommandsValidatePasswordChangeValidatePasswordChangeCommand {
    /**
     * 
     * @type {string}
     * @memberof NKMRTDCampaignEditorStandaloneUsersCommandsValidatePasswordChangeValidatePasswordChangeCommand
     */
    guid?: string;
}

export function NKMRTDCampaignEditorStandaloneUsersCommandsValidatePasswordChangeValidatePasswordChangeCommandFromJSON(json: any): NKMRTDCampaignEditorStandaloneUsersCommandsValidatePasswordChangeValidatePasswordChangeCommand {
    return NKMRTDCampaignEditorStandaloneUsersCommandsValidatePasswordChangeValidatePasswordChangeCommandFromJSONTyped(json, false);
}

export function NKMRTDCampaignEditorStandaloneUsersCommandsValidatePasswordChangeValidatePasswordChangeCommandFromJSONTyped(json: any, ignoreDiscriminator: boolean): NKMRTDCampaignEditorStandaloneUsersCommandsValidatePasswordChangeValidatePasswordChangeCommand {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'guid': !exists(json, 'guid') ? undefined : json['guid'],
    };
}

export function NKMRTDCampaignEditorStandaloneUsersCommandsValidatePasswordChangeValidatePasswordChangeCommandToJSON(value?: NKMRTDCampaignEditorStandaloneUsersCommandsValidatePasswordChangeValidatePasswordChangeCommand | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'guid': value.guid,
    };
}


