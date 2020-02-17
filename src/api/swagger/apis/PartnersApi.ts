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
    PartnerDto,
    PartnerDtoFromJSON,
    PartnerDtoToJSON,
    PartnerVm,
    PartnerVmFromJSON,
    PartnerVmToJSON,
} from '../models';

export interface UpdatePartnersRequest {
    partnerDto?: PartnerDto;
}

/**
 * no description
 */
export class PartnersApi extends runtime.BaseAPI {

    /**
     */
    async getPartnersRaw(): Promise<runtime.ApiResponse<PartnerVm>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Partners`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => PartnerVmFromJSON(jsonValue));
    }

    /**
     */
    async getPartners(): Promise<PartnerVm> {
        const response = await this.getPartnersRaw();
        return await response.value();
    }

    /**
     */
    async updatePartnersRaw(requestParameters: UpdatePartnersRequest): Promise<runtime.ApiResponse<void>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Partners`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: PartnerDtoToJSON(requestParameters.partnerDto),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async updatePartners(requestParameters: UpdatePartnersRequest): Promise<void> {
        await this.updatePartnersRaw(requestParameters);
    }

}
