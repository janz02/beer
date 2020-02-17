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
    TagCategoryDto,
    TagCategoryDtoFromJSON,
    TagCategoryDtoToJSON,
    TagCategoryVm,
    TagCategoryVmFromJSON,
    TagCategoryVmToJSON,
    TagCategoryVmPaginatedResponse,
    TagCategoryVmPaginatedResponseFromJSON,
    TagCategoryVmPaginatedResponseToJSON,
} from '../models';

export interface CreateTagCategoriesRequest {
    tagCategoryDto?: TagCategoryDto;
}

export interface DeleteTagCategoriesRequest {
    id: number;
}

export interface GetTagCategoriesRequest {
    id: number;
}

export interface ListTagCategoriesRequest {
    name?: string;
    page?: number;
    pageSize?: number;
    orderBy?: string;
    orderByType?: OrderByType;
}

export interface UpdateTagCategoriesRequest {
    id: number;
    tagCategoryDto?: TagCategoryDto;
}

/**
 * no description
 */
export class TagCategoriesApi extends runtime.BaseAPI {

    /**
     * Returns the id of the TagCategory upon success
     * Creates a TagCategory entity
     */
    async createTagCategoriesRaw(requestParameters: CreateTagCategoriesRequest): Promise<runtime.ApiResponse<Int32EntityCreatedVm>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/TagCategories`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: TagCategoryDtoToJSON(requestParameters.tagCategoryDto),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => Int32EntityCreatedVmFromJSON(jsonValue));
    }

    /**
     * Returns the id of the TagCategory upon success
     * Creates a TagCategory entity
     */
    async createTagCategories(requestParameters: CreateTagCategoriesRequest): Promise<Int32EntityCreatedVm> {
        const response = await this.createTagCategoriesRaw(requestParameters);
        return await response.value();
    }

    /**
     * Deletes the TagCategory entity with Id of \"id\"
     * Deletes a TagCategory entity
     */
    async deleteTagCategoriesRaw(requestParameters: DeleteTagCategoriesRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteTagCategories.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/TagCategories/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Deletes the TagCategory entity with Id of \"id\"
     * Deletes a TagCategory entity
     */
    async deleteTagCategories(requestParameters: DeleteTagCategoriesRequest): Promise<void> {
        await this.deleteTagCategoriesRaw(requestParameters);
    }

    /**
     * Returns the TagCategory with the specified Id upon success
     * Gets a TagCategory entity by Id
     */
    async getTagCategoriesRaw(requestParameters: GetTagCategoriesRequest): Promise<runtime.ApiResponse<TagCategoryVm>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getTagCategories.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/TagCategories/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => TagCategoryVmFromJSON(jsonValue));
    }

    /**
     * Returns the TagCategory with the specified Id upon success
     * Gets a TagCategory entity by Id
     */
    async getTagCategories(requestParameters: GetTagCategoriesRequest): Promise<TagCategoryVm> {
        const response = await this.getTagCategoriesRaw(requestParameters);
        return await response.value();
    }

    /**
     * Returns the TagCategory list with the specified filters applied
     * Gets a TagCategory entity list sorted and filtered
     */
    async listTagCategoriesRaw(requestParameters: ListTagCategoriesRequest): Promise<runtime.ApiResponse<TagCategoryVmPaginatedResponse>> {
        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.name !== undefined) {
            queryParameters['name'] = requestParameters.name;
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
            path: `/api/TagCategories`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => TagCategoryVmPaginatedResponseFromJSON(jsonValue));
    }

    /**
     * Returns the TagCategory list with the specified filters applied
     * Gets a TagCategory entity list sorted and filtered
     */
    async listTagCategories(requestParameters: ListTagCategoriesRequest): Promise<TagCategoryVmPaginatedResponse> {
        const response = await this.listTagCategoriesRaw(requestParameters);
        return await response.value();
    }

    /**
     * Updates a TagCategory entity with Id of \"id\" to entity \"category\"
     * Updates a TagCategory entity
     */
    async updateTagCategoriesRaw(requestParameters: UpdateTagCategoriesRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateTagCategories.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/TagCategories/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: TagCategoryDtoToJSON(requestParameters.tagCategoryDto),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Updates a TagCategory entity with Id of \"id\" to entity \"category\"
     * Updates a TagCategory entity
     */
    async updateTagCategories(requestParameters: UpdateTagCategoriesRequest): Promise<void> {
        await this.updateTagCategoriesRaw(requestParameters);
    }

}
