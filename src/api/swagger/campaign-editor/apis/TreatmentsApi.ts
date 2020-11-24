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
    OptimaCampaignEditorApplicationModelsCampaignTreatmentVm,
    OptimaCampaignEditorApplicationModelsCampaignTreatmentVmFromJSON,
    OptimaCampaignEditorApplicationModelsCampaignTreatmentVmToJSON,
} from '../models';

export interface GetTreatmentRequest {
    id: number;
}

/**
 * no description
 */
export class TreatmentsApi extends runtime.BaseAPI {

    /**
     * Gets the requested treatment, identified by the container campaign id.
     */
    async getTreatmentRaw(requestParameters: GetTreatmentRequest): Promise<runtime.ApiResponse<OptimaCampaignEditorApplicationModelsCampaignTreatmentVm>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getTreatment.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Treatments/GetByCampaignId/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => OptimaCampaignEditorApplicationModelsCampaignTreatmentVmFromJSON(jsonValue));
    }

    /**
     * Gets the requested treatment, identified by the container campaign id.
     */
    async getTreatment(requestParameters: GetTreatmentRequest): Promise<OptimaCampaignEditorApplicationModelsCampaignTreatmentVm> {
        const response = await this.getTreatmentRaw(requestParameters);
        return await response.value();
    }

}
