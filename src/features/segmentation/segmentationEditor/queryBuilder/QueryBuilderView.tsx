import React from 'react'
import { Query, Builder, BuilderProps, ImmutableTree, Config } from 'react-awesome-query-builder'
import { QueryBuilderUtils, SegmentationRuleResponse } from './useQueryBuilderUtils'
import { RuleResultContainer } from './RuleResultContainer'
// import 'antd/dist/antd.css'
import 'react-awesome-query-builder/css/styles.scss'
import 'react-awesome-query-builder/css/compact_styles.scss' // optional, for more compact styles
import { api } from 'api'
import { AppThunk } from 'app/store'

interface QueryBuilderViewProps {
  queryBuilder: QueryBuilderUtils
}

export const QueryBuilderView: React.FC<QueryBuilderViewProps> = props => {
  let refreshTimeout: any

  const renderBuilder = (builder: BuilderProps): JSX.Element => {
    props.queryBuilder.setQueryBuilderActionsRef(builder)

    return (
      <div className="query-builder">
        <Builder {...builder} />
      </div>
    )
  }

  const renderQueryResult = ({ id }: any): JSX.Element => {
    const rule = props.queryBuilder.getRuleResult(id)
    return rule ? <RuleResultContainer ruleResult={rule} emptyValue="?" /> : <></>
  }

  const refresh = (): AppThunk => async () => {
    if (props.queryBuilder.query !== undefined) {
      const result = await api.campaignEditor.segmentationQueries.querySegmentationQueries({
        queryBuilderQuery: props.queryBuilder.query
      })
      props.queryBuilder.updateResults(result as SegmentationRuleResponse[])
    }
  }

  const setRefresh = (): void => {
    clearTimeout(refreshTimeout)
    refreshTimeout = setTimeout(async () => {
      await refresh()
    }, 2000)
  }

  const onChange = (immutableTree: ImmutableTree, config: Config): void => {
    props.queryBuilder.update(immutableTree, config)
    setRefresh()
  }

  return (
    <Query
      {...props.queryBuilder.config}
      // override
      settings={{
        ...props.queryBuilder.config.settings,
        renderAfterWidget: renderQueryResult,
        renderBeforeActions: renderQueryResult
      }}
      value={props.queryBuilder.tree}
      renderBuilder={renderBuilder}
      onChange={onChange}
    />
  )
}
