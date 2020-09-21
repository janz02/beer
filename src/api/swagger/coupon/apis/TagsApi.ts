/* tslint:disable */
/* eslint-disable */
/**
 * NKM PKM Coupon Api
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
    Int32EntityCreatedVm,
    Int32EntityCreatedVmFromJSON,
    Int32EntityCreatedVmToJSON,
    OrderByType,
    OrderByTypeFromJSON,
    OrderByTypeToJSON,
    ProblemDetails,
    ProblemDetailsFromJSON,
    ProblemDetailsToJSON,
    TagDto,
    TagDtoFromJSON,
    TagDtoToJSON,
    TagVm,
    TagVmFromJSON,
    TagVmToJSON,
    TagVmPaginatedResponse,
    TagVmPaginatedResponseFromJSON,
    TagVmPaginatedResponseToJSON,
} from '../models';

export interface CreateTagRequest {
    tagDto?: TagDto;
}

export interface DeleteTagRequest {
    id: number;
}

export interface ExportTagsRequest {
    value?: string | null;
    tagCategory?: string | null;
    isActive?: boolean | null;
    page?: number;
    pageSize?: number;
    orderBy?: string | null;
    orderByType?: OrderByType;
}

export interface GetTagRequest {
    id: number;
}

export interface GetTagsRequest {
    value?: string | null;
    tagCategory?: string | null;
    isActive?: boolean | null;
    page?: number;
    pageSize?: number;
    orderBy?: string | null;
    orderByType?: OrderByType;
}

export interface UpdateTagRequest {
    id: number;
    tagDto?: TagDto;
}

/**
 * no description
 */
export class TagsApi extends runtime.BaseAPI {

    /**
     * Returns the id of the Tag upon success
     * Creates a Tag entity
     */
    async createTagRaw(requestParameters: CreateTagRequest): Promise<runtime.ApiResponse<Int32EntityCreatedVm>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Tags`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: TagDtoToJSON(requestParameters.tagDto),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => Int32EntityCreatedVmFromJSON(jsonValue));
    }

    /**
     * Returns the id of the Tag upon success
     * Creates a Tag entity
     */
    async createTag(requestParameters: CreateTagRequest): Promise<Int32EntityCreatedVm> {
        const response = await this.createTagRaw(requestParameters);
        return await response.value();
    }

    /**
     * Deletes the Tag entity with Id of \"id\"
     * Deletes a Tag entity
     */
    async deleteTagRaw(requestParameters: DeleteTagRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteTag.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Tags/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Deletes the Tag entity with Id of \"id\"
     * Deletes a Tag entity
     */
    async deleteTag(requestParameters: DeleteTagRequest): Promise<void> {
        await this.deleteTagRaw(requestParameters);
    }

    /**
     * Exports the Tag list with the specified filters applied in a csv file
     * Exports a Tag entity list sorted and filtered
     */
    async exportTagsRaw(requestParameters: ExportTagsRequest): Promise<runtime.ApiResponse<Blob>> {
        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.value !== undefined) {
            queryParameters['value'] = requestParameters.value;
        }

        if (requestParameters.tagCategory !== undefined) {
            queryParameters['tagCategory'] = requestParameters.tagCategory;
        }

        if (requestParameters.isActive !== undefined) {
            queryParameters['isActive'] = requestParameters.isActive;
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

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Tags/ExportTags`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.BlobApiResponse(response);
    }

    /**
     * Exports the Tag list with the specified filters applied in a csv file
     * Exports a Tag entity list sorted and filtered
     */
    async exportTags(requestParameters: ExportTagsRequest): Promise<Blob> {
        const response = await this.exportTagsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Returns the Tag with the specified Id upon success
     * Gets a Tag entity by Id
     */
    async getTagRaw(requestParameters: GetTagRequest): Promise<runtime.ApiResponse<TagVm>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getTag.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Tags/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => TagVmFromJSON(jsonValue));
    }

    /**
     * Returns the Tag with the specified Id upon success
     * Gets a Tag entity by Id
     */
    async getTag(requestParameters: GetTagRequest): Promise<TagVm> {
        const response = await this.getTagRaw(requestParameters);
        return await response.value();
    }

    /**
     * Returns the Tag list with the specified filters applied
     * Gets a Tag entity list sorted and filtered
     */
    async getTagsRaw(requestParameters: GetTagsRequest): Promise<runtime.ApiResponse<TagVmPaginatedResponse>> {
        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.value !== undefined) {
            queryParameters['value'] = requestParameters.value;
        }

        if (requestParameters.tagCategory !== undefined) {
            queryParameters['tagCategory'] = requestParameters.tagCategory;
        }

        if (requestParameters.isActive !== undefined) {
            queryParameters['isActive'] = requestParameters.isActive;
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

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Tags`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => TagVmPaginatedResponseFromJSON(jsonValue));
    }

    /**
     * Returns the Tag list with the specified filters applied
     * Gets a Tag entity list sorted and filtered
     */
    async getTags(requestParameters: GetTagsRequest): Promise<TagVmPaginatedResponse> {
        const response = await this.getTagsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Updates a Tag entity with Id of \"id\" to entity \"category\"
     * Updates a Tag entity
     */
    async updateTagRaw(requestParameters: UpdateTagRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateTag.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Tags/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: TagDtoToJSON(requestParameters.tagDto),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Updates a Tag entity with Id of \"id\" to entity \"category\"
     * Updates a Tag entity
     */
    async updateTag(requestParameters: UpdateTagRequest): Promise<void> {
        await this.updateTagRaw(requestParameters);
    }

}
