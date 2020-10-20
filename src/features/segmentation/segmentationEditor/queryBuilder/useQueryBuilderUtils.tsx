import Immutable from 'immutable'
import { SegmentationRuleResult } from '../../../../models/campaign/segmentationRuleResult'
import { Utils, BuilderProps, ImmutableTree, Config, Fields } from 'react-awesome-query-builder'
import stringify from 'json-stringify-safe'
import { convertSingleValuesToArray } from './queryBuilderUtils'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'app/rootReducer'
import loadedConfig from './Config'
import {
  setTree,
  setRules,
  setActions,
  setInitialConditions,
  setRuleResults,
  GROUP
} from '../segmentationEditorSlice'
import { QueryBuilderField } from 'api/swagger/campaign-editor'

const { getTree, queryBuilderFormat } = Utils

export interface ConditionChangeEvents {
  preserved: QueryBuilderRuleModel[]
  preservedChanged: QueryBuilderRuleModel[]
  added: QueryBuilderRuleModel[]
  removed: QueryBuilderRuleModel[]
}

export interface QueryBuilderRuleModel {
  id: string
  field: string
  operator: string
  value: string[]
}

export interface SegmentationRuleResponse {
  ruleId: string
  segmentSize: number
  filteredSize: number
}

export interface QueryBuilderUtils {
  config: Config
  query: object | undefined
  tree: ImmutableTree
  treeTotal: SegmentationRuleResult
  treeAsString: string
  conditionChanges(): ConditionChangeEvents
  setRule(selectedField: string): void
  setQueryBuilderActionsRef(builder: BuilderProps): void
  getRuleResult(ruleId: string): SegmentationRuleResult | undefined
  update(immutableTree: ImmutableTree, config: Config): void
  updateResults(results: SegmentationRuleResponse[]): void
  handleOnSidebarFieldSelected: (selectedField: string) => void
}

const transformFields = (fields?: QueryBuilderField[] | null): Fields | undefined | null =>
  fields &&
  ((fields.map(({ subFields, ...rest }) => ({
    subfields: transformFields(subFields),
    ...rest
  })) as unknown) as Fields)

export const useQueryBuilderUtils = (): QueryBuilderUtils => {
  const { fields, queryBuilder } = useSelector((state: RootState) => state.segmentationEditor)
  const { actions, rules, tree, initialConditions, ruleResults } = queryBuilder

  let config = ({
    ...loadedConfig,
    fields: transformFields(fields || [])
  } as unknown) as Config

  const dispatch = useDispatch()

  const query = (): object | undefined => {
    const query = queryBuilderFormat(tree, config)
    if (!('rules' in query)) {
      return undefined
    }

    convertSingleValuesToArray(query)
    return query
  }

  const treeAsString = (): string => {
    return stringify(getTree(tree), undefined, 2)
  }

  const conditions = (): QueryBuilderRuleModel[] => {
    return rules.filter(rule => rule.field !== GROUP)
  }

  const conditionChanges = (): ConditionChangeEvents => {
    const addedRules = conditions().filter(rule => !initialConditions.find(r => r.id === rule.id))

    const removedRules = initialConditions.filter(r => !conditions().find(rule => rule.id === r.id))

    const preservedChangedRules = initialConditions.filter(r =>
      conditions().find(
        rule =>
          rule.id === r.id &&
          (rule.operator !== r.operator ||
            rule.value.flat().toString() !== r.value.flat().toString())
      )
    )
    const preservedRules = initialConditions.filter(r =>
      conditions().find(
        rule =>
          rule.id === r.id &&
          rule.operator === r.operator &&
          rule.value.flat().toString() === r.value.flat().toString()
      )
    )
    return {
      preserved: preservedRules,
      preservedChanged: preservedChangedRules,
      added: addedRules,
      removed: removedRules
    }
  }
  const treeId = (): string => {
    return tree.get('id').toString()
  }
  const getRuleResult = (ruleId: string): SegmentationRuleResult | undefined => {
    return ruleResults.find(f => f.ruleId === ruleId)
  }

  const treeTotal = (): SegmentationRuleResult => {
    return getRuleResult(treeId()) || ({ ruleId: treeId() } as SegmentationRuleResult)
  }

  const treePath = (): Immutable.List<string> => {
    return Immutable.List.of(treeId())
  }

  const setQueryBuilderActionsRef = (builder: BuilderProps): void => {
    if (!actions.addRule) {
      dispatch(setActions(builder.actions))
    }
  }

  const updateResults = (queryResults: SegmentationRuleResponse[] = []): void => {
    queryResults.forEach(result => {
      const ruleResult = getRuleResult(result.ruleId)
      if (ruleResult) {
        ruleResult.segmentSize = result.segmentSize
        ruleResult.filteredSize = result.filteredSize
      }
    })
  }
  const appendNewRule = (): string => {
    const rule = actions.addRule(treePath)
    return rule.id
  }

  const setRule = (selectedField: string): void => {
    const newRuleId = appendNewRule()
    const rulePath = treePath().concat(newRuleId)
    actions.setField(rulePath, selectedField)
  }

  const existsRule = (ruleId: string): boolean => {
    return rules.findIndex(x => x.id === ruleId) !== -1
  }

  const createRule = (rule: any): QueryBuilderRuleModel => {
    return (rule.id,
    rule.properties && rule.properties.field ? rule.properties.field : GROUP,
    rule.properties ? rule.properties.operator : '',
    rule.properties ? rule.properties.value : '') as QueryBuilderRuleModel
  }

  const flattenTree = (treeNode: any): void => {
    if (treeNode.get('id')) {
      const node = treeNode.toJS()
      if (!existsRule(node.id)) {
        const rule = createRule(node)
        dispatch(setRules([...rules, rule]))
      }
    }

    if (!treeNode.has('children1')) {
      return
    }
    const children = treeNode.get('children1').toArray()
    for (const childNode of children) {
      const jsRule = childNode.toJS()
      if (jsRule.type === GROUP) {
        flattenTree(childNode)
      } else if (jsRule.type === 'rule' && !!jsRule.properties.field && !existsRule(jsRule.id)) {
        const rule = createRule(jsRule)
        dispatch(setRules([...rules, rule]))
      }
    }
  }

  const refreshRuleResults = (): void => {
    // deleted rules
    const deletedRules: string[] = []
    ruleResults.forEach(result => {
      if (!existsRule(result.ruleId)) {
        deletedRules.push(result.ruleId)
      }
    })
    const results = ruleResults.filter(x => !deletedRules.includes(x.ruleId))
    dispatch(setRuleResults(results))

    // new rules
    rules.forEach(rule => {
      const existsRuleResult = !!getRuleResult(rule.id)
      if (!existsRuleResult) {
        const updatedRuleResults = [...ruleResults, { ruleId: rule.id } as SegmentationRuleResult]
        dispatch(setRuleResults(updatedRuleResults))
      }
    })
    // if all rules are deleted, reset the total result too
    if (rules.length === 1 && rules[0].id === treeId()) {
      const treePathResults = getRuleResult(treeId())
      if (treePathResults) {
        treePathResults.filteredSize = undefined
        treePathResults.segmentSize = undefined
      }
    }
  }
  const update = (updatedTree: ImmutableTree, updatedConfig: Config): void => {
    // TODO: useState is needed for mutable variables
    config = updatedConfig
    dispatch(setTree(updatedTree))
    dispatch(setRules([]))
    flattenTree(tree)
    // keep track of initial rules to support added/removed rules calc
    if (initialConditions.length === 0) {
      dispatch(setInitialConditions([...conditions()]))
    }
    refreshRuleResults()
  }

  return {
    config,
    query: query(),
    tree,
    treeTotal: treeTotal(),
    treeAsString: treeAsString(),
    conditionChanges,
    setRule,
    setQueryBuilderActionsRef,
    getRuleResult,
    update,
    updateResults,
    handleOnSidebarFieldSelected: setRule
  }
}
