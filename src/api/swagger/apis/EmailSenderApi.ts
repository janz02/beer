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
    InvitePartnerContactDto,
    InvitePartnerContactDtoFromJSON,
    InvitePartnerContactDtoToJSON,
    SendEmailToSegmentDto,
    SendEmailToSegmentDtoFromJSON,
    SendEmailToSegmentDtoToJSON,
    SendEmailsDto,
    SendEmailsDtoFromJSON,
    SendEmailsDtoToJSON,
} from '../models';

export interface InvitePartnerContactRequest {
    invitePartnerContactDto?: InvitePartnerContactDto;
}

export interface SendEmailToSegmentRequest {
    sendEmailToSegmentDto?: SendEmailToSegmentDto;
}

export interface SendTestEmailRequest {
    sendEmailsDto?: SendEmailsDto;
}

/**
 * no description
 */
 //extra lines
export class EmailSenderApi extends runtime.BaseAPI {

    /**
     * Sends an invite partner contact email to the specified email address
     */
    async invitePartnerContactRaw(requestParameters: InvitePartnerContactRequest): Promise<runtime.ApiResponse<void>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/EmailSender/InvitePartnerContact`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: InvitePartnerContactDtoToJSON(requestParameters.invitePartnerContactDto),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Sends an invite partner contact email to the specified email address
     */
    async invitePartnerContact(requestParameters: InvitePartnerContactRequest): Promise<void> {
        await this.invitePartnerContactRaw(requestParameters);
    }

    /**
     * Sends the email template to the selected segment defined in RTD
     */
    async sendEmailToSegmentRaw(requestParameters: SendEmailToSegmentRequest): Promise<runtime.ApiResponse<void>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/EmailSender/Segment`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: SendEmailToSegmentDtoToJSON(requestParameters.sendEmailToSegmentDto),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Sends the email template to the selected segment defined in RTD
     */
    async sendEmailToSegment(requestParameters: SendEmailToSegmentRequest): Promise<void> {
        await this.sendEmailToSegmentRaw(requestParameters);
    }

    /**
     * Sends the email template out to the test recipients
     */
    async sendTestEmailRaw(requestParameters: SendTestEmailRequest): Promise<runtime.ApiResponse<void>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/EmailSender/Test`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: SendEmailsDtoToJSON(requestParameters.sendEmailsDto),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Sends the email template out to the test recipients
     */
    async sendTestEmail(requestParameters: SendTestEmailRequest): Promise<void> {
        await this.sendTestEmailRaw(requestParameters);
    }

}
