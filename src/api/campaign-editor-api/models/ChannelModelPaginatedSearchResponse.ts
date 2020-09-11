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
    ChannelModel,
    ChannelModelFromJSON,
    ChannelModelFromJSONTyped,
    ChannelModelToJSON,
} from './';

/**
 * 
 * @export
 * @interface ChannelModelPaginatedSearchResponse
 */
export interface ChannelModelPaginatedSearchResponse {
    /**
     * 
     * @type {Array<ChannelModel>}
     * @memberof ChannelModelPaginatedSearchResponse
     */
    items?: Array<ChannelModel> | null;
    /**
     * 
     * @type {number}
     * @memberof ChannelModelPaginatedSearchResponse
     */
    totalCount?: number;
}

export function ChannelModelPaginatedSearchResponseFromJSON(json: any): ChannelModelPaginatedSearchResponse {
    return ChannelModelPaginatedSearchResponseFromJSONTyped(json, false);
}

export function ChannelModelPaginatedSearchResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ChannelModelPaginatedSearchResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'items': !exists(json, 'items') ? undefined : (json['items'] === null ? null : (json['items'] as Array<any>).map(ChannelModelFromJSON)),
        'totalCount': !exists(json, 'totalCount') ? undefined : json['totalCount'],
    };
}

export function ChannelModelPaginatedSearchResponseToJSON(value?: ChannelModelPaginatedSearchResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'items': value.items === undefined ? undefined : (value.items === null ? null : (value.items as Array<any>).map(ChannelModelToJSON)),
        'totalCount': value.totalCount,
    };
}


