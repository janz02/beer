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
    CategoryDto,
    CategoryDtoFromJSON,
    CategoryDtoToJSON,
    CategoryVm,
    CategoryVmFromJSON,
    CategoryVmToJSON,
    CategoryVmPaginatedResponse,
    CategoryVmPaginatedResponseFromJSON,
    CategoryVmPaginatedResponseToJSON,
    Int32EntityCreatedVm,
    Int32EntityCreatedVmFromJSON,
    Int32EntityCreatedVmToJSON,
    OrderByType,
    OrderByTypeFromJSON,
    OrderByTypeToJSON,
} from '../models';

export interface CreateCategoriesRequest {
    categoryDto?: CategoryDto;
}

export interface DeleteCategoriesRequest {
    id: number;
}

export interface GetCategoriesRequest {
    id: number;
}

export interface ListCategoriesRequest {
    name?: string;
    page?: number;
    pageSize?: number;
    orderBy?: string;
    orderByType?: OrderByType;
}

export interface UpdateCategoriesRequest {
    id: number;
    categoryDto?: CategoryDto;
}

/**
 * no description
 */
export class CategoriesApi extends runtime.BaseAPI {

    /**
     * Returns the id of the Category upon success
     * Creates a Category entity
     */
    async createCategoriesRaw(requestParameters: CreateCategoriesRequest): Promise<runtime.ApiResponse<Int32EntityCreatedVm>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Categories`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CategoryDtoToJSON(requestParameters.categoryDto),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => Int32EntityCreatedVmFromJSON(jsonValue));
    }

    /**
     * Returns the id of the Category upon success
     * Creates a Category entity
     */
    async createCategories(requestParameters: CreateCategoriesRequest): Promise<Int32EntityCreatedVm> {
        const response = await this.createCategoriesRaw(requestParameters);
        return await response.value();
    }

    /**
     * Deletes the Category entity with Id of \"id\"
     * Deletes a Category entity
     */
    async deleteCategoriesRaw(requestParameters: DeleteCategoriesRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteCategories.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Categories/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Deletes the Category entity with Id of \"id\"
     * Deletes a Category entity
     */
    async deleteCategories(requestParameters: DeleteCategoriesRequest): Promise<void> {
        await this.deleteCategoriesRaw(requestParameters);
    }

    /**
     * Returns the Category with the specified Id upon success
     * Gets a Category entity by Id
     */
    async getCategoriesRaw(requestParameters: GetCategoriesRequest): Promise<runtime.ApiResponse<CategoryVm>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getCategories.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Categories/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => CategoryVmFromJSON(jsonValue));
    }

    /**
     * Returns the Category with the specified Id upon success
     * Gets a Category entity by Id
     */
    async getCategories(requestParameters: GetCategoriesRequest): Promise<CategoryVm> {
        const response = await this.getCategoriesRaw(requestParameters);
        return await response.value();
    }

    /**
     * Returns the Category list with the specified filters applied
     * Gets a Category entity list sorted and filtered
     */
    async listCategoriesRaw(requestParameters: ListCategoriesRequest): Promise<runtime.ApiResponse<CategoryVmPaginatedResponse>> {
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
            path: `/api/Categories`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => CategoryVmPaginatedResponseFromJSON(jsonValue));
    }

    /**
     * Returns the Category list with the specified filters applied
     * Gets a Category entity list sorted and filtered
     */
    async listCategories(requestParameters: ListCategoriesRequest): Promise<CategoryVmPaginatedResponse> {
        const response = await this.listCategoriesRaw(requestParameters);
        return await response.value();
    }

    /**
     * Updates a Category entity with Id of \"id\" to entity \"category\"
     * Updates a Category entity
     */
    async updateCategoriesRaw(requestParameters: UpdateCategoriesRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateCategories.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Categories/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: CategoryDtoToJSON(requestParameters.categoryDto),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Updates a Category entity with Id of \"id\" to entity \"category\"
     * Updates a Category entity
     */
    async updateCategories(requestParameters: UpdateCategoriesRequest): Promise<void> {
        await this.updateCategoriesRaw(requestParameters);
    }

}
