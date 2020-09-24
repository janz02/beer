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
    AdGroupVm,
    AdGroupVmFromJSON,
    AdGroupVmFromJSONTyped,
    AdGroupVmToJSON,
} from './';

/**
 * 
 * @export
 * @interface AdGroupVmPaginatedSearchResponse
 */
export interface AdGroupVmPaginatedSearchResponse {
    /**
     * 
     * @type {Array<AdGroupVm>}
     * @memberof AdGroupVmPaginatedSearchResponse
     */
    items?: Array<AdGroupVm> | null;
    /**
     * 
     * @type {number}
     * @memberof AdGroupVmPaginatedSearchResponse
     */
    totalCount?: number;
    /**
     * 
     * @type {number}
     * @memberof AdGroupVmPaginatedSearchResponse
     */
    from?: number;
    /**
     * 
     * @type {number}
     * @memberof AdGroupVmPaginatedSearchResponse
     */
    to?: number;
    /**
     * 
     * @type {number}
     * @memberof AdGroupVmPaginatedSearchResponse
     */
    page?: number;
    /**
     * 
     * @type {number}
     * @memberof AdGroupVmPaginatedSearchResponse
     */
    pageSize?: number;
}

export function AdGroupVmPaginatedSearchResponseFromJSON(json: any): AdGroupVmPaginatedSearchResponse {
    return AdGroupVmPaginatedSearchResponseFromJSONTyped(json, false);
}

export function AdGroupVmPaginatedSearchResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): AdGroupVmPaginatedSearchResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'items': !exists(json, 'items') ? undefined : (json['items'] === null ? null : (json['items'] as Array<any>).map(AdGroupVmFromJSON)),
        'totalCount': !exists(json, 'totalCount') ? undefined : json['totalCount'],
        'from': !exists(json, 'from') ? undefined : json['from'],
        'to': !exists(json, 'to') ? undefined : json['to'],
        'page': !exists(json, 'page') ? undefined : json['page'],
        'pageSize': !exists(json, 'pageSize') ? undefined : json['pageSize'],
    };
}

export function AdGroupVmPaginatedSearchResponseToJSON(value?: AdGroupVmPaginatedSearchResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'items': value.items === undefined ? undefined : (value.items === null ? null : (value.items as Array<any>).map(AdGroupVmToJSON)),
        'totalCount': value.totalCount,
        'from': value.from,
        'to': value.to,
        'page': value.page,
        'pageSize': value.pageSize,
    };
}


