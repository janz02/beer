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
    ChannelVm,
    ChannelVmFromJSON,
    ChannelVmFromJSONTyped,
    ChannelVmToJSON,
} from './';

/**
 * 
 * @export
 * @interface ChannelVmPaginatedSearchResponse
 */
export interface ChannelVmPaginatedSearchResponse {
    /**
     * 
     * @type {Array<ChannelVm>}
     * @memberof ChannelVmPaginatedSearchResponse
     */
    items?: Array<ChannelVm> | null;
    /**
     * 
     * @type {number}
     * @memberof ChannelVmPaginatedSearchResponse
     */
    totalCount?: number;
    /**
     * 
     * @type {number}
     * @memberof ChannelVmPaginatedSearchResponse
     */
    from?: number;
    /**
     * 
     * @type {number}
     * @memberof ChannelVmPaginatedSearchResponse
     */
    to?: number;
    /**
     * 
     * @type {number}
     * @memberof ChannelVmPaginatedSearchResponse
     */
    page?: number;
    /**
     * 
     * @type {number}
     * @memberof ChannelVmPaginatedSearchResponse
     */
    pageSize?: number;
}

export function ChannelVmPaginatedSearchResponseFromJSON(json: any): ChannelVmPaginatedSearchResponse {
    return ChannelVmPaginatedSearchResponseFromJSONTyped(json, false);
}

export function ChannelVmPaginatedSearchResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ChannelVmPaginatedSearchResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'items': !exists(json, 'items') ? undefined : (json['items'] === null ? null : (json['items'] as Array<any>).map(ChannelVmFromJSON)),
        'totalCount': !exists(json, 'totalCount') ? undefined : json['totalCount'],
        'from': !exists(json, 'from') ? undefined : json['from'],
        'to': !exists(json, 'to') ? undefined : json['to'],
        'page': !exists(json, 'page') ? undefined : json['page'],
        'pageSize': !exists(json, 'pageSize') ? undefined : json['pageSize'],
    };
}

export function ChannelVmPaginatedSearchResponseToJSON(value?: ChannelVmPaginatedSearchResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'items': value.items === undefined ? undefined : (value.items === null ? null : (value.items as Array<any>).map(ChannelVmToJSON)),
        'totalCount': value.totalCount,
        'from': value.from,
        'to': value.to,
        'page': value.page,
        'pageSize': value.pageSize,
    };
}


