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
 * @interface ForgotPasswordRequest
 */
export interface ForgotPasswordRequest {
    /**
     * Email address that identifies the standalone user
     * @type {string}
     * @memberof ForgotPasswordRequest
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof ForgotPasswordRequest
     */
    captchaToken?: string | null;
}

export function ForgotPasswordRequestFromJSON(json: any): ForgotPasswordRequest {
    return ForgotPasswordRequestFromJSONTyped(json, false);
}

export function ForgotPasswordRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): ForgotPasswordRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'email': json['email'],
        'captchaToken': !exists(json, 'captchaToken') ? undefined : json['captchaToken'],
    };
}

export function ForgotPasswordRequestToJSON(value?: ForgotPasswordRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'email': value.email,
        'captchaToken': value.captchaToken,
    };
}


