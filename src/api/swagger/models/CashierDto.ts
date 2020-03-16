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
/**
 * 
 * @export
 * @interface CashierDto
 */
export interface CashierDto {
    /**
     * 
     * @type {string}
     * @memberof CashierDto
     */
    cashierId?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CashierDto
     */
    digitalStampId?: string | null;
}

export function CashierDtoFromJSON(json: any): CashierDto {
    return CashierDtoFromJSONTyped(json, false);
}

export function CashierDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): CashierDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'cashierId': !exists(json, 'cashierId') ? undefined : json['cashierId'],
        'digitalStampId': !exists(json, 'digitalStampId') ? undefined : json['digitalStampId'],
    };
}

export function CashierDtoToJSON(value?: CashierDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'cashierId': value.cashierId,
        'digitalStampId': value.digitalStampId,
    };
}

