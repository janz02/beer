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
    Int32EntityCreatedVm,
    Int32EntityCreatedVmFromJSON,
    Int32EntityCreatedVmToJSON,
    OrderByType,
    OrderByTypeFromJSON,
    OrderByTypeToJSON,
    ProblemDetails,
    ProblemDetailsFromJSON,
    ProblemDetailsToJSON,
    ProfileDto,
    ProfileDtoFromJSON,
    ProfileDtoToJSON,
    ProfileStatus,
    ProfileStatusFromJSON,
    ProfileStatusToJSON,
    ProfileStatusDto,
    ProfileStatusDtoFromJSON,
    ProfileStatusDtoToJSON,
    ProfileTabCountsVm,
    ProfileTabCountsVmFromJSON,
    ProfileTabCountsVmToJSON,
    ProfileVm,
    ProfileVmFromJSON,
    ProfileVmToJSON,
    ProfileVmPaginatedResponse,
    ProfileVmPaginatedResponseFromJSON,
    ProfileVmPaginatedResponseToJSON,
} from '../models';

export interface CreateProfileRequest {
    xOptimaTransactionGuid?: string;
    profileDto?: ProfileDto;
}

export interface ExportProfilesRequest {
    name?: string | null;
    statuses?: Array<ProfileStatus> | null;
    userName?: string | null;
    email?: string | null;
    createdDate?: Date | null;
    groupIds?: Array<number> | null;
    permissionCount?: number | null;
    companyId?: number | null;
    jobRoleId?: number | null;
    companyName?: string | null;
    jobRoleName?: string | null;
    page?: number;
    pageSize?: number;
    orderBy?: string | null;
    orderByType?: OrderByType;
    xOptimaTransactionGuid?: string;
}

export interface GetProfileRequest {
    id: number;
    xOptimaTransactionGuid?: string;
}

export interface GetProfilesRequest {
    name?: string | null;
    statuses?: Array<ProfileStatus> | null;
    userName?: string | null;
    email?: string | null;
    createdDate?: Date | null;
    groupIds?: Array<number> | null;
    permissionCount?: number | null;
    companyId?: number | null;
    jobRoleId?: number | null;
    companyName?: string | null;
    jobRoleName?: string | null;
    page?: number;
    pageSize?: number;
    orderBy?: string | null;
    orderByType?: OrderByType;
    xOptimaTransactionGuid?: string;
}

export interface ProfileTabCountsRequest {
    xOptimaTransactionGuid?: string;
}

export interface SetProfileStatusRequest {
    id: number;
    xOptimaTransactionGuid?: string;
    profileStatusDto?: ProfileStatusDto;
}

export interface UpdateProfileRequest {
    id: number;
    xOptimaTransactionGuid?: string;
    profileDto?: ProfileDto;
}

/**
 * no description
 */
export class ProfilesApi extends runtime.BaseAPI {

    /**
     * Returns the id of the Profile upon success
     * Creates a Profile entity
     */
    async createProfileRaw(requestParameters: CreateProfileRequest): Promise<runtime.ApiResponse<Int32EntityCreatedVm>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (requestParameters.xOptimaTransactionGuid !== undefined && requestParameters.xOptimaTransactionGuid !== null) {
            headerParameters['X-Optima-Transaction-Guid'] = String(requestParameters.xOptimaTransactionGuid);
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Profiles`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ProfileDtoToJSON(requestParameters.profileDto),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => Int32EntityCreatedVmFromJSON(jsonValue));
    }

    /**
     * Returns the id of the Profile upon success
     * Creates a Profile entity
     */
    async createProfile(requestParameters: CreateProfileRequest): Promise<Int32EntityCreatedVm> {
        const response = await this.createProfileRaw(requestParameters);
        return await response.value();
    }

    /**
     * Exports the Profile list with the specified filters applied in a csv file
     * Exports a Profile entity list sorted and filtered in a csv file
     */
    async exportProfilesRaw(requestParameters: ExportProfilesRequest): Promise<runtime.ApiResponse<Blob>> {
        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.name !== undefined) {
            queryParameters['name'] = requestParameters.name;
        }

        if (requestParameters.statuses) {
            queryParameters['statuses'] = requestParameters.statuses;
        }

        if (requestParameters.userName !== undefined) {
            queryParameters['userName'] = requestParameters.userName;
        }

        if (requestParameters.email !== undefined) {
            queryParameters['email'] = requestParameters.email;
        }

        if (requestParameters.createdDate !== undefined) {
            queryParameters['createdDate'] = (requestParameters.createdDate as any).toISOString();
        }

        if (requestParameters.groupIds) {
            queryParameters['groupIds'] = requestParameters.groupIds;
        }

        if (requestParameters.permissionCount !== undefined) {
            queryParameters['permissionCount'] = requestParameters.permissionCount;
        }

        if (requestParameters.companyId !== undefined) {
            queryParameters['companyId'] = requestParameters.companyId;
        }

        if (requestParameters.jobRoleId !== undefined) {
            queryParameters['jobRoleId'] = requestParameters.jobRoleId;
        }

        if (requestParameters.companyName !== undefined) {
            queryParameters['companyName'] = requestParameters.companyName;
        }

        if (requestParameters.jobRoleName !== undefined) {
            queryParameters['jobRoleName'] = requestParameters.jobRoleName;
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

        if (requestParameters.xOptimaTransactionGuid !== undefined && requestParameters.xOptimaTransactionGuid !== null) {
            headerParameters['X-Optima-Transaction-Guid'] = String(requestParameters.xOptimaTransactionGuid);
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Profiles/ExportCategories`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.BlobApiResponse(response);
    }

    /**
     * Exports the Profile list with the specified filters applied in a csv file
     * Exports a Profile entity list sorted and filtered in a csv file
     */
    async exportProfiles(requestParameters: ExportProfilesRequest): Promise<Blob> {
        const response = await this.exportProfilesRaw(requestParameters);
        return await response.value();
    }

    /**
     * Returns the Profile with the specified Id upon success
     * Gets a Profile entity by Id
     */
    async getProfileRaw(requestParameters: GetProfileRequest): Promise<runtime.ApiResponse<ProfileVm>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getProfile.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.xOptimaTransactionGuid !== undefined && requestParameters.xOptimaTransactionGuid !== null) {
            headerParameters['X-Optima-Transaction-Guid'] = String(requestParameters.xOptimaTransactionGuid);
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Profiles/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ProfileVmFromJSON(jsonValue));
    }

    /**
     * Returns the Profile with the specified Id upon success
     * Gets a Profile entity by Id
     */
    async getProfile(requestParameters: GetProfileRequest): Promise<ProfileVm> {
        const response = await this.getProfileRaw(requestParameters);
        return await response.value();
    }

    /**
     * Returns the Profile list with the specified filters applied
     * Gets a Profile entity list sorted and filtered
     */
    async getProfilesRaw(requestParameters: GetProfilesRequest): Promise<runtime.ApiResponse<ProfileVmPaginatedResponse>> {
        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.name !== undefined) {
            queryParameters['name'] = requestParameters.name;
        }

        if (requestParameters.statuses) {
            queryParameters['statuses'] = requestParameters.statuses;
        }

        if (requestParameters.userName !== undefined) {
            queryParameters['userName'] = requestParameters.userName;
        }

        if (requestParameters.email !== undefined) {
            queryParameters['email'] = requestParameters.email;
        }

        if (requestParameters.createdDate !== undefined) {
            queryParameters['createdDate'] = (requestParameters.createdDate as any).toISOString();
        }

        if (requestParameters.groupIds) {
            queryParameters['groupIds'] = requestParameters.groupIds;
        }

        if (requestParameters.permissionCount !== undefined) {
            queryParameters['permissionCount'] = requestParameters.permissionCount;
        }

        if (requestParameters.companyId !== undefined) {
            queryParameters['companyId'] = requestParameters.companyId;
        }

        if (requestParameters.jobRoleId !== undefined) {
            queryParameters['jobRoleId'] = requestParameters.jobRoleId;
        }

        if (requestParameters.companyName !== undefined) {
            queryParameters['companyName'] = requestParameters.companyName;
        }

        if (requestParameters.jobRoleName !== undefined) {
            queryParameters['jobRoleName'] = requestParameters.jobRoleName;
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

        if (requestParameters.xOptimaTransactionGuid !== undefined && requestParameters.xOptimaTransactionGuid !== null) {
            headerParameters['X-Optima-Transaction-Guid'] = String(requestParameters.xOptimaTransactionGuid);
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Profiles`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ProfileVmPaginatedResponseFromJSON(jsonValue));
    }

    /**
     * Returns the Profile list with the specified filters applied
     * Gets a Profile entity list sorted and filtered
     */
    async getProfiles(requestParameters: GetProfilesRequest): Promise<ProfileVmPaginatedResponse> {
        const response = await this.getProfilesRaw(requestParameters);
        return await response.value();
    }

    /**
     * Gets tab counts for profiles
     * Gets tab counts for profiles
     */
    async profileTabCountsRaw(requestParameters: ProfileTabCountsRequest): Promise<runtime.ApiResponse<ProfileTabCountsVm>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.xOptimaTransactionGuid !== undefined && requestParameters.xOptimaTransactionGuid !== null) {
            headerParameters['X-Optima-Transaction-Guid'] = String(requestParameters.xOptimaTransactionGuid);
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Profiles/TabCounts`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ProfileTabCountsVmFromJSON(jsonValue));
    }

    /**
     * Gets tab counts for profiles
     * Gets tab counts for profiles
     */
    async profileTabCounts(requestParameters: ProfileTabCountsRequest): Promise<ProfileTabCountsVm> {
        const response = await this.profileTabCountsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Sets the status of a Profile with Id of \"id\"
     * Sets the a Profile\'s status
     */
    async setProfileStatusRaw(requestParameters: SetProfileStatusRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling setProfileStatus.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (requestParameters.xOptimaTransactionGuid !== undefined && requestParameters.xOptimaTransactionGuid !== null) {
            headerParameters['X-Optima-Transaction-Guid'] = String(requestParameters.xOptimaTransactionGuid);
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Profiles/{id}/Status`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: ProfileStatusDtoToJSON(requestParameters.profileStatusDto),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Sets the status of a Profile with Id of \"id\"
     * Sets the a Profile\'s status
     */
    async setProfileStatus(requestParameters: SetProfileStatusRequest): Promise<void> {
        await this.setProfileStatusRaw(requestParameters);
    }

    /**
     * Updates a Profile entity with Id of \"id\" to entity \"company\"
     * Updates a Profile entity
     */
    async updateProfileRaw(requestParameters: UpdateProfileRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateProfile.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (requestParameters.xOptimaTransactionGuid !== undefined && requestParameters.xOptimaTransactionGuid !== null) {
            headerParameters['X-Optima-Transaction-Guid'] = String(requestParameters.xOptimaTransactionGuid);
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Profiles/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: ProfileDtoToJSON(requestParameters.profileDto),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Updates a Profile entity with Id of \"id\" to entity \"company\"
     * Updates a Profile entity
     */
    async updateProfile(requestParameters: UpdateProfileRequest): Promise<void> {
        await this.updateProfileRaw(requestParameters);
    }

}
