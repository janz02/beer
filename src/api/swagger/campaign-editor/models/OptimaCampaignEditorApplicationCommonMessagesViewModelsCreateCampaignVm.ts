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

import { exists, mapValues } from '../runtime';
import {
    OptimaCampaignEditorApplicationCommonMessagesViewModelsLabelValuePairOfSystemInt32,
    OptimaCampaignEditorApplicationCommonMessagesViewModelsLabelValuePairOfSystemInt32FromJSON,
    OptimaCampaignEditorApplicationCommonMessagesViewModelsLabelValuePairOfSystemInt32FromJSONTyped,
    OptimaCampaignEditorApplicationCommonMessagesViewModelsLabelValuePairOfSystemInt32ToJSON,
} from './';

/**
 * 
 * @export
 * @interface OptimaCampaignEditorApplicationCommonMessagesViewModelsCreateCampaignVm
 */
export interface OptimaCampaignEditorApplicationCommonMessagesViewModelsCreateCampaignVm {
    /**
     * 
     * @type {Array<OptimaCampaignEditorApplicationCommonMessagesViewModelsLabelValuePairOfSystemInt32>}
     * @memberof OptimaCampaignEditorApplicationCommonMessagesViewModelsCreateCampaignVm
     */
    departments?: Array<OptimaCampaignEditorApplicationCommonMessagesViewModelsLabelValuePairOfSystemInt32> | null;
    /**
     * 
     * @type {Array<OptimaCampaignEditorApplicationCommonMessagesViewModelsLabelValuePairOfSystemInt32>}
     * @memberof OptimaCampaignEditorApplicationCommonMessagesViewModelsCreateCampaignVm
     */
    products?: Array<OptimaCampaignEditorApplicationCommonMessagesViewModelsLabelValuePairOfSystemInt32> | null;
    /**
     * 
     * @type {Array<OptimaCampaignEditorApplicationCommonMessagesViewModelsLabelValuePairOfSystemInt32>}
     * @memberof OptimaCampaignEditorApplicationCommonMessagesViewModelsCreateCampaignVm
     */
    responsibles?: Array<OptimaCampaignEditorApplicationCommonMessagesViewModelsLabelValuePairOfSystemInt32> | null;
    /**
     * 
     * @type {Array<OptimaCampaignEditorApplicationCommonMessagesViewModelsLabelValuePairOfSystemInt32>}
     * @memberof OptimaCampaignEditorApplicationCommonMessagesViewModelsCreateCampaignVm
     */
    requesters?: Array<OptimaCampaignEditorApplicationCommonMessagesViewModelsLabelValuePairOfSystemInt32> | null;
    /**
     * 
     * @type {Array<OptimaCampaignEditorApplicationCommonMessagesViewModelsLabelValuePairOfSystemInt32>}
     * @memberof OptimaCampaignEditorApplicationCommonMessagesViewModelsCreateCampaignVm
     */
    serviceTypes?: Array<OptimaCampaignEditorApplicationCommonMessagesViewModelsLabelValuePairOfSystemInt32> | null;
    /**
     * 
     * @type {Array<OptimaCampaignEditorApplicationCommonMessagesViewModelsLabelValuePairOfSystemInt32>}
     * @memberof OptimaCampaignEditorApplicationCommonMessagesViewModelsCreateCampaignVm
     */
    businessTypes?: Array<OptimaCampaignEditorApplicationCommonMessagesViewModelsLabelValuePairOfSystemInt32> | null;
    /**
     * 
     * @type {Array<OptimaCampaignEditorApplicationCommonMessagesViewModelsLabelValuePairOfSystemInt32>}
     * @memberof OptimaCampaignEditorApplicationCommonMessagesViewModelsCreateCampaignVm
     */
    marketTypes?: Array<OptimaCampaignEditorApplicationCommonMessagesViewModelsLabelValuePairOfSystemInt32> | null;
    /**
     * 
     * @type {Array<OptimaCampaignEditorApplicationCommonMessagesViewModelsLabelValuePairOfSystemInt32>}
     * @memberof OptimaCampaignEditorApplicationCommonMessagesViewModelsCreateCampaignVm
     */
    productTypes?: Array<OptimaCampaignEditorApplicationCommonMessagesViewModelsLabelValuePairOfSystemInt32> | null;
}

export function OptimaCampaignEditorApplicationCommonMessagesViewModelsCreateCampaignVmFromJSON(json: any): OptimaCampaignEditorApplicationCommonMessagesViewModelsCreateCampaignVm {
    return OptimaCampaignEditorApplicationCommonMessagesViewModelsCreateCampaignVmFromJSONTyped(json, false);
}

export function OptimaCampaignEditorApplicationCommonMessagesViewModelsCreateCampaignVmFromJSONTyped(json: any, ignoreDiscriminator: boolean): OptimaCampaignEditorApplicationCommonMessagesViewModelsCreateCampaignVm {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'departments': !exists(json, 'departments') ? undefined : (json['departments'] === null ? null : (json['departments'] as Array<any>).map(OptimaCampaignEditorApplicationCommonMessagesViewModelsLabelValuePairOfSystemInt32FromJSON)),
        'products': !exists(json, 'products') ? undefined : (json['products'] === null ? null : (json['products'] as Array<any>).map(OptimaCampaignEditorApplicationCommonMessagesViewModelsLabelValuePairOfSystemInt32FromJSON)),
        'responsibles': !exists(json, 'responsibles') ? undefined : (json['responsibles'] === null ? null : (json['responsibles'] as Array<any>).map(OptimaCampaignEditorApplicationCommonMessagesViewModelsLabelValuePairOfSystemInt32FromJSON)),
        'requesters': !exists(json, 'requesters') ? undefined : (json['requesters'] === null ? null : (json['requesters'] as Array<any>).map(OptimaCampaignEditorApplicationCommonMessagesViewModelsLabelValuePairOfSystemInt32FromJSON)),
        'serviceTypes': !exists(json, 'serviceTypes') ? undefined : (json['serviceTypes'] === null ? null : (json['serviceTypes'] as Array<any>).map(OptimaCampaignEditorApplicationCommonMessagesViewModelsLabelValuePairOfSystemInt32FromJSON)),
        'businessTypes': !exists(json, 'businessTypes') ? undefined : (json['businessTypes'] === null ? null : (json['businessTypes'] as Array<any>).map(OptimaCampaignEditorApplicationCommonMessagesViewModelsLabelValuePairOfSystemInt32FromJSON)),
        'marketTypes': !exists(json, 'marketTypes') ? undefined : (json['marketTypes'] === null ? null : (json['marketTypes'] as Array<any>).map(OptimaCampaignEditorApplicationCommonMessagesViewModelsLabelValuePairOfSystemInt32FromJSON)),
        'productTypes': !exists(json, 'productTypes') ? undefined : (json['productTypes'] === null ? null : (json['productTypes'] as Array<any>).map(OptimaCampaignEditorApplicationCommonMessagesViewModelsLabelValuePairOfSystemInt32FromJSON)),
    };
}

export function OptimaCampaignEditorApplicationCommonMessagesViewModelsCreateCampaignVmToJSON(value?: OptimaCampaignEditorApplicationCommonMessagesViewModelsCreateCampaignVm | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'departments': value.departments === undefined ? undefined : (value.departments === null ? null : (value.departments as Array<any>).map(OptimaCampaignEditorApplicationCommonMessagesViewModelsLabelValuePairOfSystemInt32ToJSON)),
        'products': value.products === undefined ? undefined : (value.products === null ? null : (value.products as Array<any>).map(OptimaCampaignEditorApplicationCommonMessagesViewModelsLabelValuePairOfSystemInt32ToJSON)),
        'responsibles': value.responsibles === undefined ? undefined : (value.responsibles === null ? null : (value.responsibles as Array<any>).map(OptimaCampaignEditorApplicationCommonMessagesViewModelsLabelValuePairOfSystemInt32ToJSON)),
        'requesters': value.requesters === undefined ? undefined : (value.requesters === null ? null : (value.requesters as Array<any>).map(OptimaCampaignEditorApplicationCommonMessagesViewModelsLabelValuePairOfSystemInt32ToJSON)),
        'serviceTypes': value.serviceTypes === undefined ? undefined : (value.serviceTypes === null ? null : (value.serviceTypes as Array<any>).map(OptimaCampaignEditorApplicationCommonMessagesViewModelsLabelValuePairOfSystemInt32ToJSON)),
        'businessTypes': value.businessTypes === undefined ? undefined : (value.businessTypes === null ? null : (value.businessTypes as Array<any>).map(OptimaCampaignEditorApplicationCommonMessagesViewModelsLabelValuePairOfSystemInt32ToJSON)),
        'marketTypes': value.marketTypes === undefined ? undefined : (value.marketTypes === null ? null : (value.marketTypes as Array<any>).map(OptimaCampaignEditorApplicationCommonMessagesViewModelsLabelValuePairOfSystemInt32ToJSON)),
        'productTypes': value.productTypes === undefined ? undefined : (value.productTypes === null ? null : (value.productTypes as Array<any>).map(OptimaCampaignEditorApplicationCommonMessagesViewModelsLabelValuePairOfSystemInt32ToJSON)),
    };
}

