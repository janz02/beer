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
    NKMRTDCampaignEditorApplicationCommonMessagesViewModelsAdGroupVm,
    NKMRTDCampaignEditorApplicationCommonMessagesViewModelsAdGroupVmFromJSON,
    NKMRTDCampaignEditorApplicationCommonMessagesViewModelsAdGroupVmFromJSONTyped,
    NKMRTDCampaignEditorApplicationCommonMessagesViewModelsAdGroupVmToJSON,
    NKMRTDCampaignEditorApplicationCommonMessagesViewModelsFunctionPermissionVm,
    NKMRTDCampaignEditorApplicationCommonMessagesViewModelsFunctionPermissionVmFromJSON,
    NKMRTDCampaignEditorApplicationCommonMessagesViewModelsFunctionPermissionVmFromJSONTyped,
    NKMRTDCampaignEditorApplicationCommonMessagesViewModelsFunctionPermissionVmToJSON,
    NKMRTDCampaignEditorApplicationCommonMessagesViewModelsUserPermissionVm,
    NKMRTDCampaignEditorApplicationCommonMessagesViewModelsUserPermissionVmFromJSON,
    NKMRTDCampaignEditorApplicationCommonMessagesViewModelsUserPermissionVmFromJSONTyped,
    NKMRTDCampaignEditorApplicationCommonMessagesViewModelsUserPermissionVmToJSON,
} from './';

/**
 * 
 * @export
 * @interface NKMRTDCampaignEditorApplicationPermissionsCommandsCreatePermissionCreatePermissionCommand
 */
export interface NKMRTDCampaignEditorApplicationPermissionsCommandsCreatePermissionCreatePermissionCommand {
    /**
     * 
     * @type {string}
     * @memberof NKMRTDCampaignEditorApplicationPermissionsCommandsCreatePermissionCreatePermissionCommand
     */
    name?: string | null;
    /**
     * 
     * @type {Array<NKMRTDCampaignEditorApplicationCommonMessagesViewModelsAdGroupVm>}
     * @memberof NKMRTDCampaignEditorApplicationPermissionsCommandsCreatePermissionCreatePermissionCommand
     */
    adGroups?: Array<NKMRTDCampaignEditorApplicationCommonMessagesViewModelsAdGroupVm> | null;
    /**
     * 
     * @type {Array<NKMRTDCampaignEditorApplicationCommonMessagesViewModelsUserPermissionVm>}
     * @memberof NKMRTDCampaignEditorApplicationPermissionsCommandsCreatePermissionCreatePermissionCommand
     */
    users?: Array<NKMRTDCampaignEditorApplicationCommonMessagesViewModelsUserPermissionVm> | null;
    /**
     * 
     * @type {Array<NKMRTDCampaignEditorApplicationCommonMessagesViewModelsFunctionPermissionVm>}
     * @memberof NKMRTDCampaignEditorApplicationPermissionsCommandsCreatePermissionCreatePermissionCommand
     */
    functionPermissions?: Array<NKMRTDCampaignEditorApplicationCommonMessagesViewModelsFunctionPermissionVm> | null;
}

export function NKMRTDCampaignEditorApplicationPermissionsCommandsCreatePermissionCreatePermissionCommandFromJSON(json: any): NKMRTDCampaignEditorApplicationPermissionsCommandsCreatePermissionCreatePermissionCommand {
    return NKMRTDCampaignEditorApplicationPermissionsCommandsCreatePermissionCreatePermissionCommandFromJSONTyped(json, false);
}

export function NKMRTDCampaignEditorApplicationPermissionsCommandsCreatePermissionCreatePermissionCommandFromJSONTyped(json: any, ignoreDiscriminator: boolean): NKMRTDCampaignEditorApplicationPermissionsCommandsCreatePermissionCreatePermissionCommand {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': !exists(json, 'name') ? undefined : json['name'],
        'adGroups': !exists(json, 'adGroups') ? undefined : (json['adGroups'] === null ? null : (json['adGroups'] as Array<any>).map(NKMRTDCampaignEditorApplicationCommonMessagesViewModelsAdGroupVmFromJSON)),
        'users': !exists(json, 'users') ? undefined : (json['users'] === null ? null : (json['users'] as Array<any>).map(NKMRTDCampaignEditorApplicationCommonMessagesViewModelsUserPermissionVmFromJSON)),
        'functionPermissions': !exists(json, 'functionPermissions') ? undefined : (json['functionPermissions'] === null ? null : (json['functionPermissions'] as Array<any>).map(NKMRTDCampaignEditorApplicationCommonMessagesViewModelsFunctionPermissionVmFromJSON)),
    };
}

export function NKMRTDCampaignEditorApplicationPermissionsCommandsCreatePermissionCreatePermissionCommandToJSON(value?: NKMRTDCampaignEditorApplicationPermissionsCommandsCreatePermissionCreatePermissionCommand | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'adGroups': value.adGroups === undefined ? undefined : (value.adGroups === null ? null : (value.adGroups as Array<any>).map(NKMRTDCampaignEditorApplicationCommonMessagesViewModelsAdGroupVmToJSON)),
        'users': value.users === undefined ? undefined : (value.users === null ? null : (value.users as Array<any>).map(NKMRTDCampaignEditorApplicationCommonMessagesViewModelsUserPermissionVmToJSON)),
        'functionPermissions': value.functionPermissions === undefined ? undefined : (value.functionPermissions === null ? null : (value.functionPermissions as Array<any>).map(NKMRTDCampaignEditorApplicationCommonMessagesViewModelsFunctionPermissionVmToJSON)),
    };
}


