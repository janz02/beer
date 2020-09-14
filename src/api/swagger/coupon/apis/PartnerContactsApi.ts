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
    OrderByType,
    OrderByTypeFromJSON,
    OrderByTypeToJSON,
    PartnerContactDto,
    PartnerContactDtoFromJSON,
    PartnerContactDtoToJSON,
    PartnerContactSelfDto,
    PartnerContactSelfDtoFromJSON,
    PartnerContactSelfDtoToJSON,
    PartnerContactVm,
    PartnerContactVmFromJSON,
    PartnerContactVmToJSON,
    PartnerContactVmPaginatedResponse,
    PartnerContactVmPaginatedResponseFromJSON,
    PartnerContactVmPaginatedResponseToJSON,
    ProblemDetails,
    ProblemDetailsFromJSON,
    ProblemDetailsToJSON,
    Roles,
    RolesFromJSON,
    RolesToJSON,
} from '../models';

export interface GetPartnerContactRequest {
    id: number;
}

export interface GetPartnerPartnerContactRequest {
    partnerId?: number;
    name?: string | null;
    phone?: string | null;
    email?: string | null;
    role?: Roles;
    page?: number;
    pageSize?: number;
    orderBy?: string | null;
    orderByType?: OrderByType;
}

export interface UpdateMyPartnerContactRequest {
    partnerContactSelfDto?: PartnerContactSelfDto;
}

export interface UpdatePartnerContactRequest {
    id: number;
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
            path: `/api/PartnerContacts/My`,
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
    async getPartnerContactRaw(requestParameters: GetPartnerContactRequest): Promise<runtime.ApiResponse<PartnerContactVm>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getPartnerContact.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/PartnerContacts/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => PartnerContactVmFromJSON(jsonValue));
    }

    /**
     */
    async getPartnerContact(requestParameters: GetPartnerContactRequest): Promise<PartnerContactVm> {
        const response = await this.getPartnerContactRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async getPartnerPartnerContactRaw(requestParameters: GetPartnerPartnerContactRequest): Promise<runtime.ApiResponse<PartnerContactVmPaginatedResponse>> {
        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.partnerId !== undefined) {
            queryParameters['partnerId'] = requestParameters.partnerId;
        }

        if (requestParameters.name !== undefined) {
            queryParameters['name'] = requestParameters.name;
        }

        if (requestParameters.phone !== undefined) {
            queryParameters['phone'] = requestParameters.phone;
        }

        if (requestParameters.email !== undefined) {
            queryParameters['email'] = requestParameters.email;
        }

        if (requestParameters.role !== undefined) {
            queryParameters['role'] = requestParameters.role;
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
            path: `/api/PartnerContacts`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => PartnerContactVmPaginatedResponseFromJSON(jsonValue));
    }

    /**
     */
    async getPartnerPartnerContact(requestParameters: GetPartnerPartnerContactRequest): Promise<PartnerContactVmPaginatedResponse> {
        const response = await this.getPartnerPartnerContactRaw(requestParameters);
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
            path: `/api/PartnerContacts/My`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: PartnerContactSelfDtoToJSON(requestParameters.partnerContactSelfDto),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async updateMyPartnerContact(requestParameters: UpdateMyPartnerContactRequest): Promise<void> {
        await this.updateMyPartnerContactRaw(requestParameters);
    }

    /**
     */
    async updatePartnerContactRaw(requestParameters: UpdatePartnerContactRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updatePartnerContact.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/PartnerContacts/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: PartnerContactDtoToJSON(requestParameters.partnerContactDto),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async updatePartnerContact(requestParameters: UpdatePartnerContactRequest): Promise<void> {
        await this.updatePartnerContactRaw(requestParameters);
    }

}