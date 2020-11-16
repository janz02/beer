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
    return rule ? <RuleResultContainer ruleResult={rule} emptyValue="?" /> : <></>
  }

  const setRefresh = (immutableTree: ImmutableTree): void => {
    if (queryRefreshReady) {
      setQueryRefreshReady(false)
      setTimeout(() => {
        setQueryRefreshReady(true)
        queryBuilder.refresh(immutableTree)
      }, 2000)
    }
  }

  const onChange = async (immutableTree: ImmutableTree, config: Config): Promise<void> => {
    queryBuilder.update(immutableTree, config)
    setRefresh(immutableTree)
  }

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
