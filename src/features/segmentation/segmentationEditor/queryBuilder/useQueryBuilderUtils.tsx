import Immutable from 'immutable'
import { SegmentationRuleResult } from '../../../../models/campaign/segmentationRuleResult'
import { Utils, BuilderProps, ImmutableTree, Config } from 'react-awesome-query-builder'
import stringify from 'json-stringify-safe'
import { convertSingleValuesToArray, transformFields } from './queryBuilderHelper'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'app/rootReducer'
import loadedConfig from './Config'
import {
  setTree,
  setRules,
  setQuery,
  setActions,
  setInitialConditions,
  setRuleResults,
  refreshQueryResults,
  GROUP
} from '../segmentationEditorSlice'
import { useCallback, useEffect, useState } from 'react'

const { loadTree, getTree, queryBuilderFormat } = Utils
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
  tree: ImmutableTree
  treeTotal: SegmentationRuleResult
  treeAsString: string
  conditionChanges(): ConditionChangeEvents
  setRule(selectedField: string): void
  setQueryBuilderActionsRef(builder: BuilderProps): void
  getRuleResult(ruleId: string): SegmentationRuleResult | undefined
  update(immutableTree: ImmutableTree, config: Config): void
  handleOnSidebarFieldSelected: (selectedField: string) => void
  refresh: () => void
}

export const useQueryBuilderUtils = (): QueryBuilderUtils => {
  const { fields, queryBuilder, segmentationQuery } = useSelector(
    (state: RootState) => state.segmentationEditor
  )
  const { actions, rules, tree, initialConditions, ruleResults } = queryBuilder

  const [config, setConfig] = useState<Config>(({ ...loadedConfig } as unknown) as Config)
  const dispatch = useDispatch()

  const query = (): void => {
    const query = queryBuilderFormat(tree, config)

    if (!('rules' in query)) {
      return undefined
    }
    convertSingleValuesToArray(query)
    dispatch(setQuery(query))
  }

  const treeAsString = (): string => {
    return stringify(getTree(tree), undefined, 2)
  }

  const conditions = useCallback((): QueryBuilderRuleModel[] => {
    return rules.filter(rule => rule.field !== GROUP)
  }, [rules])

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
  const treeId = useCallback((): string => {
    return tree.get('id').toString()
  }, [tree])

  const getRuleResult = useCallback(
    (ruleId: string): SegmentationRuleResult | undefined => {
      return ruleResults.find(f => f.ruleId === ruleId)
    },
    [ruleResults]
  )

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
    const results: SegmentationRuleResult[] = queryResults.map(result => {
      return { ...result } as SegmentationRuleResult
    })
    dispatch(setRuleResults(results))
  }

  const appendNewRule = (): string => {
    const rule = actions.addRule(treePath())
    return rule.id
  }

  const setRule = (selectedField: string): void => {
    const newRuleId = appendNewRule()
    const rulePath = treePath().concat(newRuleId)
    actions.setField(rulePath, selectedField)
  }

  const createRule = (rule: any): QueryBuilderRuleModel => {
    const newRule = {
      id: rule.id,
      field: rule.properties && rule.properties.field ? rule.properties.field : GROUP,
      operator: rule.properties ? rule.properties.operator : '',
      value: rule.properties ? rule.properties.value : ''
    } as QueryBuilderRuleModel

    console.log(rule, newRule)
    return newRule
  }

  const existsRule = useCallback(
    (ruleId: string): boolean => {
      return rules.findIndex(x => x.id === ruleId) !== -1
    },
    [rules]
  )

  const flattenTree = useCallback(
    (treeNode: any): void => {
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
    },
    [rules, dispatch, existsRule]
  )

  const refreshRuleResults = useCallback((): void => {
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
  }, [ruleResults, rules, dispatch, existsRule, getRuleResult, treeId])

  const update = useCallback(
    (updatedTree: ImmutableTree, updatedConfig: Config): void => {
      setConfig(updatedConfig)
      dispatch(setTree(updatedTree))
      dispatch(setRules([]))
      flattenTree(tree)
      // keep track of initial rules to support added/removed rules calc
      if (initialConditions.length === 0) {
        dispatch(setInitialConditions([...conditions()]))
      }
      refreshRuleResults()
    },
    [initialConditions, tree, conditions, dispatch, flattenTree, refreshRuleResults]
  )

  const refresh = async (): Promise<void> => {
    query()
    dispatch(refreshQueryResults(updateResults(ruleResults as SegmentationRuleResponse[])))
  }

  useEffect(() => {
    if (segmentationQuery?.tree && !config.fields) {
      const initialConfig = ({
        ...loadedConfig,
        fields: transformFields(fields)
      } as unknown) as Config

      const initialTree: ImmutableTree = loadTree(segmentationQuery?.tree as any)

      update(initialTree, initialConfig)
    }
  }, [fields, tree, segmentationQuery, config, rules, update, dispatch, flattenTree])

  return {
    config,
    tree,
    treeTotal: treeTotal(),
    treeAsString: treeAsString(),
    conditionChanges,
    setRule,
    setQueryBuilderActionsRef,
    getRuleResult,
    update,
    refresh,
    handleOnSidebarFieldSelected: setRule
  }
}
