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

import { exists, mapValues } from '../runtime';
import {
    CustomAttributeData,
    CustomAttributeDataFromJSON,
    CustomAttributeDataFromJSONTyped,
    CustomAttributeDataToJSON,
    MemberInfo,
    MemberInfoFromJSON,
    MemberInfoFromJSONTyped,
    MemberInfoToJSON,
    ParameterAttributes,
    ParameterAttributesFromJSON,
    ParameterAttributesFromJSONTyped,
    ParameterAttributesToJSON,
    Type,
    TypeFromJSON,
    TypeFromJSONTyped,
    TypeToJSON,
} from './';

/**
 * 
 * @export
 * @interface ParameterInfo
 */
export interface ParameterInfo {
    /**
     * 
     * @type {ParameterAttributes}
     * @memberof ParameterInfo
     */
    attributes?: ParameterAttributes;
    /**
     * 
     * @type {MemberInfo}
     * @memberof ParameterInfo
     */
    member?: MemberInfo;
    /**
     * 
     * @type {string}
     * @memberof ParameterInfo
     */
    readonly name?: string | null;
    /**
     * 
     * @type {Type}
     * @memberof ParameterInfo
     */
    parameterType?: Type;
    /**
     * 
     * @type {number}
     * @memberof ParameterInfo
     */
    readonly position?: number;
    /**
     * 
     * @type {boolean}
     * @memberof ParameterInfo
     */
    readonly isIn?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ParameterInfo
     */
    readonly isLcid?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ParameterInfo
     */
    readonly isOptional?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ParameterInfo
     */
    readonly isOut?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ParameterInfo
     */
    readonly isRetval?: boolean;
    /**
     * 
     * @type {object}
     * @memberof ParameterInfo
     */
    readonly defaultValue?: object | null;
    /**
     * 
     * @type {object}
     * @memberof ParameterInfo
     */
    readonly rawDefaultValue?: object | null;
    /**
     * 
     * @type {boolean}
     * @memberof ParameterInfo
     */
    readonly hasDefaultValue?: boolean;
    /**
     * 
     * @type {Array<CustomAttributeData>}
     * @memberof ParameterInfo
     */
    readonly customAttributes?: Array<CustomAttributeData> | null;
    /**
     * 
     * @type {number}
     * @memberof ParameterInfo
     */
    readonly metadataToken?: number;
}

export function ParameterInfoFromJSON(json: any): ParameterInfo {
    return ParameterInfoFromJSONTyped(json, false);
}

export function ParameterInfoFromJSONTyped(json: any, ignoreDiscriminator: boolean): ParameterInfo {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'attributes': !exists(json, 'attributes') ? undefined : ParameterAttributesFromJSON(json['attributes']),
        'member': !exists(json, 'member') ? undefined : MemberInfoFromJSON(json['member']),
        'name': !exists(json, 'name') ? undefined : json['name'],
        'parameterType': !exists(json, 'parameterType') ? undefined : TypeFromJSON(json['parameterType']),
        'position': !exists(json, 'position') ? undefined : json['position'],
        'isIn': !exists(json, 'isIn') ? undefined : json['isIn'],
        'isLcid': !exists(json, 'isLcid') ? undefined : json['isLcid'],
        'isOptional': !exists(json, 'isOptional') ? undefined : json['isOptional'],
        'isOut': !exists(json, 'isOut') ? undefined : json['isOut'],
        'isRetval': !exists(json, 'isRetval') ? undefined : json['isRetval'],
        'defaultValue': !exists(json, 'defaultValue') ? undefined : json['defaultValue'],
        'rawDefaultValue': !exists(json, 'rawDefaultValue') ? undefined : json['rawDefaultValue'],
        'hasDefaultValue': !exists(json, 'hasDefaultValue') ? undefined : json['hasDefaultValue'],
        'customAttributes': !exists(json, 'customAttributes') ? undefined : (json['customAttributes'] === null ? null : (json['customAttributes'] as Array<any>).map(CustomAttributeDataFromJSON)),
        'metadataToken': !exists(json, 'metadataToken') ? undefined : json['metadataToken'],
    };
}

export function ParameterInfoToJSON(value?: ParameterInfo | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'attributes': ParameterAttributesToJSON(value.attributes),
        'member': MemberInfoToJSON(value.member),
        'parameterType': TypeToJSON(value.parameterType),
    };
}


