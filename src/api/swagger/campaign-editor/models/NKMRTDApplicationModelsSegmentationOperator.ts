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

/**
 * 
 * @export
 * @enum {string}
 */
export enum NKMRTDApplicationModelsSegmentationOperator {
    Equal = 'Equal',
    Notequal = 'Notequal',
    Less = 'Less',
    Lessorequal = 'Lessorequal',
    Greater = 'Greater',
    Greaterorequal = 'Greaterorequal',
    Like = 'Like',
    Notlike = 'Notlike',
    Between = 'Between',
    Notbetween = 'Notbetween',
    Rangebetween = 'Rangebetween',
    Rangenotbetween = 'Rangenotbetween',
    Isempty = 'Isempty',
    Isnotempty = 'Isnotempty',
    Selectequals = 'Selectequals',
    Selectnotequals = 'Selectnotequals',
    Selectanyin = 'Selectanyin',
    Selectnotanyin = 'Selectnotanyin',
    Multiselectequals = 'Multiselectequals',
    Multiselectnotequals = 'Multiselectnotequals'
}

export function NKMRTDApplicationModelsSegmentationOperatorFromJSON(json: any): NKMRTDApplicationModelsSegmentationOperator {
    return NKMRTDApplicationModelsSegmentationOperatorFromJSONTyped(json, false);
}

export function NKMRTDApplicationModelsSegmentationOperatorFromJSONTyped(json: any, ignoreDiscriminator: boolean): NKMRTDApplicationModelsSegmentationOperator {
    return json as NKMRTDApplicationModelsSegmentationOperator;
}

export function NKMRTDApplicationModelsSegmentationOperatorToJSON(value?: NKMRTDApplicationModelsSegmentationOperator | null): any {
    return value as any;
}

