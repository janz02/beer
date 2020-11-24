/* tslint:disable */
/* eslint-disable */
/**
 * Optima Coupon
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
    PartnerRegistrationState,
    PartnerRegistrationStateFromJSON,
    PartnerRegistrationStateFromJSONTyped,
    PartnerRegistrationStateToJSON,
} from './';

/**
 * 
 * @export
 * @interface ChangePartnerRegistrationStateDto
 */
export interface ChangePartnerRegistrationStateDto {
    /**
     * 
     * @type {PartnerRegistrationState}
     * @memberof ChangePartnerRegistrationStateDto
     */
    registrationState?: PartnerRegistrationState;
}

export function ChangePartnerRegistrationStateDtoFromJSON(json: any): ChangePartnerRegistrationStateDto {
    return ChangePartnerRegistrationStateDtoFromJSONTyped(json, false);
}

export function ChangePartnerRegistrationStateDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): ChangePartnerRegistrationStateDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'registrationState': !exists(json, 'registrationState') ? undefined : PartnerRegistrationStateFromJSON(json['registrationState']),
    };
}

export function ChangePartnerRegistrationStateDtoToJSON(value?: ChangePartnerRegistrationStateDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'registrationState': PartnerRegistrationStateToJSON(value.registrationState),
    };
}


