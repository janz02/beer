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
    NKMRTDCampaignEditorPrototypesCreateCampaignTreatmentVm,
    NKMRTDCampaignEditorPrototypesCreateCampaignTreatmentVmFromJSON,
    NKMRTDCampaignEditorPrototypesCreateCampaignTreatmentVmToJSON,
    NKMRTDCampaignEditorPrototypesCreateCampaignVm,
    NKMRTDCampaignEditorPrototypesCreateCampaignVmFromJSON,
    NKMRTDCampaignEditorPrototypesCreateCampaignVmToJSON,
} from '../models';

/**
 * no description
 */
export class ViewModelsApi extends runtime.BaseAPI {

    /**
     * Used in the secound screen of campaign creation.
     * Returns selection lists of controls to help the user with the options.
     */
    async createCampaignTreatmentRaw(): Promise<runtime.ApiResponse<NKMRTDCampaignEditorPrototypesCreateCampaignTreatmentVm>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/ViewModels/CreateCampaignTreatment`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => NKMRTDCampaignEditorPrototypesCreateCampaignTreatmentVmFromJSON(jsonValue));
    }

    /**
     * Used in the secound screen of campaign creation.
     * Returns selection lists of controls to help the user with the options.
     */
    async createCampaignTreatment(): Promise<NKMRTDCampaignEditorPrototypesCreateCampaignTreatmentVm> {
        const response = await this.createCampaignTreatmentRaw();
        return await response.value();
    }

    /**
     * Used in the first screen of campaign creation.
     * Returns selection lists of controls to help the user with the options.
     */
    async createCampaignViewModelRaw(): Promise<runtime.ApiResponse<NKMRTDCampaignEditorPrototypesCreateCampaignVm>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/ViewModels/CreateCampaign`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => NKMRTDCampaignEditorPrototypesCreateCampaignVmFromJSON(jsonValue));
    }

    /**
     * Used in the first screen of campaign creation.
     * Returns selection lists of controls to help the user with the options.
     */
    async createCampaignViewModel(): Promise<NKMRTDCampaignEditorPrototypesCreateCampaignVm> {
        const response = await this.createCampaignViewModelRaw();
        return await response.value();
    }

}
