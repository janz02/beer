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
import {
    MicrosoftAspNetCoreMvcProblemDetails,
    MicrosoftAspNetCoreMvcProblemDetailsFromJSON,
    MicrosoftAspNetCoreMvcProblemDetailsToJSON,
    OptimaCampaignEditorApplicationCommonMessagesEnumsOrderByType,
    OptimaCampaignEditorApplicationCommonMessagesEnumsOrderByTypeFromJSON,
    OptimaCampaignEditorApplicationCommonMessagesEnumsOrderByTypeToJSON,
    OptimaCampaignEditorApplicationCommonMessagesResponsesPaginatedSearchResponseOfOptimaCampaignEditorApplicationCommonMessagesViewModelsCompanyVm,
    OptimaCampaignEditorApplicationCommonMessagesResponsesPaginatedSearchResponseOfOptimaCampaignEditorApplicationCommonMessagesViewModelsCompanyVmFromJSON,
    OptimaCampaignEditorApplicationCommonMessagesResponsesPaginatedSearchResponseOfOptimaCampaignEditorApplicationCommonMessagesViewModelsCompanyVmToJSON,
    OptimaCampaignEditorApplicationCommonMessagesViewModelsCompanyVm,
    OptimaCampaignEditorApplicationCommonMessagesViewModelsCompanyVmFromJSON,
    OptimaCampaignEditorApplicationCommonMessagesViewModelsCompanyVmToJSON,
    OptimaCampaignEditorApplicationCompaniesCommandsCreateCompanyCreateCompanyCommand,
    OptimaCampaignEditorApplicationCompaniesCommandsCreateCompanyCreateCompanyCommandFromJSON,
    OptimaCampaignEditorApplicationCompaniesCommandsCreateCompanyCreateCompanyCommandToJSON,
    OptimaCampaignEditorApplicationCompaniesCommandsSetStatusCompanySetStatusCompanyCommand,
    OptimaCampaignEditorApplicationCompaniesCommandsSetStatusCompanySetStatusCompanyCommandFromJSON,
    OptimaCampaignEditorApplicationCompaniesCommandsSetStatusCompanySetStatusCompanyCommandToJSON,
    OptimaCampaignEditorApplicationCompaniesCommandsUpdateCompanyUpdateCompanyCommand,
    OptimaCampaignEditorApplicationCompaniesCommandsUpdateCompanyUpdateCompanyCommandFromJSON,
    OptimaCampaignEditorApplicationCompaniesCommandsUpdateCompanyUpdateCompanyCommandToJSON,
} from '../models';

export interface CreateCompanyRequest {
    optimaCampaignEditorApplicationCompaniesCommandsCreateCompanyCreateCompanyCommand?: OptimaCampaignEditorApplicationCompaniesCommandsCreateCompanyCreateCompanyCommand;
}

export interface DeleteCompanyRequest {
    id: number;
}

export interface ExportCompaniesRequest {
    name?: string;
    isActive?: boolean;
    createdDate?: Date;
    profileCount?: number;
    groupCount?: number;
    jobRoleCount?: number;
    campaignCount?: number;
    skip?: number;
    take?: number;
    orderBy?: string;
    ids?: Array<number>;
    page?: number;
    pageSize?: number;
    orderByType?: OptimaCampaignEditorApplicationCommonMessagesEnumsOrderByType;
}

export interface GetCompaniesRequest {
    name?: string;
    isActive?: boolean;
    createdDate?: Date;
    profileCount?: number;
    groupCount?: number;
    jobRoleCount?: number;
    campaignCount?: number;
    skip?: number;
    take?: number;
    orderBy?: string;
    ids?: Array<number>;
    page?: number;
    pageSize?: number;
    orderByType?: OptimaCampaignEditorApplicationCommonMessagesEnumsOrderByType;
}

export interface GetCompanyRequest {
    id: number;
}

export interface SetCompanyStatusRequest {
    id: number;
    optimaCampaignEditorApplicationCompaniesCommandsSetStatusCompanySetStatusCompanyCommand?: OptimaCampaignEditorApplicationCompaniesCommandsSetStatusCompanySetStatusCompanyCommand;
}

export interface UpdateCompanyRequest {
    id: number;
    optimaCampaignEditorApplicationCompaniesCommandsUpdateCompanyUpdateCompanyCommand?: OptimaCampaignEditorApplicationCompaniesCommandsUpdateCompanyUpdateCompanyCommand;
}

/**
 * no description
 */
export class CompaniesApi extends runtime.BaseAPI {

    /**
     * Returns the id of the Company upon success
     * Creates a Company entity
     */
    async createCompanyRaw(requestParameters: CreateCompanyRequest): Promise<runtime.ApiResponse<void>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Companies/Create`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: OptimaCampaignEditorApplicationCompaniesCommandsCreateCompanyCreateCompanyCommandToJSON(requestParameters.optimaCampaignEditorApplicationCompaniesCommandsCreateCompanyCreateCompanyCommand),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Returns the id of the Company upon success
     * Creates a Company entity
     */
    async createCompany(requestParameters: CreateCompanyRequest): Promise<void> {
        await this.createCompanyRaw(requestParameters);
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

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Companies/Delete/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
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
            queryParameters['Name'] = requestParameters.name;
        }

        if (requestParameters.isActive !== undefined) {
            queryParameters['IsActive'] = requestParameters.isActive;
        }

        if (requestParameters.createdDate !== undefined) {
            queryParameters['CreatedDate'] = (requestParameters.createdDate as any).toISOString();
        }

        if (requestParameters.profileCount !== undefined) {
            queryParameters['ProfileCount'] = requestParameters.profileCount;
        }

        if (requestParameters.groupCount !== undefined) {
            queryParameters['GroupCount'] = requestParameters.groupCount;
        }

        if (requestParameters.jobRoleCount !== undefined) {
            queryParameters['JobRoleCount'] = requestParameters.jobRoleCount;
        }

        if (requestParameters.campaignCount !== undefined) {
            queryParameters['CampaignCount'] = requestParameters.campaignCount;
        }

        if (requestParameters.skip !== undefined) {
            queryParameters['Skip'] = requestParameters.skip;
        }

        if (requestParameters.take !== undefined) {
            queryParameters['Take'] = requestParameters.take;
        }

        if (requestParameters.orderBy !== undefined) {
            queryParameters['OrderBy'] = requestParameters.orderBy;
        }

        if (requestParameters.ids) {
            queryParameters['Ids'] = requestParameters.ids;
        }

        if (requestParameters.page !== undefined) {
            queryParameters['Page'] = requestParameters.page;
        }

        if (requestParameters.pageSize !== undefined) {
            queryParameters['PageSize'] = requestParameters.pageSize;
        }

        if (requestParameters.orderByType !== undefined) {
            queryParameters['OrderByType'] = requestParameters.orderByType;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Companies/ExportAll/ExportCompanies`,
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
    async getCompaniesRaw(requestParameters: GetCompaniesRequest): Promise<runtime.ApiResponse<OptimaCampaignEditorApplicationCommonMessagesResponsesPaginatedSearchResponseOfOptimaCampaignEditorApplicationCommonMessagesViewModelsCompanyVm>> {
        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.name !== undefined) {
            queryParameters['Name'] = requestParameters.name;
        }

        if (requestParameters.isActive !== undefined) {
            queryParameters['IsActive'] = requestParameters.isActive;
        }

        if (requestParameters.createdDate !== undefined) {
            queryParameters['CreatedDate'] = (requestParameters.createdDate as any).toISOString();
        }

        if (requestParameters.profileCount !== undefined) {
            queryParameters['ProfileCount'] = requestParameters.profileCount;
        }

        if (requestParameters.groupCount !== undefined) {
            queryParameters['GroupCount'] = requestParameters.groupCount;
        }

        if (requestParameters.jobRoleCount !== undefined) {
            queryParameters['JobRoleCount'] = requestParameters.jobRoleCount;
        }

        if (requestParameters.campaignCount !== undefined) {
            queryParameters['CampaignCount'] = requestParameters.campaignCount;
        }

        if (requestParameters.skip !== undefined) {
            queryParameters['Skip'] = requestParameters.skip;
        }

        if (requestParameters.take !== undefined) {
            queryParameters['Take'] = requestParameters.take;
        }

        if (requestParameters.orderBy !== undefined) {
            queryParameters['OrderBy'] = requestParameters.orderBy;
        }

        if (requestParameters.ids) {
            queryParameters['Ids'] = requestParameters.ids;
        }

        if (requestParameters.page !== undefined) {
            queryParameters['Page'] = requestParameters.page;
        }

        if (requestParameters.pageSize !== undefined) {
            queryParameters['PageSize'] = requestParameters.pageSize;
        }

        if (requestParameters.orderByType !== undefined) {
            queryParameters['OrderByType'] = requestParameters.orderByType;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Companies/GetAll`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => OptimaCampaignEditorApplicationCommonMessagesResponsesPaginatedSearchResponseOfOptimaCampaignEditorApplicationCommonMessagesViewModelsCompanyVmFromJSON(jsonValue));
    }

    /**
     * Returns the Company list with the specified filters applied
     * Gets a Company entity list sorted and filtered
     */
    async getCompanies(requestParameters: GetCompaniesRequest): Promise<OptimaCampaignEditorApplicationCommonMessagesResponsesPaginatedSearchResponseOfOptimaCampaignEditorApplicationCommonMessagesViewModelsCompanyVm> {
        const response = await this.getCompaniesRaw(requestParameters);
        return await response.value();
    }

    /**
     * Returns the Company with the specified Id upon success
     * Gets a Company entity by Id
     */
    async getCompanyRaw(requestParameters: GetCompanyRequest): Promise<runtime.ApiResponse<OptimaCampaignEditorApplicationCommonMessagesViewModelsCompanyVm>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getCompany.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Companies/GetOne/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => OptimaCampaignEditorApplicationCommonMessagesViewModelsCompanyVmFromJSON(jsonValue));
    }

    /**
     * Returns the Company with the specified Id upon success
     * Gets a Company entity by Id
     */
    async getCompany(requestParameters: GetCompanyRequest): Promise<OptimaCampaignEditorApplicationCommonMessagesViewModelsCompanyVm> {
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

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Companies/SetStatus/{id}/Status`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: OptimaCampaignEditorApplicationCompaniesCommandsSetStatusCompanySetStatusCompanyCommandToJSON(requestParameters.optimaCampaignEditorApplicationCompaniesCommandsSetStatusCompanySetStatusCompanyCommand),
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

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Companies/Update/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: OptimaCampaignEditorApplicationCompaniesCommandsUpdateCompanyUpdateCompanyCommandToJSON(requestParameters.optimaCampaignEditorApplicationCompaniesCommandsUpdateCompanyUpdateCompanyCommand),
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
