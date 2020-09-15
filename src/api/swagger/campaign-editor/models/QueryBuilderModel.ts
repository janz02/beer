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
    Condition,
    ConditionFromJSON,
    ConditionFromJSONTyped,
    ConditionToJSON,
    ControlType,
    ControlTypeFromJSON,
    ControlTypeFromJSONTyped,
    ControlTypeToJSON,
    Operator,
    OperatorFromJSON,
    OperatorFromJSONTyped,
    OperatorToJSON,
    QueryValues,
    QueryValuesFromJSON,
    QueryValuesFromJSONTyped,
    QueryValuesToJSON,
} from './';

/**
 * 
 * @export
 * @interface QueryBuilderModel
 */
export interface QueryBuilderModel {
    /**
     * 
     * @type {Condition}
     * @memberof QueryBuilderModel
     */
    condition?: Condition | null;
    /**
     * 
     * @type {boolean}
     * @memberof QueryBuilderModel
     */
    not?: boolean;
    /**
     * 
     * @type {string}
     * @memberof QueryBuilderModel
     */
    id?: string | null;
    /**
     * 
     * @type {string}
     * @memberof QueryBuilderModel
     */
    fieldName?: string | null;
    /**
     * 
     * @type {Operator}
     * @memberof QueryBuilderModel
     */
    operator?: Operator | null;
    /**
     * 
     * @type {ControlType}
     * @memberof QueryBuilderModel
     */
    type?: ControlType | null;
    /**
     * 
     * @type {Array<QueryBuilderModel>}
     * @memberof QueryBuilderModel
     */
    rules?: Array<QueryBuilderModel> | null;
    /**
     * 
     * @type {Array<QueryValues>}
     * @memberof QueryBuilderModel
     */
    values?: Array<QueryValues> | null;
}

export function QueryBuilderModelFromJSON(json: any): QueryBuilderModel {
    return QueryBuilderModelFromJSONTyped(json, false);
}

export function QueryBuilderModelFromJSONTyped(json: any, ignoreDiscriminator: boolean): QueryBuilderModel {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'condition': !exists(json, 'condition') ? undefined : ConditionFromJSON(json['condition']),
        'not': !exists(json, 'not') ? undefined : json['not'],
        'id': !exists(json, 'id') ? undefined : json['id'],
        'fieldName': !exists(json, 'fieldName') ? undefined : json['fieldName'],
        'operator': !exists(json, 'operator') ? undefined : OperatorFromJSON(json['operator']),
        'type': !exists(json, 'type') ? undefined : ControlTypeFromJSON(json['type']),
        'rules': !exists(json, 'rules') ? undefined : (json['rules'] === null ? null : (json['rules'] as Array<any>).map(QueryBuilderModelFromJSON)),
        'values': !exists(json, 'values') ? undefined : (json['values'] === null ? null : (json['values'] as Array<any>).map(QueryValuesFromJSON)),
    };
}

export function QueryBuilderModelToJSON(value?: QueryBuilderModel | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'condition': ConditionToJSON(value.condition),
        'not': value.not,
        'id': value.id,
        'fieldName': value.fieldName,
        'operator': OperatorToJSON(value.operator),
        'type': ControlTypeToJSON(value.type),
        'rules': value.rules === undefined ? undefined : (value.rules === null ? null : (value.rules as Array<any>).map(QueryBuilderModelToJSON)),
        'values': value.values === undefined ? undefined : (value.values === null ? null : (value.values as Array<any>).map(QueryValuesToJSON)),
    };
}


