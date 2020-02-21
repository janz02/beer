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
    PartnerState,
    PartnerStateFromJSON,
    PartnerStateFromJSONTyped,
    PartnerStateToJSON,
} from './';

/**
 * 
 * @export
 * @interface PartnerDto
 */
export interface PartnerDto {
    /**
     * 
     * @type {string}
     * @memberof PartnerDto
     */
    name?: string | null;
    /**
     * 
     * @type {string}
     * @memberof PartnerDto
     */
    address?: string | null;
    /**
     * 
     * @type {number}
     * @memberof PartnerDto
     */
    registrationNumber?: number;
    /**
     * 
     * @type {number}
     * @memberof PartnerDto
     */
    taxNumber?: number;
    /**
     * 
     * @type {number}
     * @memberof PartnerDto
     */
    bankAccount?: number;
    /**
     * 
     * @type {boolean}
     * @memberof PartnerDto
     */
    majorPartner?: boolean;
    /**
     * 
     * @type {PartnerState}
     * @memberof PartnerDto
     */
    partnerState?: PartnerState;
}

export function PartnerDtoFromJSON(json: any): PartnerDto {
    return PartnerDtoFromJSONTyped(json, false);
}

export function PartnerDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): PartnerDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': !exists(json, 'name') ? undefined : json['name'],
        'address': !exists(json, 'address') ? undefined : json['address'],
        'registrationNumber': !exists(json, 'registrationNumber') ? undefined : json['registrationNumber'],
        'taxNumber': !exists(json, 'taxNumber') ? undefined : json['taxNumber'],
        'bankAccount': !exists(json, 'bankAccount') ? undefined : json['bankAccount'],
        'majorPartner': !exists(json, 'majorPartner') ? undefined : json['majorPartner'],
        'partnerState': !exists(json, 'partnerState') ? undefined : PartnerStateFromJSON(json['partnerState']),
    };
}

export function PartnerDtoToJSON(value?: PartnerDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'address': value.address,
        'registrationNumber': value.registrationNumber,
        'taxNumber': value.taxNumber,
        'bankAccount': value.bankAccount,
        'majorPartner': value.majorPartner,
        'partnerState': PartnerStateToJSON(value.partnerState),
    };
}


