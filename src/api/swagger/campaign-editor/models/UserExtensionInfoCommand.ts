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
 * @interface UserExtensionInfoCommand
 */
export interface UserExtensionInfoCommand {
    /**
     * 
     * @type {number}
     * @memberof UserExtensionInfoCommand
     */
    userDiscriminatorId?: number;
    /**
     * 
     * @type {string}
     * @memberof UserExtensionInfoCommand
     */
    company?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UserExtensionInfoCommand
     */
    department?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UserExtensionInfoCommand
     */
    position?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UserExtensionInfoCommand
     */
    phoneNumber?: string | null;
}

export function UserExtensionInfoCommandFromJSON(json: any): UserExtensionInfoCommand {
    return UserExtensionInfoCommandFromJSONTyped(json, false);
}

export function UserExtensionInfoCommandFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserExtensionInfoCommand {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'userDiscriminatorId': !exists(json, 'userDiscriminatorId') ? undefined : json['userDiscriminatorId'],
        'company': !exists(json, 'company') ? undefined : json['company'],
        'department': !exists(json, 'department') ? undefined : json['department'],
        'position': !exists(json, 'position') ? undefined : json['position'],
        'phoneNumber': !exists(json, 'phoneNumber') ? undefined : json['phoneNumber'],
    };
}

export function UserExtensionInfoCommandToJSON(value?: UserExtensionInfoCommand | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'userDiscriminatorId': value.userDiscriminatorId,
        'company': value.company,
        'department': value.department,
        'position': value.position,
        'phoneNumber': value.phoneNumber,
    };
}

