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
    DiscountModel,
    DiscountModelFromJSON,
    DiscountModelFromJSONTyped,
    DiscountModelToJSON,
    TimeSpan,
    TimeSpanFromJSON,
    TimeSpanFromJSONTyped,
    TimeSpanToJSON,
} from './';

/**
 * 
 * @export
 * @interface TreatmentModel
 */
export interface TreatmentModel {
    /**
     * 
     * @type {number}
     * @memberof TreatmentModel
     */
    id?: number;
    /**
     * 
     * @type {number}
     * @memberof TreatmentModel
     */
    campaignId?: number;
    /**
     * 
     * @type {number}
     * @memberof TreatmentModel
     */
    channelId?: number;
    /**
     * 
     * @type {Date}
     * @memberof TreatmentModel
     */
    startDate?: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof TreatmentModel
     */
    endDate?: Date | null;
    /**
     * 
     * @type {TimeSpan}
     * @memberof TreatmentModel
     */
    startTime?: TimeSpan | null;
    /**
     * 
     * @type {TimeSpan}
     * @memberof TreatmentModel
     */
    endTime?: TimeSpan | null;
    /**
     * 
     * @type {Array<number>}
     * @memberof TreatmentModel
     */
    emailTimeRules?: Array<number> | null;
    /**
     * 
     * @type {Array<number>}
     * @memberof TreatmentModel
     */
    emailResendRules?: Array<number> | null;
    /**
     * 
     * @type {number}
     * @memberof TreatmentModel
     */
    emailMaxResends?: number;
    /**
     * 
     * @type {number}
     * @memberof TreatmentModel
     */
    emailResendFrequency?: number;
    /**
     * 
     * @type {Array<number>}
     * @memberof TreatmentModel
     */
    phoneTimeRules?: Array<number> | null;
    /**
     * 
     * @type {Array<number>}
     * @memberof TreatmentModel
     */
    phoneRecallRules?: Array<number> | null;
    /**
     * 
     * @type {number}
     * @memberof TreatmentModel
     */
    phoneMaxRecalls?: number;
    /**
     * 
     * @type {number}
     * @memberof TreatmentModel
     */
    phoneRecallFrequency?: number;
    /**
     * 
     * @type {Array<DiscountModel>}
     * @memberof TreatmentModel
     */
    discounts?: Array<DiscountModel> | null;
}

export function TreatmentModelFromJSON(json: any): TreatmentModel {
    return TreatmentModelFromJSONTyped(json, false);
}

export function TreatmentModelFromJSONTyped(json: any, ignoreDiscriminator: boolean): TreatmentModel {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'campaignId': !exists(json, 'campaignId') ? undefined : json['campaignId'],
        'channelId': !exists(json, 'channelId') ? undefined : json['channelId'],
        'startDate': !exists(json, 'startDate') ? undefined : (json['startDate'] === null ? null : new Date(json['startDate'])),
        'endDate': !exists(json, 'endDate') ? undefined : (json['endDate'] === null ? null : new Date(json['endDate'])),
        'startTime': !exists(json, 'startTime') ? undefined : TimeSpanFromJSON(json['startTime']),
        'endTime': !exists(json, 'endTime') ? undefined : TimeSpanFromJSON(json['endTime']),
        'emailTimeRules': !exists(json, 'emailTimeRules') ? undefined : json['emailTimeRules'],
        'emailResendRules': !exists(json, 'emailResendRules') ? undefined : json['emailResendRules'],
        'emailMaxResends': !exists(json, 'emailMaxResends') ? undefined : json['emailMaxResends'],
        'emailResendFrequency': !exists(json, 'emailResendFrequency') ? undefined : json['emailResendFrequency'],
        'phoneTimeRules': !exists(json, 'phoneTimeRules') ? undefined : json['phoneTimeRules'],
        'phoneRecallRules': !exists(json, 'phoneRecallRules') ? undefined : json['phoneRecallRules'],
        'phoneMaxRecalls': !exists(json, 'phoneMaxRecalls') ? undefined : json['phoneMaxRecalls'],
        'phoneRecallFrequency': !exists(json, 'phoneRecallFrequency') ? undefined : json['phoneRecallFrequency'],
        'discounts': !exists(json, 'discounts') ? undefined : (json['discounts'] === null ? null : (json['discounts'] as Array<any>).map(DiscountModelFromJSON)),
    };
}

export function TreatmentModelToJSON(value?: TreatmentModel | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'campaignId': value.campaignId,
        'channelId': value.channelId,
        'startDate': value.startDate === undefined ? undefined : (value.startDate === null ? null : value.startDate.toISOString()),
        'endDate': value.endDate === undefined ? undefined : (value.endDate === null ? null : value.endDate.toISOString()),
        'startTime': TimeSpanToJSON(value.startTime),
        'endTime': TimeSpanToJSON(value.endTime),
        'emailTimeRules': value.emailTimeRules,
        'emailResendRules': value.emailResendRules,
        'emailMaxResends': value.emailMaxResends,
        'emailResendFrequency': value.emailResendFrequency,
        'phoneTimeRules': value.phoneTimeRules,
        'phoneRecallRules': value.phoneRecallRules,
        'phoneMaxRecalls': value.phoneMaxRecalls,
        'phoneRecallFrequency': value.phoneRecallFrequency,
        'discounts': value.discounts === undefined ? undefined : (value.discounts === null ? null : (value.discounts as Array<any>).map(DiscountModelToJSON)),
    };
}


