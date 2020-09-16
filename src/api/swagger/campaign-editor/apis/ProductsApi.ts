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
    ProductModel,
    ProductModelFromJSON,
    ProductModelToJSON,
    ProductModelPaginatedSearchResponse,
    ProductModelPaginatedSearchResponseFromJSON,
    ProductModelPaginatedSearchResponseToJSON,
} from '../models';

export interface CreateProductRequest {
    productModel?: ProductModel;
}

export interface DeleteProductRequest {
    id: number;
}

export interface GetManyProductsRequest {
    ids?: Array<number>;
}

export interface GetProductRequest {
    id: number;
}

export interface GetProductsRequest {
    _queryParameters?: { [key: string]: string; };
}

export interface UpdateProductRequest {
    id: number;
    productModel?: ProductModel;
}

/**
 * no description
 */
export class ProductsApi extends runtime.BaseAPI {

    /**
     * Creates the dedicates product. The creation will results in an identification,  assigned to the current instance.
     */
    async createProductRaw(requestParameters: CreateProductRequest): Promise<runtime.ApiResponse<number>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json-patch+json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Products/Create`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ProductModelToJSON(requestParameters.productModel),
        });

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     * Creates the dedicates product. The creation will results in an identification,  assigned to the current instance.
     */
    async createProduct(requestParameters: CreateProductRequest): Promise<number> {
        const response = await this.createProductRaw(requestParameters);
        return await response.value();
    }

    /**
     * The endpoint basic results in Microsoft.AspNetCore.Mvc.NoContentResult. If the process mechanism was  failed for some reason - e.g.: Campaign assigned to the product, result is   Microsoft.AspNetCore.Mvc.ForbidResult.
     * Delete the item signed with the id.
     */
    async deleteProductRaw(requestParameters: DeleteProductRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteProduct.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Products/Delete/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * The endpoint basic results in Microsoft.AspNetCore.Mvc.NoContentResult. If the process mechanism was  failed for some reason - e.g.: Campaign assigned to the product, result is   Microsoft.AspNetCore.Mvc.ForbidResult.
     * Delete the item signed with the id.
     */
    async deleteProduct(requestParameters: DeleteProductRequest): Promise<void> {
        await this.deleteProductRaw(requestParameters);
    }

    /**
     * Returns the products identified by the ids.
     */
    async getManyProductsRaw(requestParameters: GetManyProductsRequest): Promise<runtime.ApiResponse<Array<ProductModel>>> {
        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.ids) {
            queryParameters['ids'] = requestParameters.ids;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Products/GetMany/many`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ProductModelFromJSON));
    }

    /**
     * Returns the products identified by the ids.
     */
    async getManyProducts(requestParameters: GetManyProductsRequest): Promise<Array<ProductModel>> {
        const response = await this.getManyProductsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Gets the requested product, identified by id.
     */
    async getProductRaw(requestParameters: GetProductRequest): Promise<runtime.ApiResponse<ProductModel>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getProduct.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Products/GetOne/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ProductModelFromJSON(jsonValue));
    }

    /**
     * Gets the requested product, identified by id.
     */
    async getProduct(requestParameters: GetProductRequest): Promise<ProductModel> {
        const response = await this.getProductRaw(requestParameters);
        return await response.value();
    }

    /**
     * Returns the products for the actual query.
     */
    async getProductsRaw(requestParameters: GetProductsRequest): Promise<runtime.ApiResponse<ProductModelPaginatedSearchResponse>> {
        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters._queryParameters !== undefined) {
            queryParameters['queryParameters'] = requestParameters._queryParameters;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Products/GetAll`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ProductModelPaginatedSearchResponseFromJSON(jsonValue));
    }

    /**
     * Returns the products for the actual query.
     */
    async getProducts(requestParameters: GetProductsRequest): Promise<ProductModelPaginatedSearchResponse> {
        const response = await this.getProductsRaw(requestParameters);
        return await response.value();
    }

    /**
     * The endpoint basic results in Microsoft.AspNetCore.Mvc.NoContentResult. If the process mechanism was  failed for some reason the result is NKM.RTD.CampaignEditor.Prototypes.ErrorContract.
     * Update the current instance with the fulfilled model
     */
    async updateProductRaw(requestParameters: UpdateProductRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateProduct.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json-patch+json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Products/Update/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: ProductModelToJSON(requestParameters.productModel),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * The endpoint basic results in Microsoft.AspNetCore.Mvc.NoContentResult. If the process mechanism was  failed for some reason the result is NKM.RTD.CampaignEditor.Prototypes.ErrorContract.
     * Update the current instance with the fulfilled model
     */
    async updateProduct(requestParameters: UpdateProductRequest): Promise<void> {
        await this.updateProductRaw(requestParameters);
    }

}
