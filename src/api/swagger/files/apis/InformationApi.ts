/* tslint:disable */
/* eslint-disable */
/**
 * NKM PKM Files Api
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

export interface GetErrorKeysRequest {
    xRTDTransactionGuid?: string;
}

/**
 * no description
 */
export class InformationApi extends runtime.BaseAPI {

    /**
     * Returns a list of all the exception errorkeys
     */
    async getErrorKeysRaw(requestParameters: GetErrorKeysRequest): Promise<runtime.ApiResponse<Array<string>>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.xRTDTransactionGuid !== undefined && requestParameters.xRTDTransactionGuid !== null) {
            headerParameters['X-RTD-Transaction-Guid'] = String(requestParameters.xRTDTransactionGuid);
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Information`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Returns a list of all the exception errorkeys
     */
    async getErrorKeys(requestParameters: GetErrorKeysRequest): Promise<Array<string>> {
        const response = await this.getErrorKeysRaw(requestParameters);
        return await response.value();
    }

}
