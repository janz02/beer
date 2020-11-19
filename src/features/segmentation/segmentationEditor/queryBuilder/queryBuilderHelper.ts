import { OptimaCampaignEditorApplicationModelsSegmentationQueryBuilderField } from 'api/swagger/campaign-editor'
import { TFunction } from 'i18next'
import { Fields } from 'react-awesome-query-builder'

const createField = (
  field: OptimaCampaignEditorApplicationModelsSegmentationQueryBuilderField,
  t: TFunction,
  hasSubfield: boolean
): any => {
  let listValues
  if (!!field.listValues && Object.keys(field.listValues).length !== 0) {
    listValues = field.listValues
  }
  return {
    label: t(field.label + (hasSubfield ? '.rootProperty' : '')),
    label2: t(field.selectedLabel + (hasSubfield ? '.rootProperty' : '')),
    type: field.type,
    listValues: listValues,
    operators: field.operators ? field.operators.map((s: string) => s.toLowerCase()) : [],
    subfields: {}
  }
}

export const buildFieldConfig = (
  queryBuilderFields: OptimaCampaignEditorApplicationModelsSegmentationQueryBuilderField[],
  t: TFunction
): Fields => {
  const fields: Fields = {}

  for (const field of queryBuilderFields) {
    const key = field.fieldName
    if (key && field.subFields) {
      if (field.subFields.length === 0) {
        // field level
        const createdField = createField(field, t, false)
        fields[key] = createdField
      } else {
        // subfields
        const createdField = createField(field, t, true)
        createdField.subfields = buildFieldConfig(field.subFields, t)
        fields[key] = createdField
      }
    }
  }
  return fields
}

// Converts the rule values -> value field to an array
// to be same as select, multiselect
// ex. a single/simple input representation: values array with one item containing the input -> will become values array with one item, item is an array containing the single input
// ex. a between representation: values array with two item containing the inputs -> will become values array with two item, each item is an array containing the input
// ex. a select/multiselect representation: values array with one item, item is an array containing the input(s) -> will become values array with one item, item is an array containing the input(s)
export const convertSingleValuesToArray = (obj: any): void => {
  if (obj) {
    if ('values' in obj) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < obj.values.length; i++) {
        if ('value' in obj.values[i]) {
          if (Object.prototype.toString.call(obj.values[i].value) !== '[object Array]') {
            obj.values[i].value = [obj.values[i].value]
          }
        }
      }
    }
    if ('rules' in obj && obj.rules !== null) {
      for (const rule of obj.rules) {
        convertSingleValuesToArray(rule)
      }
    }
  }
}
