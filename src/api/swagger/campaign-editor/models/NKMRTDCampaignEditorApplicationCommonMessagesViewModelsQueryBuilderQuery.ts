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

import { exists, mapValues } from '../runtime';
import {
    NKMRTDCampaignEditorApplicationCommonMessagesEnumsCondition,
    NKMRTDCampaignEditorApplicationCommonMessagesEnumsConditionFromJSON,
    NKMRTDCampaignEditorApplicationCommonMessagesEnumsConditionFromJSONTyped,
    NKMRTDCampaignEditorApplicationCommonMessagesEnumsConditionToJSON,
    NKMRTDCampaignEditorApplicationCommonMessagesEnumsControlType,
    NKMRTDCampaignEditorApplicationCommonMessagesEnumsControlTypeFromJSON,
    NKMRTDCampaignEditorApplicationCommonMessagesEnumsControlTypeFromJSONTyped,
    NKMRTDCampaignEditorApplicationCommonMessagesEnumsControlTypeToJSON,
    NKMRTDCampaignEditorApplicationCommonMessagesEnumsOperator,
    NKMRTDCampaignEditorApplicationCommonMessagesEnumsOperatorFromJSON,
    NKMRTDCampaignEditorApplicationCommonMessagesEnumsOperatorFromJSONTyped,
    NKMRTDCampaignEditorApplicationCommonMessagesEnumsOperatorToJSON,
    NKMRTDCampaignEditorApplicationCommonMessagesViewModelsQueryValues,
    NKMRTDCampaignEditorApplicationCommonMessagesViewModelsQueryValuesFromJSON,
    NKMRTDCampaignEditorApplicationCommonMessagesViewModelsQueryValuesFromJSONTyped,
    NKMRTDCampaignEditorApplicationCommonMessagesViewModelsQueryValuesToJSON,
} from './';

/**
 * 
 * @export
 * @interface NKMRTDCampaignEditorApplicationCommonMessagesViewModelsQueryBuilderQuery
 */
export interface NKMRTDCampaignEditorApplicationCommonMessagesViewModelsQueryBuilderQuery {
    /**
     * 
     * @type {NKMRTDCampaignEditorApplicationCommonMessagesEnumsCondition}
     * @memberof NKMRTDCampaignEditorApplicationCommonMessagesViewModelsQueryBuilderQuery
     */
    condition?: NKMRTDCampaignEditorApplicationCommonMessagesEnumsCondition | null;
    /**
     * 
     * @type {boolean}
     * @memberof NKMRTDCampaignEditorApplicationCommonMessagesViewModelsQueryBuilderQuery
     */
    not?: boolean;
    /**
     * 
     * @type {string}
     * @memberof NKMRTDCampaignEditorApplicationCommonMessagesViewModelsQueryBuilderQuery
     */
    id?: string | null;
    /**
     * 
     * @type {string}
     * @memberof NKMRTDCampaignEditorApplicationCommonMessagesViewModelsQueryBuilderQuery
     */
    fieldName?: string | null;
    /**
     * 
     * @type {NKMRTDCampaignEditorApplicationCommonMessagesEnumsOperator}
     * @memberof NKMRTDCampaignEditorApplicationCommonMessagesViewModelsQueryBuilderQuery
     */
    operator?: NKMRTDCampaignEditorApplicationCommonMessagesEnumsOperator | null;
    /**
     * 
     * @type {NKMRTDCampaignEditorApplicationCommonMessagesEnumsControlType}
     * @memberof NKMRTDCampaignEditorApplicationCommonMessagesViewModelsQueryBuilderQuery
     */
    type?: NKMRTDCampaignEditorApplicationCommonMessagesEnumsControlType | null;
    /**
     * 
     * @type {Array<NKMRTDCampaignEditorApplicationCommonMessagesViewModelsQueryBuilderQuery>}
     * @memberof NKMRTDCampaignEditorApplicationCommonMessagesViewModelsQueryBuilderQuery
     */
    rules?: Array<NKMRTDCampaignEditorApplicationCommonMessagesViewModelsQueryBuilderQuery> | null;
    /**
     * 
     * @type {Array<NKMRTDCampaignEditorApplicationCommonMessagesViewModelsQueryValues>}
     * @memberof NKMRTDCampaignEditorApplicationCommonMessagesViewModelsQueryBuilderQuery
     */
    values?: Array<NKMRTDCampaignEditorApplicationCommonMessagesViewModelsQueryValues> | null;
}

export function NKMRTDCampaignEditorApplicationCommonMessagesViewModelsQueryBuilderQueryFromJSON(json: any): NKMRTDCampaignEditorApplicationCommonMessagesViewModelsQueryBuilderQuery {
    return NKMRTDCampaignEditorApplicationCommonMessagesViewModelsQueryBuilderQueryFromJSONTyped(json, false);
}

export function NKMRTDCampaignEditorApplicationCommonMessagesViewModelsQueryBuilderQueryFromJSONTyped(json: any, ignoreDiscriminator: boolean): NKMRTDCampaignEditorApplicationCommonMessagesViewModelsQueryBuilderQuery {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'condition': !exists(json, 'condition') ? undefined : NKMRTDCampaignEditorApplicationCommonMessagesEnumsConditionFromJSON(json['condition']),
        'not': !exists(json, 'not') ? undefined : json['not'],
        'id': !exists(json, 'id') ? undefined : json['id'],
        'fieldName': !exists(json, 'fieldName') ? undefined : json['fieldName'],
        'operator': !exists(json, 'operator') ? undefined : NKMRTDCampaignEditorApplicationCommonMessagesEnumsOperatorFromJSON(json['operator']),
        'type': !exists(json, 'type') ? undefined : NKMRTDCampaignEditorApplicationCommonMessagesEnumsControlTypeFromJSON(json['type']),
        'rules': !exists(json, 'rules') ? undefined : (json['rules'] === null ? null : (json['rules'] as Array<any>).map(NKMRTDCampaignEditorApplicationCommonMessagesViewModelsQueryBuilderQueryFromJSON)),
        'values': !exists(json, 'values') ? undefined : (json['values'] === null ? null : (json['values'] as Array<any>).map(NKMRTDCampaignEditorApplicationCommonMessagesViewModelsQueryValuesFromJSON)),
    };
}

export function NKMRTDCampaignEditorApplicationCommonMessagesViewModelsQueryBuilderQueryToJSON(value?: NKMRTDCampaignEditorApplicationCommonMessagesViewModelsQueryBuilderQuery | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'condition': NKMRTDCampaignEditorApplicationCommonMessagesEnumsConditionToJSON(value.condition),
        'not': value.not,
        'id': value.id,
        'fieldName': value.fieldName,
        'operator': NKMRTDCampaignEditorApplicationCommonMessagesEnumsOperatorToJSON(value.operator),
        'type': NKMRTDCampaignEditorApplicationCommonMessagesEnumsControlTypeToJSON(value.type),
        'rules': value.rules === undefined ? undefined : (value.rules === null ? null : (value.rules as Array<any>).map(NKMRTDCampaignEditorApplicationCommonMessagesViewModelsQueryBuilderQueryToJSON)),
        'values': value.values === undefined ? undefined : (value.values === null ? null : (value.values as Array<any>).map(NKMRTDCampaignEditorApplicationCommonMessagesViewModelsQueryValuesToJSON)),
    };
}


