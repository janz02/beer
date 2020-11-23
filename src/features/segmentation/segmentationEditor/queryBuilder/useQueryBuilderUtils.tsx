import Immutable from 'immutable'
import { SegmentationRuleResult } from '../../../../models/campaign/segmentationRuleResult'
import { Utils, BuilderProps, ImmutableTree, Config } from 'react-awesome-query-builder'
import stringify from 'json-stringify-safe'
import { buildFieldConfig, convertSingleValuesToArray } from './queryBuilderHelper'
import { useDispatch, useSelector } from 'hooks/react-redux-hooks'
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
import { useTranslation } from 'react-i18next'

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
  rules: QueryBuilderRuleModel[]
  config: Config
  tree: ImmutableTree
  treeTotal: SegmentationRuleResult
  treeAsString: string
  ruleResults: SegmentationRuleResult[]
  conditions: QueryBuilderRuleModel[]
  conditionChanges(): ConditionChangeEvents
  setQueryBuilderActionsRef(builder: BuilderProps): void
  getRuleResult(ruleId: string): SegmentationRuleResult | undefined
  update(immutableTree: ImmutableTree, config: Config): void
  handleOnSidebarFieldSelected: (selectedField: string) => void
  refresh: (immutableTree: ImmutableTree) => void
}

export const useQueryBuilderUtils = (): QueryBuilderUtils => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const { fields, queryBuilder, segmentationQuery } = useSelector(
    (state: RootState) => state.segmentationEditor
  )
  const { actions, rules, tree, initialConditions, ruleResults } = queryBuilder
  const [config, setConfig] = useState<Config>(({ ...loadedConfig } as unknown) as Config)
  const [treeInit, setTreeInit] = useState(false)

  const query = (updatedTree: ImmutableTree): void => {
    const query = queryBuilderFormat(updatedTree, config)
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
    const addedRules = conditions().filter(
      rule => !initialConditions.find(condition => condition.id === rule.id)
    )

    const removedRules = initialConditions.filter(
      rule => !conditions().find(condition => condition.id === rule.id)
    )

    const preservedChangedRules = initialConditions.filter(condition =>
      conditions().find(
        rule =>
          rule.id === condition.id &&
          (rule.operator !== condition.operator ||
            rule.value.flat().toString() !== condition.value.flat().toString())
      )
    )
    const preservedRules = initialConditions.filter(condition =>
      conditions().find(
        rule =>
          rule.id === condition.id &&
          rule.operator === condition.operator &&
          rule.value.flat().toString() === condition.value.flat().toString()
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
    return tree?.get('id').toString()
  }, [tree])

  const getRuleResult = useCallback(
    (ruleId: string): SegmentationRuleResult | undefined => {
      return ruleResults.find(ruleResult => ruleResult.ruleId === ruleId)
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
    if (!actions.addRule && config.fields) {
      dispatch(setActions(builder.actions))
    }
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

    return newRule
  }

  const existsRule = useCallback(
    (ruleId: string): boolean => {
      return rules.findIndex(rule => rule.id === ruleId) !== -1
    },
    [rules]
  )

  const createRules = useCallback(
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
          createRules(childNode)
        } else if (jsRule.type === 'rule' && !!jsRule.properties.field) {
          const createdRule = createRule(jsRule)
          const rulesWithoutUpdated = rules.filter(rule => rule.id !== createdRule.id)
          dispatch(setRules([...rulesWithoutUpdated, createdRule]))
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
    const results = ruleResults.filter(ruleResult => !deletedRules.includes(ruleResult.ruleId))
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

  // Thunk + batch
  const update = useCallback(
    (updatedTree: ImmutableTree, updatedConfig: Config): void => {
      setConfig(updatedConfig)
      dispatch(setTree(updatedTree))
      dispatch(setRules([]))
      createRules(updatedTree)

      // keep track of initial rules to support added/removed rules calc
      if (initialConditions.length === 0) {
        dispatch(setInitialConditions([...conditions()]))
      }
    },
    [initialConditions, conditions, dispatch, createRules]
  )

  const refresh = async (updatedTree: ImmutableTree): Promise<void> => {
    query(updatedTree)
    dispatch(refreshQueryResults())
    refreshRuleResults()
  }

  useEffect(() => {
    if (!config.fields && fields) {
      const modifiedFields = buildFieldConfig(fields, t)

      const initialConfig = ({
        ...loadedConfig,
        fields: modifiedFields
      } as unknown) as Config
      setConfig(initialConfig)
    }

    if (segmentationQuery?.tree && !treeInit) {
      setTreeInit(true)

      const parsedTree = JSON.parse(segmentationQuery?.tree)

      for (const child in parsedTree.children1) {
        parsedTree.children1[child].id = child
      }

      const initialTree: ImmutableTree = loadTree(parsedTree)
      update(initialTree, config)
    }
  }, [fields, tree, treeInit, segmentationQuery, config, rules, update, dispatch, createRules, t])

  return {
    config,
    rules,
    tree,
    treeTotal: treeTotal(),
    treeAsString: treeAsString(),
    ruleResults,
    conditions: conditions(),
    conditionChanges,
    setQueryBuilderActionsRef,
    getRuleResult,
    update,
    refresh,
    handleOnSidebarFieldSelected: setRule
  }
}
