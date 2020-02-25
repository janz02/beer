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
    CreateEmailTemplateDto,
    CreateEmailTemplateDtoFromJSON,
    CreateEmailTemplateDtoToJSON,
    EmailTemplateSummaryVmPaginatedResponse,
    EmailTemplateSummaryVmPaginatedResponseFromJSON,
    EmailTemplateSummaryVmPaginatedResponseToJSON,
    EmailTemplateVersionDto,
    EmailTemplateVersionDtoFromJSON,
    EmailTemplateVersionDtoToJSON,
    EmailTemplateVm,
    EmailTemplateVmFromJSON,
    EmailTemplateVmToJSON,
    Int32EntityCreatedVm,
    Int32EntityCreatedVmFromJSON,
    Int32EntityCreatedVmToJSON,
    OrderByType,
    OrderByTypeFromJSON,
    OrderByTypeToJSON,
} from '../models';

export interface CreateTemplateRequest {
    createEmailTemplateDto?: CreateEmailTemplateDto;
}

export interface DeleteTemplateRequest {
    id: number;
}

export interface GetTemplateRequest {
    id: number;
}

export interface GetTemplatesRequest {
    name?: string;
    page?: number;
    pageSize?: number;
    orderBy?: string;
    orderByType?: OrderByType;
}

export interface RestoreTemplateVersionRequest {
    id: number;
    version: number;
}

export interface SaveTemplateVersionRequest {
    id: number;
    emailTemplateVersionDto?: EmailTemplateVersionDto;
}

/**
 * no description
 */
export class EmailTemplatesApi extends runtime.BaseAPI {

    /**
     * Returns the id of the new template
     * Creates an email template
     */
    async createTemplateRaw(requestParameters: CreateTemplateRequest): Promise<runtime.ApiResponse<Int32EntityCreatedVm>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/EmailTemplates`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateEmailTemplateDtoToJSON(requestParameters.createEmailTemplateDto),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => Int32EntityCreatedVmFromJSON(jsonValue));
    }

    /**
     * Returns the id of the new template
     * Creates an email template
     */
    async createTemplate(requestParameters: CreateTemplateRequest): Promise<Int32EntityCreatedVm> {
        const response = await this.createTemplateRaw(requestParameters);
        return await response.value();
    }

    /**
     * Deletes an email template
     */
    async deleteTemplateRaw(requestParameters: DeleteTemplateRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteTemplate.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/EmailTemplates/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Deletes an email template
     */
    async deleteTemplate(requestParameters: DeleteTemplateRequest): Promise<void> {
        await this.deleteTemplateRaw(requestParameters);
    }

    /**
     * Gets an email template
     */
    async getTemplateRaw(requestParameters: GetTemplateRequest): Promise<runtime.ApiResponse<EmailTemplateVm>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getTemplate.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/EmailTemplates/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => EmailTemplateVmFromJSON(jsonValue));
    }

    /**
     * Gets an email template
     */
    async getTemplate(requestParameters: GetTemplateRequest): Promise<EmailTemplateVm> {
        const response = await this.getTemplateRaw(requestParameters);
        return await response.value();
    }

    /**
     * Gets all the available Email Temmplates
     */
    async getTemplatesRaw(requestParameters: GetTemplatesRequest): Promise<runtime.ApiResponse<EmailTemplateSummaryVmPaginatedResponse>> {
        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.name !== undefined) {
            queryParameters['name'] = requestParameters.name;
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
            path: `/api/EmailTemplates`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => EmailTemplateSummaryVmPaginatedResponseFromJSON(jsonValue));
    }

    /**
     * Gets all the available Email Temmplates
     */
    async getTemplates(requestParameters: GetTemplatesRequest): Promise<EmailTemplateSummaryVmPaginatedResponse> {
        const response = await this.getTemplatesRaw(requestParameters);
        return await response.value();
    }

    /**
     * Returns the id of the new template
     * Creates an email template
     */
    async restoreTemplateVersionRaw(requestParameters: RestoreTemplateVersionRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling restoreTemplateVersion.');
        }

        if (requestParameters.version === null || requestParameters.version === undefined) {
            throw new runtime.RequiredError('version','Required parameter requestParameters.version was null or undefined when calling restoreTemplateVersion.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/EmailTemplates/{id}/Version/{version}/Restore`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))).replace(`{${"version"}}`, encodeURIComponent(String(requestParameters.version))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Returns the id of the new template
     * Creates an email template
     */
    async restoreTemplateVersion(requestParameters: RestoreTemplateVersionRequest): Promise<void> {
        await this.restoreTemplateVersionRaw(requestParameters);
    }

    /**
     * Returns the id of the new template
     * Creates an email template
     */
    async saveTemplateVersionRaw(requestParameters: SaveTemplateVersionRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling saveTemplateVersion.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/EmailTemplates/{id}/Version`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: EmailTemplateVersionDtoToJSON(requestParameters.emailTemplateVersionDto),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Returns the id of the new template
     * Creates an email template
     */
    async saveTemplateVersion(requestParameters: SaveTemplateVersionRequest): Promise<void> {
        await this.saveTemplateVersionRaw(requestParameters);
    }

}
