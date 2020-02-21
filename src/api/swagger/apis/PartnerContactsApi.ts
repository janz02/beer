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
    PartnerContactDto,
    PartnerContactDtoFromJSON,
    PartnerContactDtoToJSON,
    PartnerContactVm,
    PartnerContactVmFromJSON,
    PartnerContactVmToJSON,
} from '../models';

export interface UpdateMyPartnerContactRequest {
    partnerContactDto?: PartnerContactDto;
}

/**
 * no description
 */
export class PartnerContactsApi extends runtime.BaseAPI {

    /**
     */
    async getMyPartnerContactRaw(): Promise<runtime.ApiResponse<PartnerContactVm>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/PartnerContacts`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => PartnerContactVmFromJSON(jsonValue));
    }

    /**
     */
    async getMyPartnerContact(): Promise<PartnerContactVm> {
        const response = await this.getMyPartnerContactRaw();
        return await response.value();
    }

    /**
     */
    async updateMyPartnerContactRaw(requestParameters: UpdateMyPartnerContactRequest): Promise<runtime.ApiResponse<void>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/PartnerContacts`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: PartnerContactDtoToJSON(requestParameters.partnerContactDto),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async updateMyPartnerContact(requestParameters: UpdateMyPartnerContactRequest): Promise<void> {
        await this.updateMyPartnerContactRaw(requestParameters);
    }

}
