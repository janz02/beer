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
 * @interface OptimaCampaignEditorApplicationCommonMessagesViewModelsCampaignListItemVm
 */
export interface OptimaCampaignEditorApplicationCommonMessagesViewModelsCampaignListItemVm {
    /**
     * 
     * @type {number}
     * @memberof OptimaCampaignEditorApplicationCommonMessagesViewModelsCampaignListItemVm
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof OptimaCampaignEditorApplicationCommonMessagesViewModelsCampaignListItemVm
     */
    name?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof OptimaCampaignEditorApplicationCommonMessagesViewModelsCampaignListItemVm
     */
    startDate?: Date;
    /**
     * 
     * @type {Date}
     * @memberof OptimaCampaignEditorApplicationCommonMessagesViewModelsCampaignListItemVm
     */
    endDate?: Date;
    /**
     * 
     * @type {Date}
     * @memberof OptimaCampaignEditorApplicationCommonMessagesViewModelsCampaignListItemVm
     */
    realStartDate?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof OptimaCampaignEditorApplicationCommonMessagesViewModelsCampaignListItemVm
     */
    realEndDate?: Date | null;
    /**
     * 
     * @type {string}
     * @memberof OptimaCampaignEditorApplicationCommonMessagesViewModelsCampaignListItemVm
     */
    technicalName?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof OptimaCampaignEditorApplicationCommonMessagesViewModelsCampaignListItemVm
     */
    createdDate?: Date;
    /**
     * 
     * @type {string}
     * @memberof OptimaCampaignEditorApplicationCommonMessagesViewModelsCampaignListItemVm
     */
    createdBy?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof OptimaCampaignEditorApplicationCommonMessagesViewModelsCampaignListItemVm
     */
    modifiedDate?: Date | null;
    /**
     * 
     * @type {string}
     * @memberof OptimaCampaignEditorApplicationCommonMessagesViewModelsCampaignListItemVm
     */
    modifiedBy?: string | null;
    /**
     * 
     * @type {string}
     * @memberof OptimaCampaignEditorApplicationCommonMessagesViewModelsCampaignListItemVm
     */
    responsible?: string | null;
    /**
     * 
     * @type {number}
     * @memberof OptimaCampaignEditorApplicationCommonMessagesViewModelsCampaignListItemVm
     */
    statusId?: number;
    /**
     * 
     * @type {boolean}
     * @memberof OptimaCampaignEditorApplicationCommonMessagesViewModelsCampaignListItemVm
     */
    canBeSendOutToTestGroup?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof OptimaCampaignEditorApplicationCommonMessagesViewModelsCampaignListItemVm
     */
    canApprove?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof OptimaCampaignEditorApplicationCommonMessagesViewModelsCampaignListItemVm
     */
    canDisapprove?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof OptimaCampaignEditorApplicationCommonMessagesViewModelsCampaignListItemVm
     */
    canDelete?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof OptimaCampaignEditorApplicationCommonMessagesViewModelsCampaignListItemVm
     */
    canStart?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof OptimaCampaignEditorApplicationCommonMessagesViewModelsCampaignListItemVm
     */
    canStop?: boolean;
    /**
     * 
     * @type {number}
     * @memberof OptimaCampaignEditorApplicationCommonMessagesViewModelsCampaignListItemVm
     */
    productId?: number;
    /**
     * 
     * @type {Array<number>}
     * @memberof OptimaCampaignEditorApplicationCommonMessagesViewModelsCampaignListItemVm
     */
    channels?: Array<number> | null;
}

export function OptimaCampaignEditorApplicationCommonMessagesViewModelsCampaignListItemVmFromJSON(json: any): OptimaCampaignEditorApplicationCommonMessagesViewModelsCampaignListItemVm {
    return OptimaCampaignEditorApplicationCommonMessagesViewModelsCampaignListItemVmFromJSONTyped(json, false);
}

export function OptimaCampaignEditorApplicationCommonMessagesViewModelsCampaignListItemVmFromJSONTyped(json: any, ignoreDiscriminator: boolean): OptimaCampaignEditorApplicationCommonMessagesViewModelsCampaignListItemVm {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'startDate': !exists(json, 'startDate') ? undefined : (new Date(json['startDate'])),
        'endDate': !exists(json, 'endDate') ? undefined : (new Date(json['endDate'])),
        'realStartDate': !exists(json, 'realStartDate') ? undefined : (json['realStartDate'] === null ? null : new Date(json['realStartDate'])),
        'realEndDate': !exists(json, 'realEndDate') ? undefined : (json['realEndDate'] === null ? null : new Date(json['realEndDate'])),
        'technicalName': !exists(json, 'technicalName') ? undefined : json['technicalName'],
        'createdDate': !exists(json, 'createdDate') ? undefined : (new Date(json['createdDate'])),
        'createdBy': !exists(json, 'createdBy') ? undefined : json['createdBy'],
        'modifiedDate': !exists(json, 'modifiedDate') ? undefined : (json['modifiedDate'] === null ? null : new Date(json['modifiedDate'])),
        'modifiedBy': !exists(json, 'modifiedBy') ? undefined : json['modifiedBy'],
        'responsible': !exists(json, 'responsible') ? undefined : json['responsible'],
        'statusId': !exists(json, 'statusId') ? undefined : json['statusId'],
        'canBeSendOutToTestGroup': !exists(json, 'canBeSendOutToTestGroup') ? undefined : json['canBeSendOutToTestGroup'],
        'canApprove': !exists(json, 'canApprove') ? undefined : json['canApprove'],
        'canDisapprove': !exists(json, 'canDisapprove') ? undefined : json['canDisapprove'],
        'canDelete': !exists(json, 'canDelete') ? undefined : json['canDelete'],
        'canStart': !exists(json, 'canStart') ? undefined : json['canStart'],
        'canStop': !exists(json, 'canStop') ? undefined : json['canStop'],
        'productId': !exists(json, 'productId') ? undefined : json['productId'],
        'channels': !exists(json, 'channels') ? undefined : json['channels'],
    };
}

export function OptimaCampaignEditorApplicationCommonMessagesViewModelsCampaignListItemVmToJSON(value?: OptimaCampaignEditorApplicationCommonMessagesViewModelsCampaignListItemVm | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'startDate': value.startDate === undefined ? undefined : (value.startDate.toISOString()),
        'endDate': value.endDate === undefined ? undefined : (value.endDate.toISOString()),
        'realStartDate': value.realStartDate === undefined ? undefined : (value.realStartDate === null ? null : value.realStartDate.toISOString()),
        'realEndDate': value.realEndDate === undefined ? undefined : (value.realEndDate === null ? null : value.realEndDate.toISOString()),
        'technicalName': value.technicalName,
        'createdDate': value.createdDate === undefined ? undefined : (value.createdDate.toISOString()),
        'createdBy': value.createdBy,
        'modifiedDate': value.modifiedDate === undefined ? undefined : (value.modifiedDate === null ? null : value.modifiedDate.toISOString()),
        'modifiedBy': value.modifiedBy,
        'responsible': value.responsible,
        'statusId': value.statusId,
        'canBeSendOutToTestGroup': value.canBeSendOutToTestGroup,
        'canApprove': value.canApprove,
        'canDisapprove': value.canDisapprove,
        'canDelete': value.canDelete,
        'canStart': value.canStart,
        'canStop': value.canStop,
        'productId': value.productId,
        'channels': value.channels,
    };
}

