import { render, screen } from '@testing-library/react'
import { SegmentationRuleResult } from 'models/campaign/segmentationRuleResult'
import React from 'react'
import { RuleResultContainer } from './RuleResultContainer'

describe('Rule result container', () => {
  it('shows correct available values', () => {
    // Arrange
    const result = {
      segmentSize: 100,
      filteredSize: 20
    } as SegmentationRuleResult

    // Act
    render(<RuleResultContainer ruleResult={result} />)

    // Assert
    expect(screen.getAllByDisplayValue(/100/)).toHaveLength(1)
    expect(screen.getAllByDisplayValue(/20/)).toHaveLength(1)
  })

  it('shows empty value placeholders for undefined values', () => {
    // Arrange
    const result = {
      segmentSize: undefined,
      filteredSize: undefined
    } as SegmentationRuleResult

    // Act
    render(<RuleResultContainer ruleResult={result} />)

    // Assert
    expect(screen.getAllByDisplayValue('?')).toHaveLength(2)
  })

  it('shows empty value placeholders for empty result', () => {
    // Arrange
    const result = {} as SegmentationRuleResult

    // Act
    render(<RuleResultContainer ruleResult={result} />)

    // Assert
    expect(screen.getAllByDisplayValue('?')).toHaveLength(2)
  })

  it('shows zero values ', () => {
    // Arrange
    const result = { segmentSize: 0, filteredSize: 0 } as SegmentationRuleResult

    // Act
    render(<RuleResultContainer ruleResult={result} />)

    // Assert
    expect(screen.getAllByDisplayValue('0')).toHaveLength(2)
  })
})
