import React from 'react'
import { Query, Builder, BuilderProps, ImmutableTree, Config } from 'react-awesome-query-builder'
import { QueryBuilderUtils } from './useQueryBuilderUtils'
import { RuleResultContainer } from './RuleResultContainer'
// import 'antd/dist/antd.css'
import 'react-awesome-query-builder/css/styles.scss'
import 'react-awesome-query-builder/css/compact_styles.scss' // optional, for more compact styles

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

  const setRefresh = (): void => {
    clearTimeout(refreshTimeout)
    refreshTimeout = setTimeout(props.queryBuilder.refresh, 2000)
  }

  const onChange = (immutableTree: ImmutableTree, config: Config): void => {
    props.queryBuilder.update(immutableTree, config)
    setRefresh()
  }

  if (
    !props.queryBuilder.config.fields &&
    !props.queryBuilder.tree &&
    props.queryBuilder.rules.length !== 2
  ) {
    return <></>
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
