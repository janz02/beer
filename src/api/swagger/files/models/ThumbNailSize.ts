/* tslint:disable */
/* eslint-disable */
/**
 * Optima Files
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
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
export enum ThumbNailSize {
    Normal = 'Normal',
    Small = 'Small'
}

export function ThumbNailSizeFromJSON(json: any): ThumbNailSize {
    return ThumbNailSizeFromJSONTyped(json, false);
}

export function ThumbNailSizeFromJSONTyped(json: any, ignoreDiscriminator: boolean): ThumbNailSize {
    return json as ThumbNailSize;
}

export function ThumbNailSizeToJSON(value?: ThumbNailSize | null): any {
    return value as any;
}

