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
/**
 * 
 * @export
 * @interface OptimaCampaignEditorApplicationCommonMessagesViewModelsCompanyVm
 */
export interface OptimaCampaignEditorApplicationCommonMessagesViewModelsCompanyVm {
    /**
     * 
     * @type {number}
     * @memberof OptimaCampaignEditorApplicationCommonMessagesViewModelsCompanyVm
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof OptimaCampaignEditorApplicationCommonMessagesViewModelsCompanyVm
     */
    name?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof OptimaCampaignEditorApplicationCommonMessagesViewModelsCompanyVm
     */
    isActive?: boolean;
    /**
     * 
     * @type {Date}
     * @memberof OptimaCampaignEditorApplicationCommonMessagesViewModelsCompanyVm
     */
    createdDate?: Date;
    /**
     * 
     * @type {number}
     * @memberof OptimaCampaignEditorApplicationCommonMessagesViewModelsCompanyVm
     */
    profileCount?: number;
    /**
     * 
     * @type {number}
     * @memberof OptimaCampaignEditorApplicationCommonMessagesViewModelsCompanyVm
     */
    groupCount?: number;
    /**
     * 
     * @type {number}
     * @memberof OptimaCampaignEditorApplicationCommonMessagesViewModelsCompanyVm
     */
    jobRoleCount?: number;
    /**
     * 
     * @type {number}
     * @memberof OptimaCampaignEditorApplicationCommonMessagesViewModelsCompanyVm
     */
    campaignCount?: number;
}

export function OptimaCampaignEditorApplicationCommonMessagesViewModelsCompanyVmFromJSON(json: any): OptimaCampaignEditorApplicationCommonMessagesViewModelsCompanyVm {
    return OptimaCampaignEditorApplicationCommonMessagesViewModelsCompanyVmFromJSONTyped(json, false);
}

export function OptimaCampaignEditorApplicationCommonMessagesViewModelsCompanyVmFromJSONTyped(json: any, ignoreDiscriminator: boolean): OptimaCampaignEditorApplicationCommonMessagesViewModelsCompanyVm {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'isActive': !exists(json, 'isActive') ? undefined : json['isActive'],
        'createdDate': !exists(json, 'createdDate') ? undefined : (new Date(json['createdDate'])),
        'profileCount': !exists(json, 'profileCount') ? undefined : json['profileCount'],
        'groupCount': !exists(json, 'groupCount') ? undefined : json['groupCount'],
        'jobRoleCount': !exists(json, 'jobRoleCount') ? undefined : json['jobRoleCount'],
        'campaignCount': !exists(json, 'campaignCount') ? undefined : json['campaignCount'],
    };
}

export function OptimaCampaignEditorApplicationCommonMessagesViewModelsCompanyVmToJSON(value?: OptimaCampaignEditorApplicationCommonMessagesViewModelsCompanyVm | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'isActive': value.isActive,
        'createdDate': value.createdDate === undefined ? undefined : (value.createdDate.toISOString()),
        'profileCount': value.profileCount,
        'groupCount': value.groupCount,
        'jobRoleCount': value.jobRoleCount,
        'campaignCount': value.campaignCount,
    };
}


