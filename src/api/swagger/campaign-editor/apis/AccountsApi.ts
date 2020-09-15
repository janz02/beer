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
    AdGroupModelPaginatedSearchResponse,
    AdGroupModelPaginatedSearchResponseFromJSON,
    AdGroupModelPaginatedSearchResponseToJSON,
    FunctionPermissionModelPaginatedSearchResponse,
    FunctionPermissionModelPaginatedSearchResponseFromJSON,
    FunctionPermissionModelPaginatedSearchResponseToJSON,
    LoginRequestModel,
    LoginRequestModelFromJSON,
    LoginRequestModelToJSON,
    ProfileViewModel,
    ProfileViewModelFromJSON,
    ProfileViewModelToJSON,
    UserDto,
    UserDtoFromJSON,
    UserDtoToJSON,
    UserModelPaginatedSearchResponse,
    UserModelPaginatedSearchResponseFromJSON,
    UserModelPaginatedSearchResponseToJSON,
} from '../models';

export interface GetAdGroupsRequest {
    _queryParameters?: { [key: string]: string; };
}

export interface GetFunctionPermissionsRequest {
    _queryParameters?: { [key: string]: string; };
}

export interface GetUsersForPermissionRequest {
    _queryParameters?: { [key: string]: string; };
}

export interface LoginRequest {
    loginRequestModel?: LoginRequestModel;
}

/**
 * no description
 */
export class AccountsApi extends runtime.BaseAPI {

    /**
     * Implementation not complete, the queryParameters only uses permissionId  and in page response will returns all entities, neither order is processed.
     * Query for groups in the system which were synchronized from the domain Active Directory
     */
    async getAdGroupsRaw(requestParameters: GetAdGroupsRequest): Promise<runtime.ApiResponse<AdGroupModelPaginatedSearchResponse>> {
        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters._queryParameters !== undefined) {
            queryParameters['queryParameters'] = requestParameters._queryParameters;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Accounts/GetAllAdGroup`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => AdGroupModelPaginatedSearchResponseFromJSON(jsonValue));
    }

    /**
     * Implementation not complete, the queryParameters only uses permissionId  and in page response will returns all entities, neither order is processed.
     * Query for groups in the system which were synchronized from the domain Active Directory
     */
    async getAdGroups(requestParameters: GetAdGroupsRequest): Promise<AdGroupModelPaginatedSearchResponse> {
        const response = await this.getAdGroupsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Implementation not complete, the queryParameters only uses permissionId  and in page response will returns all entities, neither order is processed.
     * Query for all function permission for the given permissionId.
     */
    async getFunctionPermissionsRaw(requestParameters: GetFunctionPermissionsRequest): Promise<runtime.ApiResponse<FunctionPermissionModelPaginatedSearchResponse>> {
        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters._queryParameters !== undefined) {
            queryParameters['queryParameters'] = requestParameters._queryParameters;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Accounts/GetAllFunctionPermission`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => FunctionPermissionModelPaginatedSearchResponseFromJSON(jsonValue));
    }

    /**
     * Implementation not complete, the queryParameters only uses permissionId  and in page response will returns all entities, neither order is processed.
     * Query for all function permission for the given permissionId.
     */
    async getFunctionPermissions(requestParameters: GetFunctionPermissionsRequest): Promise<FunctionPermissionModelPaginatedSearchResponse> {
        const response = await this.getFunctionPermissionsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Has only temporary implementation on service since there is no exact functional  requirement for the profile!
     * Returns basic information about the current user. The profile will be returned.
     */
    async getMyAccountRaw(): Promise<runtime.ApiResponse<ProfileViewModel>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Accounts/Me`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ProfileViewModelFromJSON(jsonValue));
    }

    /**
     * Has only temporary implementation on service since there is no exact functional  requirement for the profile!
     * Returns basic information about the current user. The profile will be returned.
     */
    async getMyAccount(): Promise<ProfileViewModel> {
        const response = await this.getMyAccountRaw();
        return await response.value();
    }

    /**
     * Returns all the users stored in the system.
     */
    async getUserAccountsRaw(): Promise<runtime.ApiResponse<Array<UserDto>>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Accounts/GetUsers`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(UserDtoFromJSON));
    }

    /**
     * Returns all the users stored in the system.
     */
    async getUserAccounts(): Promise<Array<UserDto>> {
        const response = await this.getUserAccountsRaw();
        return await response.value();
    }

    /**
     * Implementation not complete, the queryParameters only uses permissionId  and in page response will returns all entities, neither order is processed.
     * Query for all directly referenced users for the given permissionId.
     */
    async getUsersForPermissionRaw(requestParameters: GetUsersForPermissionRequest): Promise<runtime.ApiResponse<UserModelPaginatedSearchResponse>> {
        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters._queryParameters !== undefined) {
            queryParameters['queryParameters'] = requestParameters._queryParameters;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Accounts/GetUsersForPermission`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => UserModelPaginatedSearchResponseFromJSON(jsonValue));
    }

    /**
     * Implementation not complete, the queryParameters only uses permissionId  and in page response will returns all entities, neither order is processed.
     * Query for all directly referenced users for the given permissionId.
     */
    async getUsersForPermission(requestParameters: GetUsersForPermissionRequest): Promise<UserModelPaginatedSearchResponse> {
        const response = await this.getUsersForPermissionRaw(requestParameters);
        return await response.value();
    }

    /**
     * Gives Microsoft.AspNetCore.Mvc.UnauthorizedResult in case user was not found and in case  any error occurs handles as Microsoft.AspNetCore.Mvc.BadRequestResult.
     * Tries to authenticate with the given information against the configured Active  Directory.
     */
    async loginRaw(requestParameters: LoginRequest): Promise<runtime.ApiResponse<string>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json-patch+json';

        const response = await this.request({
            path: `/api/Accounts/Login`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: LoginRequestModelToJSON(requestParameters.loginRequestModel),
        });

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     * Gives Microsoft.AspNetCore.Mvc.UnauthorizedResult in case user was not found and in case  any error occurs handles as Microsoft.AspNetCore.Mvc.BadRequestResult.
     * Tries to authenticate with the given information against the configured Active  Directory.
     */
    async login(requestParameters: LoginRequest): Promise<string> {
        const response = await this.loginRaw(requestParameters);
        return await response.value();
    }

    /**
     * Removes the refresh token, effectively logging the user out.
     */
    async logoutRaw(): Promise<runtime.ApiResponse<void>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/Accounts/Logout`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Removes the refresh token, effectively logging the user out.
     */
    async logout(): Promise<void> {
        await this.logoutRaw();
    }

    /**
     * Gives Microsoft.AspNetCore.Mvc.UnauthorizedResult in case user was not found and in case  any error occurs handles as Microsoft.AspNetCore.Mvc.BadRequestResult.
     * Returns refresh token for the current user, for long term session.
     */
    async refreshTokenRaw(): Promise<runtime.ApiResponse<void>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/Accounts/RefreshToken`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Gives Microsoft.AspNetCore.Mvc.UnauthorizedResult in case user was not found and in case  any error occurs handles as Microsoft.AspNetCore.Mvc.BadRequestResult.
     * Returns refresh token for the current user, for long term session.
     */
    async refreshToken(): Promise<void> {
        await this.refreshTokenRaw();
    }

}
