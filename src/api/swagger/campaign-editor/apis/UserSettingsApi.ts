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
    MicrosoftAspNetCoreMvcProblemDetails,
    MicrosoftAspNetCoreMvcProblemDetailsFromJSON,
    MicrosoftAspNetCoreMvcProblemDetailsToJSON,
    NKMRTDCampaignEditorApplicationCommonMessagesViewModelsUserSettingsVm,
    NKMRTDCampaignEditorApplicationCommonMessagesViewModelsUserSettingsVmFromJSON,
    NKMRTDCampaignEditorApplicationCommonMessagesViewModelsUserSettingsVmToJSON,
} from '../models';

export interface SetLanguageRequest {
    languageId: number;
}

/**
 * no description
 */
export class UserSettingsApi extends runtime.BaseAPI {

    /**
     * Get current user\'s setting
     */
    async getUserSettingRaw(): Promise<runtime.ApiResponse<NKMRTDCampaignEditorApplicationCommonMessagesViewModelsUserSettingsVm>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/UserSettings`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => NKMRTDCampaignEditorApplicationCommonMessagesViewModelsUserSettingsVmFromJSON(jsonValue));
    }

    /**
     * Get current user\'s setting
     */
    async getUserSetting(): Promise<NKMRTDCampaignEditorApplicationCommonMessagesViewModelsUserSettingsVm> {
        const response = await this.getUserSettingRaw();
        return await response.value();
    }

    /**
     * Set current user\'s language
     */
    async setLanguageRaw(requestParameters: SetLanguageRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.languageId === null || requestParameters.languageId === undefined) {
            throw new runtime.RequiredError('languageId','Required parameter requestParameters.languageId was null or undefined when calling setLanguage.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/UserSettings/setlanguage/{languageId}`.replace(`{${"languageId"}}`, encodeURIComponent(String(requestParameters.languageId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Set current user\'s language
     */
    async setLanguage(requestParameters: SetLanguageRequest): Promise<void> {
        await this.setLanguageRaw(requestParameters);
    }

}
