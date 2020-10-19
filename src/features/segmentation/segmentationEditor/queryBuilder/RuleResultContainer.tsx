import { Input } from 'antd'
import React from 'react'
import { SegmentationRuleResult } from '../../../../models/campaign/segmentationRuleResult'

interface RuleResultContainerProps {
  ruleResult: SegmentationRuleResult
  emptyValue: string
}

export const RuleResultContainer: React.FC<RuleResultContainerProps> = props => {
  const total = function(): string {
    const result = props.ruleResult
    if (!result || (!result.segmentSize && result.segmentSize !== 0)) {
      return props.emptyValue
    }
    return `${result.segmentSize}`
  }

  const filtered = function(): string {
    const result = props.ruleResult
    if (!result || (!result.filteredSize && result.filteredSize !== 0)) {
      return props.emptyValue
    }
    return `${result.filteredSize}`
  }

  return (
    <div>
      <div className="statistics">
        <div className="inputs">
          <Input placeholder="total" readOnly value={total()} />
          <Input placeholder="filtered" readOnly value={filtered()} />
        </div>
      </div>
    </div>
  )
}
