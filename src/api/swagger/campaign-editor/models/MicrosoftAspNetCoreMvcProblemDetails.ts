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
 * @interface MicrosoftAspNetCoreMvcProblemDetails
 */
export interface MicrosoftAspNetCoreMvcProblemDetails {
    [key: string]: object | any;
    /**
     * 
     * @type {string}
     * @memberof MicrosoftAspNetCoreMvcProblemDetails
     */
    type?: string | null;
    /**
     * 
     * @type {string}
     * @memberof MicrosoftAspNetCoreMvcProblemDetails
     */
    title?: string | null;
    /**
     * 
     * @type {number}
     * @memberof MicrosoftAspNetCoreMvcProblemDetails
     */
    status?: number | null;
    /**
     * 
     * @type {string}
     * @memberof MicrosoftAspNetCoreMvcProblemDetails
     */
    detail?: string | null;
    /**
     * 
     * @type {string}
     * @memberof MicrosoftAspNetCoreMvcProblemDetails
     */
    instance?: string | null;
}

export function MicrosoftAspNetCoreMvcProblemDetailsFromJSON(json: any): MicrosoftAspNetCoreMvcProblemDetails {
    return MicrosoftAspNetCoreMvcProblemDetailsFromJSONTyped(json, false);
}

export function MicrosoftAspNetCoreMvcProblemDetailsFromJSONTyped(json: any, ignoreDiscriminator: boolean): MicrosoftAspNetCoreMvcProblemDetails {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
            ...json,
        'type': !exists(json, 'type') ? undefined : json['type'],
        'title': !exists(json, 'title') ? undefined : json['title'],
        'status': !exists(json, 'status') ? undefined : json['status'],
        'detail': !exists(json, 'detail') ? undefined : json['detail'],
        'instance': !exists(json, 'instance') ? undefined : json['instance'],
    };
}

export function MicrosoftAspNetCoreMvcProblemDetailsToJSON(value?: MicrosoftAspNetCoreMvcProblemDetails | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
            ...value,
        'type': value.type,
        'title': value.title,
        'status': value.status,
        'detail': value.detail,
        'instance': value.instance,
    };
}


