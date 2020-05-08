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
    ChangePasswordDto,
    ChangePasswordDtoFromJSON,
    ChangePasswordDtoToJSON,
    LoginDto,
    LoginDtoFromJSON,
    LoginDtoToJSON,
    OrderByType,
    OrderByTypeFromJSON,
    OrderByTypeToJSON,
    PartnerContactStateDto,
    PartnerContactStateDtoFromJSON,
    PartnerContactStateDtoToJSON,
    PartnerContactStateVm,
    PartnerContactStateVmFromJSON,
    PartnerContactStateVmToJSON,
    PartnerContactVmPaginatedResponse,
    PartnerContactVmPaginatedResponseFromJSON,
    PartnerContactVmPaginatedResponseToJSON,
    ProblemDetails,
    ProblemDetailsFromJSON,
    ProblemDetailsToJSON,
    RefreshDto,
    RefreshDtoFromJSON,
    RefreshDtoToJSON,
    RegisterPartnerContactDto,
    RegisterPartnerContactDtoFromJSON,
    RegisterPartnerContactDtoToJSON,
    RegisterPartnerDto,
    RegisterPartnerDtoFromJSON,
    RegisterPartnerDtoToJSON,
    RegisterUserDto,
    RegisterUserDtoFromJSON,
    RegisterUserDtoToJSON,
    Roles,
    RolesFromJSON,
    RolesToJSON,
    UserVm,
    UserVmFromJSON,
    UserVmToJSON,
} from '../models';

export interface ChangePasswordRequest {
    changePasswordDto?: ChangePasswordDto;
}

export interface GetNkmPartnerContactsInfoRequest {
    name?: string | null;
    phone?: string | null;
    email?: string | null;
    partnerName?: string | null;
    isActive?: boolean | null;
    role?: Roles;
    majorPartner?: boolean | null;
    page?: number;
    pageSize?: number;
    orderBy?: string | null;
    orderByType?: OrderByType;
}

export interface GetPartnerContactInfoRequest {
    id: number;
}

export interface GetPartnerContactsInfoRequest {
    name?: string | null;
    phone?: string | null;
    email?: string | null;
    partnerName?: string | null;
    isActive?: boolean | null;
    role?: Roles;
    majorPartner?: boolean | null;
    page?: number;
    pageSize?: number;
    orderBy?: string | null;
    orderByType?: OrderByType;
}

export interface LoginRequest {
    loginDto?: LoginDto;
}

export interface RefreshRequest {
    refreshDto?: RefreshDto;
}

export interface RegisterPartnerRequest {
    registerPartnerDto?: RegisterPartnerDto;
}

export interface RegisterPartnerContactRequest {
    registerPartnerContactDto?: RegisterPartnerContactDto;
}

export interface RegisterUserRequest {
    registerUserDto?: RegisterUserDto;
}

export interface UpdatePartnerContactInfoRequest {
    id: number;
    partnerContactStateDto?: PartnerContactStateDto;
}

/**
 * no description
 */
export class AuthApi extends runtime.BaseAPI {

    /**
     * Returns nothing
     * Changes the password for the logged in User
     */
    async changePasswordRaw(requestParameters: ChangePasswordRequest): Promise<runtime.ApiResponse<void>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Auth/ChangePassword`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ChangePasswordDtoToJSON(requestParameters.changePasswordDto),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Returns nothing
     * Changes the password for the logged in User
     */
    async changePassword(requestParameters: ChangePasswordRequest): Promise<void> {
        await this.changePasswordRaw(requestParameters);
    }

    /**
     * Returns the details of elevated users in paginated form
     * Returns the details of elevated users
     */
    async getNkmPartnerContactsInfoRaw(requestParameters: GetNkmPartnerContactsInfoRequest): Promise<runtime.ApiResponse<PartnerContactVmPaginatedResponse>> {
        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.name !== undefined) {
            queryParameters['name'] = requestParameters.name;
        }

        if (requestParameters.phone !== undefined) {
            queryParameters['phone'] = requestParameters.phone;
        }

        if (requestParameters.email !== undefined) {
            queryParameters['email'] = requestParameters.email;
        }

        if (requestParameters.partnerName !== undefined) {
            queryParameters['partnerName'] = requestParameters.partnerName;
        }

        if (requestParameters.isActive !== undefined) {
            queryParameters['isActive'] = requestParameters.isActive;
        }

        if (requestParameters.role !== undefined) {
            queryParameters['role'] = requestParameters.role;
        }

        if (requestParameters.majorPartner !== undefined) {
            queryParameters['majorPartner'] = requestParameters.majorPartner;
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
            path: `/api/Auth/GetNkmPartnerContacts`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => PartnerContactVmPaginatedResponseFromJSON(jsonValue));
    }

    /**
     * Returns the details of elevated users in paginated form
     * Returns the details of elevated users
     */
    async getNkmPartnerContactsInfo(requestParameters: GetNkmPartnerContactsInfoRequest): Promise<PartnerContactVmPaginatedResponse> {
        const response = await this.getNkmPartnerContactsInfoRaw(requestParameters);
        return await response.value();
    }

    /**
     * Returns the details of a partner contact
     * Returns the details of a partner contact
     */
    async getPartnerContactInfoRaw(requestParameters: GetPartnerContactInfoRequest): Promise<runtime.ApiResponse<PartnerContactStateVm>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getPartnerContactInfo.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Auth/GetOnePartnerContact/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => PartnerContactStateVmFromJSON(jsonValue));
    }

    /**
     * Returns the details of a partner contact
     * Returns the details of a partner contact
     */
    async getPartnerContactInfo(requestParameters: GetPartnerContactInfoRequest): Promise<PartnerContactStateVm> {
        const response = await this.getPartnerContactInfoRaw(requestParameters);
        return await response.value();
    }

    /**
     * Returns the details of partner contacts in paginated form
     * Returns the details of partner contacts
     */
    async getPartnerContactsInfoRaw(requestParameters: GetPartnerContactsInfoRequest): Promise<runtime.ApiResponse<PartnerContactVmPaginatedResponse>> {
        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.name !== undefined) {
            queryParameters['name'] = requestParameters.name;
        }

        if (requestParameters.phone !== undefined) {
            queryParameters['phone'] = requestParameters.phone;
        }

        if (requestParameters.email !== undefined) {
            queryParameters['email'] = requestParameters.email;
        }

        if (requestParameters.partnerName !== undefined) {
            queryParameters['partnerName'] = requestParameters.partnerName;
        }

        if (requestParameters.isActive !== undefined) {
            queryParameters['isActive'] = requestParameters.isActive;
        }

        if (requestParameters.role !== undefined) {
            queryParameters['role'] = requestParameters.role;
        }

        if (requestParameters.majorPartner !== undefined) {
            queryParameters['majorPartner'] = requestParameters.majorPartner;
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
            path: `/api/Auth/GetPartnerContacts`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => PartnerContactVmPaginatedResponseFromJSON(jsonValue));
    }

    /**
     * Returns the details of partner contacts in paginated form
     * Returns the details of partner contacts
     */
    async getPartnerContactsInfo(requestParameters: GetPartnerContactsInfoRequest): Promise<PartnerContactVmPaginatedResponse> {
        const response = await this.getPartnerContactsInfoRaw(requestParameters);
        return await response.value();
    }

    /**
     * Returns user info about the logged in user
     * Logs in a user
     */
    async loginRaw(requestParameters: LoginRequest): Promise<runtime.ApiResponse<UserVm>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Auth/Login`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: LoginDtoToJSON(requestParameters.loginDto),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => UserVmFromJSON(jsonValue));
    }

    /**
     * Returns user info about the logged in user
     * Logs in a user
     */
    async login(requestParameters: LoginRequest): Promise<UserVm> {
        const response = await this.loginRaw(requestParameters);
        return await response.value();
    }

    /**
     * Returns user info about the logged in user
     * Refreshes the JWT token
     */
    async refreshRaw(requestParameters: RefreshRequest): Promise<runtime.ApiResponse<UserVm>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Auth/Refresh`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: RefreshDtoToJSON(requestParameters.refreshDto),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => UserVmFromJSON(jsonValue));
    }

    /**
     * Returns user info about the logged in user
     * Refreshes the JWT token
     */
    async refresh(requestParameters: RefreshRequest): Promise<UserVm> {
        const response = await this.refreshRaw(requestParameters);
        return await response.value();
    }

    /**
     * Registers a Sme(Kkv) partner
     */
    async registerPartnerRaw(requestParameters: RegisterPartnerRequest): Promise<runtime.ApiResponse<void>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Auth/RegisterPartner`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: RegisterPartnerDtoToJSON(requestParameters.registerPartnerDto),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Registers a Sme(Kkv) partner
     */
    async registerPartner(requestParameters: RegisterPartnerRequest): Promise<void> {
        await this.registerPartnerRaw(requestParameters);
    }

    /**
     * Returns nothing, but registers a contact for the partner
     * Registers a contact for a partner
     */
    async registerPartnerContactRaw(requestParameters: RegisterPartnerContactRequest): Promise<runtime.ApiResponse<void>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Auth/RegisterPartnerContact`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: RegisterPartnerContactDtoToJSON(requestParameters.registerPartnerContactDto),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Returns nothing, but registers a contact for the partner
     * Registers a contact for a partner
     */
    async registerPartnerContact(requestParameters: RegisterPartnerContactRequest): Promise<void> {
        await this.registerPartnerContactRaw(requestParameters);
    }

    /**
     * Returns nothing, but registers a user
     * Registers a user
     */
    async registerUserRaw(requestParameters: RegisterUserRequest): Promise<runtime.ApiResponse<void>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Auth/RegisterUser`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: RegisterUserDtoToJSON(requestParameters.registerUserDto),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Returns nothing, but registers a user
     * Registers a user
     */
    async registerUser(requestParameters: RegisterUserRequest): Promise<void> {
        await this.registerUserRaw(requestParameters);
    }

    /**
     * Syncs in all the users from AD to be listed
     */
    async syncAdUsersRaw(): Promise<runtime.ApiResponse<void>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Auth/SyncAdUsers`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Syncs in all the users from AD to be listed
     */
    async syncAdUsers(): Promise<void> {
        await this.syncAdUsersRaw();
    }

    /**
     * Updates the details of an elevated user or partner contact
     * Updates the details of an elevated user or partner contact
     */
    async updatePartnerContactInfoRaw(requestParameters: UpdatePartnerContactInfoRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updatePartnerContactInfo.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Auth/UpdatePartnerContact/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: PartnerContactStateDtoToJSON(requestParameters.partnerContactStateDto),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Updates the details of an elevated user or partner contact
     * Updates the details of an elevated user or partner contact
     */
    async updatePartnerContactInfo(requestParameters: UpdatePartnerContactInfoRequest): Promise<void> {
        await this.updatePartnerContactInfoRaw(requestParameters);
    }

}
