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
    ProblemDetails,
    ProblemDetailsFromJSON,
    ProblemDetailsToJSON,
} from '../models';

export interface CommitTransactionRequest {
    xOPTIMATransactionGuid?: string;
}

export interface CreateTransactionRequest {
    xOPTIMATransactionGuid?: string;
}

export interface RollbackTransactionRequest {
    xOPTIMATransactionGuid?: string;
}

/**
 * no description
 */
export class TransactionApi extends runtime.BaseAPI {

    /**
     * Commits a transaction in the database
     */
    async commitTransactionRaw(requestParameters: CommitTransactionRequest): Promise<runtime.ApiResponse<void>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.xOPTIMATransactionGuid !== undefined && requestParameters.xOPTIMATransactionGuid !== null) {
            headerParameters['X-OPTIMA-Transaction-Guid'] = String(requestParameters.xOPTIMATransactionGuid);
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Transaction/Commit`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Commits a transaction in the database
     */
    async commitTransaction(requestParameters: CommitTransactionRequest): Promise<void> {
        await this.commitTransactionRaw(requestParameters);
    }

    /**
     * Creates a transaction in the database
     */
    async createTransactionRaw(requestParameters: CreateTransactionRequest): Promise<runtime.ApiResponse<void>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.xOPTIMATransactionGuid !== undefined && requestParameters.xOPTIMATransactionGuid !== null) {
            headerParameters['X-OPTIMA-Transaction-Guid'] = String(requestParameters.xOPTIMATransactionGuid);
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Transaction/Create`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Creates a transaction in the database
     */
    async createTransaction(requestParameters: CreateTransactionRequest): Promise<void> {
        await this.createTransactionRaw(requestParameters);
    }

    /**
     * Rollbacks a transaction in the database
     */
    async rollbackTransactionRaw(requestParameters: RollbackTransactionRequest): Promise<runtime.ApiResponse<void>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.xOPTIMATransactionGuid !== undefined && requestParameters.xOPTIMATransactionGuid !== null) {
            headerParameters['X-OPTIMA-Transaction-Guid'] = String(requestParameters.xOPTIMATransactionGuid);
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Transaction/Rollback`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Rollbacks a transaction in the database
     */
    async rollbackTransaction(requestParameters: RollbackTransactionRequest): Promise<void> {
        await this.rollbackTransactionRaw(requestParameters);
    }

}