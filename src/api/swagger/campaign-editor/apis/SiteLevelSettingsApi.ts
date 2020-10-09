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


import * as runtime from '../runtime';
import {
    OrderByType,
    OrderByTypeFromJSON,
    OrderByTypeToJSON,
    SiteLevelSettingVm,
    SiteLevelSettingVmFromJSON,
    SiteLevelSettingVmToJSON,
    SiteLevelSettingVmPaginatedSearchResponse,
    SiteLevelSettingVmPaginatedSearchResponseFromJSON,
    SiteLevelSettingVmPaginatedSearchResponseToJSON,
    UpdateSiteLevelSettingCommand,
    UpdateSiteLevelSettingCommandFromJSON,
    UpdateSiteLevelSettingCommandToJSON,
} from '../models';

export interface GetSiteLevelSettingRequest {
    id: number;
}

export interface GetSiteLevelSettingsRequest {
    name?: string;
    skip?: number;
    take?: number;
    orderBy?: string;
    ids?: Array<number>;
    page?: number;
    pageSize?: number;
    orderByType?: OrderByType;
}

export interface UpdateSiteLevelSettingRequest {
    id: number;
    updateSiteLevelSettingCommand?: UpdateSiteLevelSettingCommand;
}

/**
 * no description
 */
export class SiteLevelSettingsApi extends runtime.BaseAPI {

    /**
     * Get site level setting by id
     */
    async getSiteLevelSettingRaw(requestParameters: GetSiteLevelSettingRequest): Promise<runtime.ApiResponse<SiteLevelSettingVm>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getSiteLevelSetting.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/SiteLevelSettings/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => SiteLevelSettingVmFromJSON(jsonValue));
    }

    /**
     * Get site level setting by id
     */
    async getSiteLevelSetting(requestParameters: GetSiteLevelSettingRequest): Promise<SiteLevelSettingVm> {
        const response = await this.getSiteLevelSettingRaw(requestParameters);
        return await response.value();
    }

    /**
     * Get all site level settings
     */
    async getSiteLevelSettingsRaw(requestParameters: GetSiteLevelSettingsRequest): Promise<runtime.ApiResponse<SiteLevelSettingVmPaginatedSearchResponse>> {
        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.name !== undefined) {
            queryParameters['Name'] = requestParameters.name;
        }

        if (requestParameters.skip !== undefined) {
            queryParameters['Skip'] = requestParameters.skip;
        }

        if (requestParameters.take !== undefined) {
            queryParameters['Take'] = requestParameters.take;
        }

        if (requestParameters.orderBy !== undefined) {
            queryParameters['OrderBy'] = requestParameters.orderBy;
        }

        if (requestParameters.ids) {
            queryParameters['Ids'] = requestParameters.ids;
        }

        if (requestParameters.page !== undefined) {
            queryParameters['Page'] = requestParameters.page;
        }

        if (requestParameters.pageSize !== undefined) {
            queryParameters['PageSize'] = requestParameters.pageSize;
        }

        if (requestParameters.orderByType !== undefined) {
            queryParameters['OrderByType'] = requestParameters.orderByType;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/SiteLevelSettings`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => SiteLevelSettingVmPaginatedSearchResponseFromJSON(jsonValue));
    }

    /**
     * Get all site level settings
     */
    async getSiteLevelSettings(requestParameters: GetSiteLevelSettingsRequest): Promise<SiteLevelSettingVmPaginatedSearchResponse> {
        const response = await this.getSiteLevelSettingsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Update site level setting item
     */
    async updateSiteLevelSettingRaw(requestParameters: UpdateSiteLevelSettingRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateSiteLevelSetting.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/SiteLevelSettings/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateSiteLevelSettingCommandToJSON(requestParameters.updateSiteLevelSettingCommand),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Update site level setting item
     */
    async updateSiteLevelSetting(requestParameters: UpdateSiteLevelSettingRequest): Promise<void> {
        await this.updateSiteLevelSettingRaw(requestParameters);
    }

}
