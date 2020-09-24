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
    CreateUpdatePermissionCommand,
    CreateUpdatePermissionCommandFromJSON,
    CreateUpdatePermissionCommandToJSON,
    PermissionVm,
    PermissionVmFromJSON,
    PermissionVmToJSON,
    PermissionVmPaginatedSearchResponse,
    PermissionVmPaginatedSearchResponseFromJSON,
    PermissionVmPaginatedSearchResponseToJSON,
} from '../models';

export interface CreatePermissionRequest {
    createUpdatePermissionCommand?: CreateUpdatePermissionCommand;
}

export interface DeletePermissionRequest {
    id: number;
}

export interface GetManyPermissionsRequest {
    ids?: Array<number>;
}

export interface GetPermissionRequest {
    id: number;
}

export interface GetPermissionsRequest {
    skip?: number;
    take?: number;
    orderBy?: string;
    ids?: Array<number>;
    page?: number;
    pageSize?: number;
}

export interface UpdatePermissionRequest {
    id: number;
    createUpdatePermissionCommand?: CreateUpdatePermissionCommand;
}

/**
 * no description
 */
export class PermissionsApi extends runtime.BaseAPI {

    /**
     * Creates the dedicates permisson. The creation will results in an identification,  assigned to the current instance.
     */
    async createPermissionRaw(requestParameters: CreatePermissionRequest): Promise<runtime.ApiResponse<number>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json-patch+json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Permissions/Create`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateUpdatePermissionCommandToJSON(requestParameters.createUpdatePermissionCommand),
        });

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     * Creates the dedicates permisson. The creation will results in an identification,  assigned to the current instance.
     */
    async createPermission(requestParameters: CreatePermissionRequest): Promise<number> {
        const response = await this.createPermissionRaw(requestParameters);
        return await response.value();
    }

    /**
     * Delete the item signed with the id.
     */
    async deletePermissionRaw(requestParameters: DeletePermissionRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deletePermission.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Permissions/Delete/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Delete the item signed with the id.
     */
    async deletePermission(requestParameters: DeletePermissionRequest): Promise<void> {
        await this.deletePermissionRaw(requestParameters);
    }

    /**
     * Returns the permissions identified by the ids.
     */
    async getManyPermissionsRaw(requestParameters: GetManyPermissionsRequest): Promise<runtime.ApiResponse<Array<PermissionVm>>> {
        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.ids) {
            queryParameters['ids'] = requestParameters.ids;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Permissions/GetMany/many`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(PermissionVmFromJSON));
    }

    /**
     * Returns the permissions identified by the ids.
     */
    async getManyPermissions(requestParameters: GetManyPermissionsRequest): Promise<Array<PermissionVm>> {
        const response = await this.getManyPermissionsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Gets the requested permission, identified by id.
     */
    async getPermissionRaw(requestParameters: GetPermissionRequest): Promise<runtime.ApiResponse<PermissionVm>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getPermission.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Permissions/GetOne/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => PermissionVmFromJSON(jsonValue));
    }

    /**
     * Gets the requested permission, identified by id.
     */
    async getPermission(requestParameters: GetPermissionRequest): Promise<PermissionVm> {
        const response = await this.getPermissionRaw(requestParameters);
        return await response.value();
    }

    /**
     * Returns the permissions for the actual query.
     */
    async getPermissionsRaw(requestParameters: GetPermissionsRequest): Promise<runtime.ApiResponse<PermissionVmPaginatedSearchResponse>> {
        const queryParameters: runtime.HTTPQuery = {};

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

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Permissions/GetAll`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => PermissionVmPaginatedSearchResponseFromJSON(jsonValue));
    }

    /**
     * Returns the permissions for the actual query.
     */
    async getPermissions(requestParameters: GetPermissionsRequest): Promise<PermissionVmPaginatedSearchResponse> {
        const response = await this.getPermissionsRaw(requestParameters);
        return await response.value();
    }

    /**
     * The endpoint basic results in Microsoft.AspNetCore.Mvc.NoContentResult. If the process mechanism was  failed for some reason the result is Microsoft.AspNetCore.Mvc.ForbidResult.
     * Update the current instance with the fulfilled model
     */
    async updatePermissionRaw(requestParameters: UpdatePermissionRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updatePermission.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json-patch+json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Permissions/Update/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: CreateUpdatePermissionCommandToJSON(requestParameters.createUpdatePermissionCommand),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * The endpoint basic results in Microsoft.AspNetCore.Mvc.NoContentResult. If the process mechanism was  failed for some reason the result is Microsoft.AspNetCore.Mvc.ForbidResult.
     * Update the current instance with the fulfilled model
     */
    async updatePermission(requestParameters: UpdatePermissionRequest): Promise<void> {
        await this.updatePermissionRaw(requestParameters);
    }

}
