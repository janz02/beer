import React, { useEffect, useState } from 'react'
import { Query, Builder, BuilderProps, ImmutableTree, Config } from 'react-awesome-query-builder'
import { useQueryBuilderUtils } from './useQueryBuilderUtils'
import { RuleResultContainer } from './RuleResultContainer'
// import 'antd/dist/antd.css'
import 'react-awesome-query-builder/css/styles.scss'
import 'react-awesome-query-builder/css/compact_styles.scss' // optional, for more compact styles
import './QueryBuilderView.scss'

export const QueryBuilderView: React.FC = () => {
  const [queryRefreshReady, setQueryRefreshReady] = useState(true)
  const queryBuilder = useQueryBuilderUtils()

  const renderBuilder = (builder: BuilderProps): JSX.Element => {
    queryBuilder.setQueryBuilderActionsRef(builder)

    return (
      <div className="query-builder">
        <Builder {...builder} />
      </div>
    )
  }

  const renderQueryResult = ({ id }: any): JSX.Element => {
    const rule = queryBuilder.getRuleResult(id)
    return rule ? <RuleResultContainer ruleResult={rule} /> : <></>
  }

  const setRefresh = (updatedTree: ImmutableTree): void => {
    if (queryRefreshReady) {
      setQueryRefreshReady(false)
      setTimeout(() => {
        setQueryRefreshReady(true)
        queryBuilder.refresh(updatedTree)
      }, 2000)
    }
  }

  const onChange = async (updatedTree: ImmutableTree, updatedConfig: Config): Promise<void> => {
    queryBuilder.update(updatedTree, updatedConfig)
    setRefresh(updatedTree)
  }

  // Update the query results once the rules are ready
  useEffect(() => {
    if (queryBuilder.config.fields && queryBuilder.tree && queryBuilder.ruleResults.length === 0) {
      queryBuilder.update(queryBuilder.tree, queryBuilder.config)
      queryBuilder.refresh(queryBuilder.tree)
    }
  })

  if (!queryBuilder.config.fields || !queryBuilder.tree) {
    return <></>
  }

  return (
    <Query
      {...queryBuilder.config}
      // override
      settings={{
        ...queryBuilder.config.settings,
        renderAfterWidget: renderQueryResult,
        renderBeforeActions: renderQueryResult
      }}
      value={queryBuilder.tree}
      renderBuilder={renderBuilder}
      onChange={onChange}
    />
  )
}
