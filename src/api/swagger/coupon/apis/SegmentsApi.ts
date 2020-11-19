/* tslint:disable */
/* eslint-disable */
/**
 * Optima Coupon
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
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
    CreateSegmentationCommand,
    CreateSegmentationCommandFromJSON,
    CreateSegmentationCommandToJSON,
    OrderByType,
    OrderByTypeFromJSON,
    OrderByTypeToJSON,
    ProblemDetails,
    ProblemDetailsFromJSON,
    ProblemDetailsToJSON,
    SegmentVmPaginatedResponse,
    SegmentVmPaginatedResponseFromJSON,
    SegmentVmPaginatedResponseToJSON,
} from '../models';

export interface DeleteSegmentRequest {
    id?: number;
    xOPTIMATransactionGuid?: string;
}

export interface GetSegmentsRequest {
    segmentName?: string | null;
    page?: number;
    pageSize?: number;
    orderBy?: string | null;
    orderByType?: OrderByType;
    xOPTIMATransactionGuid?: string;
}

export interface UpsertSegmentsRequest {
    xOPTIMATransactionGuid?: string;
    createSegmentationCommand?: CreateSegmentationCommand;
}

/**
 * no description
 */
export class SegmentsApi extends runtime.BaseAPI {

    /**
     */
    async deleteSegmentRaw(requestParameters: DeleteSegmentRequest): Promise<runtime.ApiResponse<void>> {
        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.id !== undefined) {
            queryParameters['id'] = requestParameters.id;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.xOPTIMATransactionGuid !== undefined && requestParameters.xOPTIMATransactionGuid !== null) {
            headerParameters['X-OPTIMA-Transaction-Guid'] = String(requestParameters.xOPTIMATransactionGuid);
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Segments`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async deleteSegment(requestParameters: DeleteSegmentRequest): Promise<void> {
        await this.deleteSegmentRaw(requestParameters);
    }

    /**
     */
    async getSegmentsRaw(requestParameters: GetSegmentsRequest): Promise<runtime.ApiResponse<SegmentVmPaginatedResponse>> {
        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.segmentName !== undefined) {
            queryParameters['segmentName'] = requestParameters.segmentName;
        }

        if (requestParameters.page !== undefined) {
            queryParameters['page'] = requestParameters.page;
        }

        if (requestParameters.pageSize !== undefined) {
            queryParameters['pageSize'] = requestParameters.pageSize;
        }

        if (requestParameters.orderBy !== undefined) {
            queryParameters['orderBy'] = requestParameters.orderBy;
        }

        if (requestParameters.orderByType !== undefined) {
            queryParameters['orderByType'] = requestParameters.orderByType;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.xOPTIMATransactionGuid !== undefined && requestParameters.xOPTIMATransactionGuid !== null) {
            headerParameters['X-OPTIMA-Transaction-Guid'] = String(requestParameters.xOPTIMATransactionGuid);
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Segments`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => SegmentVmPaginatedResponseFromJSON(jsonValue));
    }

    /**
     */
    async getSegments(requestParameters: GetSegmentsRequest): Promise<SegmentVmPaginatedResponse> {
        const response = await this.getSegmentsRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async upsertSegmentsRaw(requestParameters: UpsertSegmentsRequest): Promise<runtime.ApiResponse<Array<number>>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (requestParameters.xOPTIMATransactionGuid !== undefined && requestParameters.xOPTIMATransactionGuid !== null) {
            headerParameters['X-OPTIMA-Transaction-Guid'] = String(requestParameters.xOPTIMATransactionGuid);
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Segments`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: CreateSegmentationCommandToJSON(requestParameters.createSegmentationCommand),
        });

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     */
    async upsertSegments(requestParameters: UpsertSegmentsRequest): Promise<Array<number>> {
        const response = await this.upsertSegmentsRaw(requestParameters);
        return await response.value();
    }

}
