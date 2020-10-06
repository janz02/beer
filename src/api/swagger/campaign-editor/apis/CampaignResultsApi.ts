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
    CampaignResultEventVmPaginatedSearchResponse,
    CampaignResultEventVmPaginatedSearchResponseFromJSON,
    CampaignResultEventVmPaginatedSearchResponseToJSON,
    OrderByType,
    OrderByTypeFromJSON,
    OrderByTypeToJSON,
    UploadCsvCommand,
    UploadCsvCommandFromJSON,
    UploadCsvCommandToJSON,
} from '../models';

export interface DownloadCsvRequest {
    campaignId?: number;
    segmentationId?: number;
}

export interface GetEventsRequest {
    campaignId?: string;
    segmentationId?: string;
    templateId?: string;
    bpId?: string;
    skip?: number;
    take?: number;
    orderBy?: string;
    ids?: Array<number>;
    page?: number;
    pageSize?: number;
    orderByType?: OrderByType;
}

export interface UploadCsvForCampaignResultRequest {
    uploadCsvCommand?: UploadCsvCommand;
}

/**
 * no description
 */
export class CampaignResultsApi extends runtime.BaseAPI {

    /**
     * Download a CSV structured file for a campaign with a given segmentation. Provides   infromations which are already processed only.
     */
    async downloadCsvRaw(requestParameters: DownloadCsvRequest): Promise<runtime.ApiResponse<void>> {
        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.campaignId !== undefined) {
            queryParameters['campaignId'] = requestParameters.campaignId;
        }

        if (requestParameters.segmentationId !== undefined) {
            queryParameters['segmentationId'] = requestParameters.segmentationId;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/CampaignResults/DownloadCsv`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Download a CSV structured file for a campaign with a given segmentation. Provides   infromations which are already processed only.
     */
    async downloadCsv(requestParameters: DownloadCsvRequest): Promise<void> {
        await this.downloadCsvRaw(requestParameters);
    }

    /**
     * Queries for the result information from the database with the given filters and parameters
     */
    async getEventsRaw(requestParameters: GetEventsRequest): Promise<runtime.ApiResponse<CampaignResultEventVmPaginatedSearchResponse>> {
        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.campaignId !== undefined) {
            queryParameters['CampaignId'] = requestParameters.campaignId;
        }

        if (requestParameters.segmentationId !== undefined) {
            queryParameters['SegmentationId'] = requestParameters.segmentationId;
        }

        if (requestParameters.templateId !== undefined) {
            queryParameters['TemplateId'] = requestParameters.templateId;
        }

        if (requestParameters.bpId !== undefined) {
            queryParameters['BpId'] = requestParameters.bpId;
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
            path: `/api/CampaignResults/GetEvents`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => CampaignResultEventVmPaginatedSearchResponseFromJSON(jsonValue));
    }

    /**
     * Queries for the result information from the database with the given filters and parameters
     */
    async getEvents(requestParameters: GetEventsRequest): Promise<CampaignResultEventVmPaginatedSearchResponse> {
        const response = await this.getEventsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Upload the results made for a M:NKM.RTD.CampaignEditor.Controllers.CampaignResultsController.DownloadCsv(System.Int32,System.Int32) request to  a given sharepoint folder. The basic sharepoint configured in the system startup.
     */
    async uploadCsvForCampaignResultRaw(requestParameters: UploadCsvForCampaignResultRequest): Promise<runtime.ApiResponse<void>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json-patch+json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/CampaignResults/UploadCsv`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: UploadCsvCommandToJSON(requestParameters.uploadCsvCommand),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Upload the results made for a M:NKM.RTD.CampaignEditor.Controllers.CampaignResultsController.DownloadCsv(System.Int32,System.Int32) request to  a given sharepoint folder. The basic sharepoint configured in the system startup.
     */
    async uploadCsvForCampaignResult(requestParameters: UploadCsvForCampaignResultRequest): Promise<void> {
        await this.uploadCsvForCampaignResultRaw(requestParameters);
    }

}