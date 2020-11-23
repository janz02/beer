/* tslint:disable */
/* eslint-disable */
/**
 * Optima Coupon
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
    AddNotificationTestCommand,
    AddNotificationTestCommandFromJSON,
    AddNotificationTestCommandToJSON,
    NotificationType,
    NotificationTypeFromJSON,
    NotificationTypeToJSON,
    NotificationsPaginatedResponse,
    NotificationsPaginatedResponseFromJSON,
    NotificationsPaginatedResponseToJSON,
    OrderByType,
    OrderByTypeFromJSON,
    OrderByTypeToJSON,
    ProblemDetails,
    ProblemDetailsFromJSON,
    ProblemDetailsToJSON,
} from '../models';

export interface AddTestNotificationRequest {
    xOPTIMATransactionGuid?: string;
    addNotificationTestCommand?: AddNotificationTestCommand;
}

export interface GetNotificationsRequest {
    fromDate?: Date | null;
    toDate?: Date | null;
    type?: NotificationType;
    page?: number;
    pageSize?: number;
    orderBy?: string | null;
    orderByType?: OrderByType;
    xOPTIMATransactionGuid?: string;
}

export interface NotificationTypesRequest {
    xOPTIMATransactionGuid?: string;
}

export interface SeenAllNotificationsRequest {
    xOPTIMATransactionGuid?: string;
}

export interface SeenNotificationRequest {
    id: number;
    xOPTIMATransactionGuid?: string;
}

export interface UnSeenNotificationRequest {
    id: number;
    xOPTIMATransactionGuid?: string;
}

/**
 * no description
 */
export class NotificationsApi extends runtime.BaseAPI {

    /**
     * For Testing purposes only
     */
    async addTestNotificationRaw(requestParameters: AddTestNotificationRequest): Promise<runtime.ApiResponse<void>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (requestParameters.xOPTIMATransactionGuid !== undefined && requestParameters.xOPTIMATransactionGuid !== null) {
            headerParameters['X-OPTIMA-Transaction-Guid'] = String(requestParameters.xOPTIMATransactionGuid);
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Notifications/TestNotification`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AddNotificationTestCommandToJSON(requestParameters.addNotificationTestCommand),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * For Testing purposes only
     */
    async addTestNotification(requestParameters: AddTestNotificationRequest): Promise<void> {
        await this.addTestNotificationRaw(requestParameters);
    }

    /**
     * Returns the Notifications with the specified filters applied
     * Gets a list of paginated/sorted notifications
     */
    async getNotificationsRaw(requestParameters: GetNotificationsRequest): Promise<runtime.ApiResponse<NotificationsPaginatedResponse>> {
        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.fromDate !== undefined) {
            queryParameters['fromDate'] = (requestParameters.fromDate as any).toISOString();
        }

        if (requestParameters.toDate !== undefined) {
            queryParameters['toDate'] = (requestParameters.toDate as any).toISOString();
        }

        if (requestParameters.type !== undefined) {
            queryParameters['type'] = requestParameters.type;
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

        if (requestParameters.xOPTIMATransactionGuid !== undefined && requestParameters.xOPTIMATransactionGuid !== null) {
            headerParameters['X-OPTIMA-Transaction-Guid'] = String(requestParameters.xOPTIMATransactionGuid);
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Notifications`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => NotificationsPaginatedResponseFromJSON(jsonValue));
    }

    /**
     * Returns the Notifications with the specified filters applied
     * Gets a list of paginated/sorted notifications
     */
    async getNotifications(requestParameters: GetNotificationsRequest): Promise<NotificationsPaginatedResponse> {
        const response = await this.getNotificationsRaw(requestParameters);
        return await response.value();
    }

    /**
     * Returns the possible notification types
     */
    async notificationTypesRaw(requestParameters: NotificationTypesRequest): Promise<runtime.ApiResponse<Array<string>>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.xOPTIMATransactionGuid !== undefined && requestParameters.xOPTIMATransactionGuid !== null) {
            headerParameters['X-OPTIMA-Transaction-Guid'] = String(requestParameters.xOPTIMATransactionGuid);
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Notifications/Types`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Returns the possible notification types
     */
    async notificationTypes(requestParameters: NotificationTypesRequest): Promise<Array<string>> {
        const response = await this.notificationTypesRaw(requestParameters);
        return await response.value();
    }

    /**
     * Sets user unseen notifications to seen
     * Updates all notification to seen for the current user
     */
    async seenAllNotificationsRaw(requestParameters: SeenAllNotificationsRequest): Promise<runtime.ApiResponse<void>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.xOPTIMATransactionGuid !== undefined && requestParameters.xOPTIMATransactionGuid !== null) {
            headerParameters['X-OPTIMA-Transaction-Guid'] = String(requestParameters.xOPTIMATransactionGuid);
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Notifications/SeenAll`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Sets user unseen notifications to seen
     * Updates all notification to seen for the current user
     */
    async seenAllNotifications(requestParameters: SeenAllNotificationsRequest): Promise<void> {
        await this.seenAllNotificationsRaw(requestParameters);
    }

    /**
     * Sets the notification with the given Id as seen
     * Updates a notification to seen
     */
    async seenNotificationRaw(requestParameters: SeenNotificationRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling seenNotification.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.xOPTIMATransactionGuid !== undefined && requestParameters.xOPTIMATransactionGuid !== null) {
            headerParameters['X-OPTIMA-Transaction-Guid'] = String(requestParameters.xOPTIMATransactionGuid);
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Notifications/{id}/Seen`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Sets the notification with the given Id as seen
     * Updates a notification to seen
     */
    async seenNotification(requestParameters: SeenNotificationRequest): Promise<void> {
        await this.seenNotificationRaw(requestParameters);
    }

    /**
     * Sets the notification with the given Id as unseen
     * Updates a notification to unseen
     */
    async unSeenNotificationRaw(requestParameters: UnSeenNotificationRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling unSeenNotification.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.xOPTIMATransactionGuid !== undefined && requestParameters.xOPTIMATransactionGuid !== null) {
            headerParameters['X-OPTIMA-Transaction-Guid'] = String(requestParameters.xOPTIMATransactionGuid);
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Notifications/{id}/UnSeen`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Sets the notification with the given Id as unseen
     * Updates a notification to unseen
     */
    async unSeenNotification(requestParameters: UnSeenNotificationRequest): Promise<void> {
        await this.unSeenNotificationRaw(requestParameters);
    }

}
