/* tslint:disable */
/* eslint-disable */
/**
 * Optima Admin
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
    CompanyDto,
    CompanyDtoFromJSON,
    CompanyDtoToJSON,
    CompanyStatusDto,
    CompanyStatusDtoFromJSON,
    CompanyStatusDtoToJSON,
    CompanyVm,
    CompanyVmFromJSON,
    CompanyVmToJSON,
    CompanyVmPaginatedResponse,
    CompanyVmPaginatedResponseFromJSON,
    CompanyVmPaginatedResponseToJSON,
    Int32EntityCreatedVm,
    Int32EntityCreatedVmFromJSON,
    Int32EntityCreatedVmToJSON,
    OrderByType,
    OrderByTypeFromJSON,
    OrderByTypeToJSON,
    ProblemDetails,
    ProblemDetailsFromJSON,
    ProblemDetailsToJSON,
} from '../models';

export interface CreateCompanyRequest {
    xRTDTransactionGuid?: string;
    companyDto?: CompanyDto;
}

export interface DeleteCompanyRequest {
    id: number;
    xRTDTransactionGuid?: string;
}

export interface ExportCompaniesRequest {
    name?: string | null;
    isActive?: boolean | null;
    createdDate?: Date | null;
    profileCount?: number | null;
    groupCount?: number | null;
    jobRoleCount?: number | null;
    campaignCount?: number | null;
    page?: number;
    pageSize?: number;
    orderBy?: string | null;
    orderByType?: OrderByType;
    xRTDTransactionGuid?: string;
}

export interface GetCompaniesRequest {
    name?: string | null;
    isActive?: boolean | null;
    createdDate?: Date | null;
    profileCount?: number | null;
    groupCount?: number | null;
    jobRoleCount?: number | null;
    campaignCount?: number | null;
    page?: number;
    pageSize?: number;
    orderBy?: string | null;
    orderByType?: OrderByType;
    xRTDTransactionGuid?: string;
}

export interface GetCompanyRequest {
    id: number;
    xRTDTransactionGuid?: string;
}

export interface SetCompanyStatusRequest {
    id: number;
    xRTDTransactionGuid?: string;
    companyStatusDto?: CompanyStatusDto;
}

export interface UpdateCompanyRequest {
    id: number;
    xRTDTransactionGuid?: string;
    companyDto?: CompanyDto;
}

/**
 * no description
 */
export class CompaniesApi extends runtime.BaseAPI {

    /**
     * Returns the id of the Company upon success
     * Creates a Company entity
     */
    async createCompanyRaw(requestParameters: CreateCompanyRequest): Promise<runtime.ApiResponse<Int32EntityCreatedVm>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (requestParameters.xRTDTransactionGuid !== undefined && requestParameters.xRTDTransactionGuid !== null) {
            headerParameters['X-RTD-Transaction-Guid'] = String(requestParameters.xRTDTransactionGuid);
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Companies`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CompanyDtoToJSON(requestParameters.companyDto),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => Int32EntityCreatedVmFromJSON(jsonValue));
    }

    /**
     * Returns the id of the Company upon success
     * Creates a Company entity
     */
    async createCompany(requestParameters: CreateCompanyRequest): Promise<Int32EntityCreatedVm> {
        const response = await this.createCompanyRaw(requestParameters);
        return await response.value();
    }

    /**
     * Deletes the Company entity with Id of \"id\"
     * Deletes a Company entity
     */
    async deleteCompanyRaw(requestParameters: DeleteCompanyRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteCompany.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.xRTDTransactionGuid !== undefined && requestParameters.xRTDTransactionGuid !== null) {
            headerParameters['X-RTD-Transaction-Guid'] = String(requestParameters.xRTDTransactionGuid);
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Companies/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Deletes the Company entity with Id of \"id\"
     * Deletes a Company entity
     */
    async deleteCompany(requestParameters: DeleteCompanyRequest): Promise<void> {
        await this.deleteCompanyRaw(requestParameters);
    }

    /**
     * Exports the Company list with the specified filters applied in a csv file
     * Exports a Company entity list sorted and filtered in a csv file
     */
    async exportCompaniesRaw(requestParameters: ExportCompaniesRequest): Promise<runtime.ApiResponse<Blob>> {
        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.name !== undefined) {
            queryParameters['name'] = requestParameters.name;
        }

        if (requestParameters.isActive !== undefined) {
            queryParameters['isActive'] = requestParameters.isActive;
        }

        if (requestParameters.createdDate !== undefined) {
            queryParameters['createdDate'] = (requestParameters.createdDate as any).toISOString();
        }

        if (requestParameters.profileCount !== undefined) {
            queryParameters['profileCount'] = requestParameters.profileCount;
        }

        if (requestParameters.groupCount !== undefined) {
            queryParameters['groupCount'] = requestParameters.groupCount;
        }

        if (requestParameters.jobRoleCount !== undefined) {
            queryParameters['jobRoleCount'] = requestParameters.jobRoleCount;
        }

        if (requestParameters.campaignCount !== undefined) {
            queryParameters['campaignCount'] = requestParameters.campaignCount;
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

        if (requestParameters.xRTDTransactionGuid !== undefined && requestParameters.xRTDTransactionGuid !== null) {
            headerParameters['X-RTD-Transaction-Guid'] = String(requestParameters.xRTDTransactionGuid);
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Companies/ExportCategories`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.BlobApiResponse(response);
    }

    /**
     * Exports the Company list with the specified filters applied in a csv file
     * Exports a Company entity list sorted and filtered in a csv file
     */
    async exportCompanies(requestParameters: ExportCompaniesRequest): Promise<Blob> {
        const response = await this.exportCompaniesRaw(requestParameters);
        return await response.value();
    }

    /**
     * Returns the Company list with the specified filters applied
     * Gets a Company entity list sorted and filtered
     */
    async getCompaniesRaw(requestParameters: GetCompaniesRequest): Promise<runtime.ApiResponse<CompanyVmPaginatedResponse>> {
        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.name !== undefined) {
            queryParameters['name'] = requestParameters.name;
        }

        if (requestParameters.isActive !== undefined) {
            queryParameters['isActive'] = requestParameters.isActive;
        }

        if (requestParameters.createdDate !== undefined) {
            queryParameters['createdDate'] = (requestParameters.createdDate as any).toISOString();
        }

        if (requestParameters.profileCount !== undefined) {
            queryParameters['profileCount'] = requestParameters.profileCount;
        }

        if (requestParameters.groupCount !== undefined) {
            queryParameters['groupCount'] = requestParameters.groupCount;
        }

        if (requestParameters.jobRoleCount !== undefined) {
            queryParameters['jobRoleCount'] = requestParameters.jobRoleCount;
        }

        if (requestParameters.campaignCount !== undefined) {
            queryParameters['campaignCount'] = requestParameters.campaignCount;
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

        if (requestParameters.xRTDTransactionGuid !== undefined && requestParameters.xRTDTransactionGuid !== null) {
            headerParameters['X-RTD-Transaction-Guid'] = String(requestParameters.xRTDTransactionGuid);
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Companies`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => CompanyVmPaginatedResponseFromJSON(jsonValue));
    }

    /**
     * Returns the Company list with the specified filters applied
     * Gets a Company entity list sorted and filtered
     */
    async getCompanies(requestParameters: GetCompaniesRequest): Promise<CompanyVmPaginatedResponse> {
        const response = await this.getCompaniesRaw(requestParameters);
        return await response.value();
    }

    /**
     * Returns the Company with the specified Id upon success
     * Gets a Company entity by Id
     */
    async getCompanyRaw(requestParameters: GetCompanyRequest): Promise<runtime.ApiResponse<CompanyVm>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getCompany.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.xRTDTransactionGuid !== undefined && requestParameters.xRTDTransactionGuid !== null) {
            headerParameters['X-RTD-Transaction-Guid'] = String(requestParameters.xRTDTransactionGuid);
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Companies/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => CompanyVmFromJSON(jsonValue));
    }

    /**
     * Returns the Company with the specified Id upon success
     * Gets a Company entity by Id
     */
    async getCompany(requestParameters: GetCompanyRequest): Promise<CompanyVm> {
        const response = await this.getCompanyRaw(requestParameters);
        return await response.value();
    }

    /**
     * Sets the status of a Company with Id of \"id\"
     * Sets the a Company\'s status
     */
    async setCompanyStatusRaw(requestParameters: SetCompanyStatusRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling setCompanyStatus.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (requestParameters.xRTDTransactionGuid !== undefined && requestParameters.xRTDTransactionGuid !== null) {
            headerParameters['X-RTD-Transaction-Guid'] = String(requestParameters.xRTDTransactionGuid);
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Companies/{id}/Status`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: CompanyStatusDtoToJSON(requestParameters.companyStatusDto),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Sets the status of a Company with Id of \"id\"
     * Sets the a Company\'s status
     */
    async setCompanyStatus(requestParameters: SetCompanyStatusRequest): Promise<void> {
        await this.setCompanyStatusRaw(requestParameters);
    }

    /**
     * Updates a Company entity with Id of \"id\" to entity \"dto\"
     * Updates a Company entity
     */
    async updateCompanyRaw(requestParameters: UpdateCompanyRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateCompany.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (requestParameters.xRTDTransactionGuid !== undefined && requestParameters.xRTDTransactionGuid !== null) {
            headerParameters['X-RTD-Transaction-Guid'] = String(requestParameters.xRTDTransactionGuid);
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Companies/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: CompanyDtoToJSON(requestParameters.companyDto),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Updates a Company entity with Id of \"id\" to entity \"dto\"
     * Updates a Company entity
     */
    async updateCompany(requestParameters: UpdateCompanyRequest): Promise<void> {
        await this.updateCompanyRaw(requestParameters);
    }

}
