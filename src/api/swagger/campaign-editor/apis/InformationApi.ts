/* tslint:disable */
/* eslint-disable */
/**
 * Optima CampaignEditor API
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

/**
 * no description
 */
export class InformationApi extends runtime.BaseAPI {

    /**
     * Returns the error keys that could be returned by the API.
     */
    async getErrorKeysRaw(): Promise<runtime.ApiResponse<Array<string>>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/Information/GetErrorKeys`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Returns the error keys that could be returned by the API.
     */
    async getErrorKeys(): Promise<Array<string>> {
        const response = await this.getErrorKeysRaw();
        return await response.value();
    }

}
