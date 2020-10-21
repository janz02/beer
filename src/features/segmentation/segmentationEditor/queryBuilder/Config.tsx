/* eslint-disable @typescript-eslint/camelcase */
/*
A conjunctions tartalmazza a builderen ertelmezheto logikai operatorokat.
Az operators reszben az elerheto operatorokat tudjuk megadni/modositani.
A types reszben kell megadni, hogy a query builder milyen tipusu adatokon tud dolgozni,
milyen operatorok, widgetek tartoznak/ertelmezhetoek az adott type-on, es melyek a defaultok.
Pl. a number type-t abrazolhatunk egy egyszeru number inputkent, vagy akar egy sliderel is.
A widgetek definialjak, hogy a typeokhoz rendelheto widgetek hogyan nezzenek ki.
Az elore megadott config tartalmaz minden egyszeru tipust, erdemes ezzel indulni.
A settings-ben vannak a builderre vonatkozo altalanos beallitasok. Pl. beallithatjuk, hogy a mezo vagy operator megjelenitesehez milyen widgetet szeretnenk hasznalni.

nyelvesites: https://ant.design/docs/react/i18n, https://unpkg.com/browse/antd@3.25.3/es/locale/
ill. a configon belul a t hasznalataval.

A fields reszben kell megadni az egyes mezok configjat(ezek mindig felulirjak a types reszben megadott default field configokat)
Itt tudunk pl. validacios szabalyokat is megadni a sajat mezoinknek.
A mezo configokat ossze mergelhetjuk/kombinalhatjuk, pl.
	name: { ...defaultTextFieldCfg, ...defaultTextFieldValidationCfg, ...nameFieldCfg }
Az egyes mezok configjat olvashatjuk a szerverrol is, pl.
	const fields = {
	  name: { ...defaultTextFieldCfg, ...nameFieldFromServerCfg },
	};
A fields object-be a label mezo jeloli a field nevet ami a select boxban bongeszeskor a fa strukturaban fog latszani,
a label2 pedig, hogy a kivalasztas utan milyen ertek jelenik meg a selectboxban.

TODO:
	- a query builder config.js becsomagolasa egy componensbe, a szerver es default configok merge-je is tortenhet ebben a componensbe
*/
import React from 'react'
import { BasicConfig, FieldProps } from 'react-awesome-query-builder'
import AntdWidgets from 'react-awesome-query-builder/lib/components/widgets/antd'
import merge from 'lodash/merge'
// import en_US from "antd/lib/locale-provider/en_US";
import hu_HU from 'antd/lib/locale-provider/hu_HU'
import i18n from 'i18next'

const conjunctions = {
  AND: {
    ...BasicConfig.conjunctions.AND,
    label: i18n.t('query-builder.and')
  },
  OR: {
    ...BasicConfig.conjunctions.OR,
    label: i18n.t('query-builder.or')
  }
}

const operators = {
  ...BasicConfig.operators,
  like: {
    ...BasicConfig.operators.like,
    label: i18n.t('query-builder.operator.like.label')
  },
  not_like: {
    ...BasicConfig.operators.not_like,
    label: i18n.t('query-builder.operator.not-like.label')
  },
  between: {
    ...BasicConfig.operators.between,
    label: i18n.t('query-builder.operator.between.label'),
    valueLabels: [i18n.t('query-builder.from'), i18n.t('query-builder.to')],
    textSeparators: []
  },
  not_between: {
    ...BasicConfig.operators.not_between,
    label: i18n.t('query-builder.operator.not-between.label'),
    valueLabels: [i18n.t('query-builder.from'), i18n.t('query-builder.to')],
    textSeparators: []
  },
  range_between: {
    ...BasicConfig.operators.between,
    label: i18n.t('query-builder.operator.range-between.label'),
    valueLabels: [i18n.t('query-builder.from'), i18n.t('query-builder.to')],
    textSeparators: []
  },
  range_not_between: {
    ...BasicConfig.operators.not_between,
    label: i18n.t('query-builder.operator.range-not-between.label'),
    valueLabels: [i18n.t('query-builder.from'), i18n.t('query-builder.to')],
    textSeparators: []
  },
  is_empty: {
    ...BasicConfig.operators.is_empty,
    label: i18n.t('query-builder.operator.is-empty.label')
  },
  is_not_empty: {
    ...BasicConfig.operators.is_not_empty,
    label: i18n.t('query-builder.operator.is-not-empty.label')
  },
  select_any_in: {
    ...BasicConfig.operators.select_any_in,
    label: i18n.t('query-builder.operator.select-any-in.label')
  },
  select_not_any_in: {
    ...BasicConfig.operators.select_not_any_in,
    label: i18n.t('query-builder.operator.select-not-any-in.label')
  },
  proximity: {}
}

const widgets = {
  ...BasicConfig.widgets,
  text: {
    ...BasicConfig.widgets.text,
    validateValue: (val: string | number | undefined) => {
      return val !== ''
    }
  },
  number: {
    ...BasicConfig.widgets.number,
    validateValue: (val: number) => {
      return !isNaN(val)
    }
  }
}

// add overrides for localization
// https://github.com/ukrbublik/react-awesome-query-builder/blob/master/modules/config/basic.js
const types = {
  ...BasicConfig.types,
  // override
  text: merge(BasicConfig.types.text, {
    widgets: {
      text: {
        widgetProps: {
          valuePlaceholder: i18n.t('query-builder.text.placeholder')
        }
      }
    }
  }),
  date: merge(BasicConfig.types.date, {
    widgets: {
      date: {
        widgetProps: {
          valuePlaceholder: i18n.t('query-builder.date.placeholder'),
          valueLabels: [i18n.t('query-builder.from'), i18n.t('query-builder.to')]
        }
      }
    }
  }),
  datetime: merge(BasicConfig.types.datetime, {
    widgets: {
      datetime: {
        widgetProps: {
          valuePlaceholder: i18n.t('query-builder.datetime.placeholder'),
          valueLabels: [i18n.t('query-builder.from'), i18n.t('query-builder.to')]
        }
      }
    }
  }),
  time: merge(BasicConfig.types.time, {
    widgets: {
      time: {
        widgetProps: {
          valuePlaceholder: i18n.t('query-builder.time.placeholder'),
          valueLabels: [i18n.t('query-builder.from'), i18n.t('query-builder.to')]
        }
      }
    }
  }),
  select: merge(BasicConfig.types.select, {
    widgets: {
      select: {
        widgetProps: {
          valuePlaceholder: i18n.t('query-builder.select.placeholder')
        }
      },
      multiselect: {
        widgetProps: {
          valuePlaceholder: i18n.t('query-builder.multiselect.placeholder')
        }
      }
    }
  }),
  multiselect: merge(BasicConfig.types.multiselect, {
    widgets: {
      multiselect: {
        widgetProps: {
          valuePlaceholder: i18n.t('query-builder.multiselect.placeholder')
        }
      }
    }
  }),
  number: merge(BasicConfig.types.number, {
    widgets: {
      number: {
        widgetProps: {
          valuePlaceholder: i18n.t('query-builder.number.placeholder'),
          valueLabels: [i18n.t('query-builder.from'), i18n.t('query-builder.to')]
        }
      },
      slider: {
        widgetProps: {
          valuePlaceholder: i18n.t('query-builder.slider.placeholder')
        }
      },
      rangeslider: {
        widgetProps: {
          valuePlaceholder: i18n.t('query-builder.range-slider.placeholder'),
          valueLabels: [i18n.t('query-builder.from'), i18n.t('query-builder.to')]
        }
      }
    }
  })
}

const { FieldTreeSelect } = AntdWidgets
const localeSettings = {
  locale: {
    short: 'hu',
    full: 'hu_HU',
    antd: hu_HU
  },
  maxLabelsLength: 100,
  renderConjsAsRadios: false,
  renderFieldAndOpAsDropdown: true,
  customFieldSelectProps: {
    showSearch: false
  },
  clearValueOnChangeField: false, // false - if prev & next fields have same type (widget), keep
  clearValueOnChangeOp: false,
  setDefaultFieldAndOp: false,
  showLabels: false,
  valueLabel: i18n.t('query-builder.rule.value.label'),
  valuePlaceholder: i18n.t('query-builder.rule.value.placeholder'),
  fieldLabel: i18n.t('query-builder.rule.field.label'),
  fieldPlaceholder: i18n.t('query-builder.rule.field.placeholder'),
  operatorPlaceholder: i18n.t('query-builder.rule.operator.placeholder'),
  addGroupLabel: i18n.t('query-builder.add-group.label'),
  addRuleLabel: i18n.t('query-builder.add-rule.label'),
  readonlyMode: false,
  notLabel: i18n.t('query-builder.not'),
  delGroupLabel: null,
  canLeaveEmptyGroup: true, // after deletion
  canReorder: true,
  maxNesting: 10,
  renderField: (props: FieldProps) => <FieldTreeSelect {...props} />,
  renderOperator: (props: FieldProps) => <FieldTreeSelect {...props} />
}

const settings = {
  ...BasicConfig.settings,
  ...localeSettings,

  valueSourcesInfo: {}
}

export default {
  conjunctions,
  operators,
  widgets,
  types,
  settings
}
