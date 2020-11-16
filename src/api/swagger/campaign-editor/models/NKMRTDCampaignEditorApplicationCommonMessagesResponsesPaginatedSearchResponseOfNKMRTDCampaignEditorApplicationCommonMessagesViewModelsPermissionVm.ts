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
    NKMRTDCampaignEditorApplicationCommonMessagesViewModelsPermissionVm,
    NKMRTDCampaignEditorApplicationCommonMessagesViewModelsPermissionVmFromJSON,
    NKMRTDCampaignEditorApplicationCommonMessagesViewModelsPermissionVmFromJSONTyped,
    NKMRTDCampaignEditorApplicationCommonMessagesViewModelsPermissionVmToJSON,
} from './';

/**
 * 
 * @export
 * @interface NKMRTDCampaignEditorApplicationCommonMessagesResponsesPaginatedSearchResponseOfNKMRTDCampaignEditorApplicationCommonMessagesViewModelsPermissionVm
 */
export interface NKMRTDCampaignEditorApplicationCommonMessagesResponsesPaginatedSearchResponseOfNKMRTDCampaignEditorApplicationCommonMessagesViewModelsPermissionVm {
    /**
     * 
     * @type {Array<NKMRTDCampaignEditorApplicationCommonMessagesViewModelsPermissionVm>}
     * @memberof NKMRTDCampaignEditorApplicationCommonMessagesResponsesPaginatedSearchResponseOfNKMRTDCampaignEditorApplicationCommonMessagesViewModelsPermissionVm
     */
    items?: Array<NKMRTDCampaignEditorApplicationCommonMessagesViewModelsPermissionVm> | null;
    /**
     * 
     * @type {number}
     * @memberof NKMRTDCampaignEditorApplicationCommonMessagesResponsesPaginatedSearchResponseOfNKMRTDCampaignEditorApplicationCommonMessagesViewModelsPermissionVm
     */
    totalCount?: number;
    /**
     * 
     * @type {number}
     * @memberof NKMRTDCampaignEditorApplicationCommonMessagesResponsesPaginatedSearchResponseOfNKMRTDCampaignEditorApplicationCommonMessagesViewModelsPermissionVm
     */
    from?: number;
    /**
     * 
     * @type {number}
     * @memberof NKMRTDCampaignEditorApplicationCommonMessagesResponsesPaginatedSearchResponseOfNKMRTDCampaignEditorApplicationCommonMessagesViewModelsPermissionVm
     */
    to?: number;
    /**
     * 
     * @type {number}
     * @memberof NKMRTDCampaignEditorApplicationCommonMessagesResponsesPaginatedSearchResponseOfNKMRTDCampaignEditorApplicationCommonMessagesViewModelsPermissionVm
     */
    page?: number;
    /**
     * 
     * @type {number}
     * @memberof NKMRTDCampaignEditorApplicationCommonMessagesResponsesPaginatedSearchResponseOfNKMRTDCampaignEditorApplicationCommonMessagesViewModelsPermissionVm
     */
    size?: number;
}

export function NKMRTDCampaignEditorApplicationCommonMessagesResponsesPaginatedSearchResponseOfNKMRTDCampaignEditorApplicationCommonMessagesViewModelsPermissionVmFromJSON(json: any): NKMRTDCampaignEditorApplicationCommonMessagesResponsesPaginatedSearchResponseOfNKMRTDCampaignEditorApplicationCommonMessagesViewModelsPermissionVm {
    return NKMRTDCampaignEditorApplicationCommonMessagesResponsesPaginatedSearchResponseOfNKMRTDCampaignEditorApplicationCommonMessagesViewModelsPermissionVmFromJSONTyped(json, false);
}

export function NKMRTDCampaignEditorApplicationCommonMessagesResponsesPaginatedSearchResponseOfNKMRTDCampaignEditorApplicationCommonMessagesViewModelsPermissionVmFromJSONTyped(json: any, ignoreDiscriminator: boolean): NKMRTDCampaignEditorApplicationCommonMessagesResponsesPaginatedSearchResponseOfNKMRTDCampaignEditorApplicationCommonMessagesViewModelsPermissionVm {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'items': !exists(json, 'items') ? undefined : (json['items'] === null ? null : (json['items'] as Array<any>).map(NKMRTDCampaignEditorApplicationCommonMessagesViewModelsPermissionVmFromJSON)),
        'totalCount': !exists(json, 'totalCount') ? undefined : json['totalCount'],
        'from': !exists(json, 'from') ? undefined : json['from'],
        'to': !exists(json, 'to') ? undefined : json['to'],
        'page': !exists(json, 'page') ? undefined : json['page'],
        'size': !exists(json, 'size') ? undefined : json['size'],
    };
}

export function NKMRTDCampaignEditorApplicationCommonMessagesResponsesPaginatedSearchResponseOfNKMRTDCampaignEditorApplicationCommonMessagesViewModelsPermissionVmToJSON(value?: NKMRTDCampaignEditorApplicationCommonMessagesResponsesPaginatedSearchResponseOfNKMRTDCampaignEditorApplicationCommonMessagesViewModelsPermissionVm | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'items': value.items === undefined ? undefined : (value.items === null ? null : (value.items as Array<any>).map(NKMRTDCampaignEditorApplicationCommonMessagesViewModelsPermissionVmToJSON)),
        'totalCount': value.totalCount,
        'from': value.from,
        'to': value.to,
        'page': value.page,
        'size': value.size,
    };
}


