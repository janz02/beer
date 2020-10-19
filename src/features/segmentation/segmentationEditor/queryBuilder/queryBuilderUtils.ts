const createField = (field: any, t: any, hasSubfield: boolean): any => {
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

export const buildFieldConfig = (queryBuilderFields: any, fieldConfig: any, t: any): void => {
  for (const field of queryBuilderFields) {
    const key = field.fieldName
    if (field.subFields.length === 0) {
      // field level
      fieldConfig[key] = createField(field, t, false)
    } else {
      // subfields
      fieldConfig[key] = createField(field, t, true)
      buildFieldConfig(field.subFields, fieldConfig[key].subfields, t)
    }
  }
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

export default buildFieldConfig
