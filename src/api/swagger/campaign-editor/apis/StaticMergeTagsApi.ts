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
    MicrosoftAspNetCoreMvcProblemDetails,
    MicrosoftAspNetCoreMvcProblemDetailsFromJSON,
    MicrosoftAspNetCoreMvcProblemDetailsToJSON,
    NKMRTDCampaignEditorApplicationCommonMessagesEnumsOrderByType,
    NKMRTDCampaignEditorApplicationCommonMessagesEnumsOrderByTypeFromJSON,
    NKMRTDCampaignEditorApplicationCommonMessagesEnumsOrderByTypeToJSON,
    NKMRTDCampaignEditorApplicationCommonMessagesResponsesPaginatedSearchResponseOfNKMRTDCampaignEditorApplicationCommonMessagesViewModelsStaticMergeTagVm,
    NKMRTDCampaignEditorApplicationCommonMessagesResponsesPaginatedSearchResponseOfNKMRTDCampaignEditorApplicationCommonMessagesViewModelsStaticMergeTagVmFromJSON,
    NKMRTDCampaignEditorApplicationCommonMessagesResponsesPaginatedSearchResponseOfNKMRTDCampaignEditorApplicationCommonMessagesViewModelsStaticMergeTagVmToJSON,
    NKMRTDCampaignEditorApplicationCommonMessagesViewModelsStaticMergeTagVm,
    NKMRTDCampaignEditorApplicationCommonMessagesViewModelsStaticMergeTagVmFromJSON,
    NKMRTDCampaignEditorApplicationCommonMessagesViewModelsStaticMergeTagVmToJSON,
    NKMRTDCampaignEditorApplicationModelsCampaignCreateStaticMergeTagCommand,
    NKMRTDCampaignEditorApplicationModelsCampaignCreateStaticMergeTagCommandFromJSON,
    NKMRTDCampaignEditorApplicationModelsCampaignCreateStaticMergeTagCommandToJSON,
    NKMRTDCampaignEditorApplicationModelsCampaignUpdateStaticMergeTagCommand,
    NKMRTDCampaignEditorApplicationModelsCampaignUpdateStaticMergeTagCommandFromJSON,
    NKMRTDCampaignEditorApplicationModelsCampaignUpdateStaticMergeTagCommandToJSON,
} from '../models';

export interface CreateStaticMergeTagRequest {
    nKMRTDCampaignEditorApplicationModelsCampaignCreateStaticMergeTagCommand?: NKMRTDCampaignEditorApplicationModelsCampaignCreateStaticMergeTagCommand;
}

export interface DeleteStaticMergeTagRequest {
    id: number;
}

export interface GetManyStaticMergeTagsRequest {
    ids?: Array<number>;
}

export interface GetStaticMergeTagRequest {
    id: number;
}

export interface GetStaticMergeTagsRequest {
    name?: string;
    value?: string;
    skip?: number;
    take?: number;
    orderBy?: string;
    ids?: Array<number>;
    page?: number;
    pageSize?: number;
    orderByType?: NKMRTDCampaignEditorApplicationCommonMessagesEnumsOrderByType;
}

export interface UpdateStaticMergeTagRequest {
    id: number;
    nKMRTDCampaignEditorApplicationModelsCampaignUpdateStaticMergeTagCommand?: NKMRTDCampaignEditorApplicationModelsCampaignUpdateStaticMergeTagCommand;
}

/**
 * no description
 */
export class StaticMergeTagsApi extends runtime.BaseAPI {

    /**
     * Creates a StaticMergeTag, returning its id.
     */
    async createStaticMergeTagRaw(requestParameters: CreateStaticMergeTagRequest): Promise<runtime.ApiResponse<number>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/StaticMergeTags/Create`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: NKMRTDCampaignEditorApplicationModelsCampaignCreateStaticMergeTagCommandToJSON(requestParameters.nKMRTDCampaignEditorApplicationModelsCampaignCreateStaticMergeTagCommand),
        });

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     * Creates a StaticMergeTag, returning its id.
     */
    async createStaticMergeTag(requestParameters: CreateStaticMergeTagRequest): Promise<number> {
        const response = await this.createStaticMergeTagRaw(requestParameters);
        return await response.value();
    }

    /**
     * Deletes the item identified by id.
     */
    async deleteStaticMergeTagRaw(requestParameters: DeleteStaticMergeTagRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteStaticMergeTag.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/StaticMergeTags/Delete/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Deletes the item identified by id.
     */
    async deleteStaticMergeTag(requestParameters: DeleteStaticMergeTagRequest): Promise<void> {
        await this.deleteStaticMergeTagRaw(requestParameters);
    }

    /**
     * Returns the StaticMergeTags identified by the ids.
     */
    async getManyStaticMergeTagsRaw(requestParameters: GetManyStaticMergeTagsRequest): Promise<runtime.ApiResponse<Array<NKMRTDCampaignEditorApplicationCommonMessagesViewModelsStaticMergeTagVm>>> {
        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.ids) {
            queryParameters['ids'] = requestParameters.ids;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/StaticMergeTags/GetMany/many`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(NKMRTDCampaignEditorApplicationCommonMessagesViewModelsStaticMergeTagVmFromJSON));
    }

    /**
     * Returns the StaticMergeTags identified by the ids.
     */
    async getManyStaticMergeTags(requestParameters: GetManyStaticMergeTagsRequest): Promise<Array<NKMRTDCampaignEditorApplicationCommonMessagesViewModelsStaticMergeTagVm>> {
        const response = await this.getManyStaticMergeTagsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Gets the requested instance, identified by id.
     */
    async getStaticMergeTagRaw(requestParameters: GetStaticMergeTagRequest): Promise<runtime.ApiResponse<NKMRTDCampaignEditorApplicationCommonMessagesViewModelsStaticMergeTagVm>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getStaticMergeTag.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/StaticMergeTags/GetOne/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => NKMRTDCampaignEditorApplicationCommonMessagesViewModelsStaticMergeTagVmFromJSON(jsonValue));
    }

    /**
     * Gets the requested instance, identified by id.
     */
    async getStaticMergeTag(requestParameters: GetStaticMergeTagRequest): Promise<NKMRTDCampaignEditorApplicationCommonMessagesViewModelsStaticMergeTagVm> {
        const response = await this.getStaticMergeTagRaw(requestParameters);
        return await response.value();
    }

    /**
     * Returns the StaticMergeTags for the actual query.
     */
    async getStaticMergeTagsRaw(requestParameters: GetStaticMergeTagsRequest): Promise<runtime.ApiResponse<NKMRTDCampaignEditorApplicationCommonMessagesResponsesPaginatedSearchResponseOfNKMRTDCampaignEditorApplicationCommonMessagesViewModelsStaticMergeTagVm>> {
        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.name !== undefined) {
            queryParameters['Name'] = requestParameters.name;
        }

        if (requestParameters.value !== undefined) {
            queryParameters['Value'] = requestParameters.value;
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
            path: `/api/StaticMergeTags/GetAll`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => NKMRTDCampaignEditorApplicationCommonMessagesResponsesPaginatedSearchResponseOfNKMRTDCampaignEditorApplicationCommonMessagesViewModelsStaticMergeTagVmFromJSON(jsonValue));
    }

    /**
     * Returns the StaticMergeTags for the actual query.
     */
    async getStaticMergeTags(requestParameters: GetStaticMergeTagsRequest): Promise<NKMRTDCampaignEditorApplicationCommonMessagesResponsesPaginatedSearchResponseOfNKMRTDCampaignEditorApplicationCommonMessagesViewModelsStaticMergeTagVm> {
        const response = await this.getStaticMergeTagsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Update the current instance with the fulfilled model.
     */
    async updateStaticMergeTagRaw(requestParameters: UpdateStaticMergeTagRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateStaticMergeTag.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/StaticMergeTags/Update/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: NKMRTDCampaignEditorApplicationModelsCampaignUpdateStaticMergeTagCommandToJSON(requestParameters.nKMRTDCampaignEditorApplicationModelsCampaignUpdateStaticMergeTagCommand),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Update the current instance with the fulfilled model.
     */
    async updateStaticMergeTag(requestParameters: UpdateStaticMergeTagRequest): Promise<void> {
        await this.updateStaticMergeTagRaw(requestParameters);
    }

}
