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
    NKMRTDApplicationModelsSegmentationQueryBuilderFieldConfig,
    NKMRTDApplicationModelsSegmentationQueryBuilderFieldConfigFromJSON,
    NKMRTDApplicationModelsSegmentationQueryBuilderFieldConfigToJSON,
    NKMRTDApplicationModelsViewModelsSegmentationQueryResultVm,
    NKMRTDApplicationModelsViewModelsSegmentationQueryResultVmFromJSON,
    NKMRTDApplicationModelsViewModelsSegmentationQueryResultVmToJSON,
    NKMRTDApplicationModelsViewModelsSegmentationQueryVm,
    NKMRTDApplicationModelsViewModelsSegmentationQueryVmFromJSON,
    NKMRTDApplicationModelsViewModelsSegmentationQueryVmToJSON,
    NKMRTDCampaignEditorSegmentationQueriesQueriesQuerySegmentationQueriesQuerySegmentationQueriesQuery,
    NKMRTDCampaignEditorSegmentationQueriesQueriesQuerySegmentationQueriesQuerySegmentationQueriesQueryFromJSON,
    NKMRTDCampaignEditorSegmentationQueriesQueriesQuerySegmentationQueriesQuerySegmentationQueriesQueryToJSON,
} from '../models';

export interface GetMergeTagsSegmentationQueriesRequest {
    language: string;
}

export interface GetSegmentationQueryRequest {
    segmentationId: number;
}

export interface QuerySegmentationQueriesRequest {
    nKMRTDCampaignEditorSegmentationQueriesQueriesQuerySegmentationQueriesQuerySegmentationQueriesQuery?: NKMRTDCampaignEditorSegmentationQueriesQueriesQuerySegmentationQueriesQuerySegmentationQueriesQuery;
}

/**
 * no description
 */
export class SegmentationQueriesApi extends runtime.BaseAPI {

    /**
     * For further infromation https://github.com/ukrbublik/react-awesome-query-builder
     * Returns the configuration for the frontend controllers.
     */
    async getConfigSegmentationQueryRaw(): Promise<runtime.ApiResponse<NKMRTDApplicationModelsSegmentationQueryBuilderFieldConfig>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/SegmentationQueries/QueryBuilderConfig`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => NKMRTDApplicationModelsSegmentationQueryBuilderFieldConfigFromJSON(jsonValue));
    }

    /**
     * For further infromation https://github.com/ukrbublik/react-awesome-query-builder
     * Returns the configuration for the frontend controllers.
     */
    async getConfigSegmentationQuery(): Promise<NKMRTDApplicationModelsSegmentationQueryBuilderFieldConfig> {
        const response = await this.getConfigSegmentationQueryRaw();
        return await response.value();
    }

    /**
     * Returns a dictionary of user merge tags.  Keys are displayable texts, values are column names from the top level table of the query builder config.
     */
    async getMergeTagsSegmentationQueriesRaw(requestParameters: GetMergeTagsSegmentationQueriesRequest): Promise<runtime.ApiResponse<{ [key: string]: string; }>> {
        if (requestParameters.language === null || requestParameters.language === undefined) {
            throw new runtime.RequiredError('language','Required parameter requestParameters.language was null or undefined when calling getMergeTagsSegmentationQueries.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/SegmentationQueries/MergeTags/{language}`.replace(`{${"language"}}`, encodeURIComponent(String(requestParameters.language))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Returns a dictionary of user merge tags.  Keys are displayable texts, values are column names from the top level table of the query builder config.
     */
    async getMergeTagsSegmentationQueries(requestParameters: GetMergeTagsSegmentationQueriesRequest): Promise<{ [key: string]: string; }> {
        const response = await this.getMergeTagsSegmentationQueriesRaw(requestParameters);
        return await response.value();
    }

    /**
     * Gets the requested query, identified by segmentationId.
     */
    async getSegmentationQueryRaw(requestParameters: GetSegmentationQueryRequest): Promise<runtime.ApiResponse<NKMRTDApplicationModelsViewModelsSegmentationQueryVm>> {
        if (requestParameters.segmentationId === null || requestParameters.segmentationId === undefined) {
            throw new runtime.RequiredError('segmentationId','Required parameter requestParameters.segmentationId was null or undefined when calling getSegmentationQuery.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/SegmentationQueries/Get/{segmentationId}`.replace(`{${"segmentationId"}}`, encodeURIComponent(String(requestParameters.segmentationId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => NKMRTDApplicationModelsViewModelsSegmentationQueryVmFromJSON(jsonValue));
    }

    /**
     * Gets the requested query, identified by segmentationId.
     */
    async getSegmentationQuery(requestParameters: GetSegmentationQueryRequest): Promise<NKMRTDApplicationModelsViewModelsSegmentationQueryVm> {
        const response = await this.getSegmentationQueryRaw(requestParameters);
        return await response.value();
    }

    /**
     * Used to query the backend for the actual result of a query builder tree/query  Due to known limitations of the GET request, URL max length, used with POST   to bypass the limitations. As much as GET body request is not well supported,  this violation was introduced.
     */
    async querySegmentationQueriesRaw(requestParameters: QuerySegmentationQueriesRequest): Promise<runtime.ApiResponse<Array<NKMRTDApplicationModelsViewModelsSegmentationQueryResultVm>>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/SegmentationQueries/Query`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: NKMRTDCampaignEditorSegmentationQueriesQueriesQuerySegmentationQueriesQuerySegmentationQueriesQueryToJSON(requestParameters.nKMRTDCampaignEditorSegmentationQueriesQueriesQuerySegmentationQueriesQuerySegmentationQueriesQuery),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(NKMRTDApplicationModelsViewModelsSegmentationQueryResultVmFromJSON));
    }

    /**
     * Used to query the backend for the actual result of a query builder tree/query  Due to known limitations of the GET request, URL max length, used with POST   to bypass the limitations. As much as GET body request is not well supported,  this violation was introduced.
     */
    async querySegmentationQueries(requestParameters: QuerySegmentationQueriesRequest): Promise<Array<NKMRTDApplicationModelsViewModelsSegmentationQueryResultVm>> {
        const response = await this.querySegmentationQueriesRaw(requestParameters);
        return await response.value();
    }

}
