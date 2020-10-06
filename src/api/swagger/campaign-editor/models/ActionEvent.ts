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
    ExtendedProperty,
    ExtendedPropertyFromJSON,
    ExtendedPropertyFromJSONTyped,
    ExtendedPropertyToJSON,
} from './';

/**
 * 
 * @export
 * @interface ActionEvent
 */
export interface ActionEvent {
    /**
     * 
     * @type {string}
     * @memberof ActionEvent
     */
    readonly eventId?: string;
    /**
     * 
     * @type {string}
     * @memberof ActionEvent
     */
    readonly eventType?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ActionEvent
     */
    readonly sourceSystemId?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ActionEvent
     */
    readonly userId?: string | null;
    /**
     * 
     * @type {Array<ExtendedProperty>}
     * @memberof ActionEvent
     */
    readonly extendedAttributes?: Array<ExtendedProperty> | null;
}

export function ActionEventFromJSON(json: any): ActionEvent {
    return ActionEventFromJSONTyped(json, false);
}

export function ActionEventFromJSONTyped(json: any, ignoreDiscriminator: boolean): ActionEvent {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'eventId': !exists(json, 'eventId') ? undefined : json['eventId'],
        'eventType': !exists(json, 'eventType') ? undefined : json['eventType'],
        'sourceSystemId': !exists(json, 'sourceSystemId') ? undefined : json['sourceSystemId'],
        'userId': !exists(json, 'userId') ? undefined : json['userId'],
        'extendedAttributes': !exists(json, 'extendedAttributes') ? undefined : (json['extendedAttributes'] === null ? null : (json['extendedAttributes'] as Array<any>).map(ExtendedPropertyFromJSON)),
    };
}

export function ActionEventToJSON(value?: ActionEvent | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
    };
}

