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
 * @interface CampaignListItemVm
 */
export interface CampaignListItemVm {
    /**
     * 
     * @type {number}
     * @memberof CampaignListItemVm
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof CampaignListItemVm
     */
    name?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof CampaignListItemVm
     */
    startDate?: Date;
    /**
     * 
     * @type {Date}
     * @memberof CampaignListItemVm
     */
    endDate?: Date;
    /**
     * 
     * @type {Date}
     * @memberof CampaignListItemVm
     */
    realStartDate?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof CampaignListItemVm
     */
    realEndDate?: Date | null;
    /**
     * 
     * @type {string}
     * @memberof CampaignListItemVm
     */
    technicalName?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof CampaignListItemVm
     */
    createdDate?: Date;
    /**
     * 
     * @type {string}
     * @memberof CampaignListItemVm
     */
    createdBy?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof CampaignListItemVm
     */
    modifiedDate?: Date | null;
    /**
     * 
     * @type {string}
     * @memberof CampaignListItemVm
     */
    modifiedBy?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CampaignListItemVm
     */
    responsible?: string | null;
    /**
     * 
     * @type {number}
     * @memberof CampaignListItemVm
     */
    statusId?: number;
    /**
     * 
     * @type {boolean}
     * @memberof CampaignListItemVm
     */
    canBeSendOutToTestGroup?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CampaignListItemVm
     */
    canApprove?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CampaignListItemVm
     */
    canDisapprove?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CampaignListItemVm
     */
    canDelete?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CampaignListItemVm
     */
    canStart?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CampaignListItemVm
     */
    canStop?: boolean;
    /**
     * 
     * @type {number}
     * @memberof CampaignListItemVm
     */
    productId?: number;
    /**
     * 
     * @type {Array<number>}
     * @memberof CampaignListItemVm
     */
    channels?: Array<number> | null;
}

export function CampaignListItemVmFromJSON(json: any): CampaignListItemVm {
    return CampaignListItemVmFromJSONTyped(json, false);
}

export function CampaignListItemVmFromJSONTyped(json: any, ignoreDiscriminator: boolean): CampaignListItemVm {
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

export function CampaignListItemVmToJSON(value?: CampaignListItemVm | null): any {
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


