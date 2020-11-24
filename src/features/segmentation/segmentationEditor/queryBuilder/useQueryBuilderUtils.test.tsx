import { renderHook } from '@testing-library/react-hooks'
import { setupStore } from '../../../../../config/setupMocks'
import { storeMock } from './useQueryBuilderUtilsMocks'
import { useQueryBuilderUtils } from './useQueryBuilderUtils'
import { Map } from 'immutable'
import { ImmutableTree, Utils } from 'react-awesome-query-builder'

jest.mock('app/store')

setupStore(storeMock)

beforeAll(() => {
  jest.spyOn(Map.prototype, 'get').mockImplementation(param => {
    if (param === 'id') return '99aabbba-0123-4456-b89a-b174b51f3f66'
  })
  jest.spyOn(Utils, 'loadTree').mockImplementation(param => {
    console.log('asd')
    return {} as ImmutableTree
  })
})

describe('Query builder tests', () => {
  it('shows correct rule result', () => {
    // Arrange
    const { result } = renderHook(() => useQueryBuilderUtils())

    // Assert
    expect(result.current.getRuleResult('9b9b9abb-89ab-4cde-b012-3174b52f0931')).toStrictEqual({
      ruleId: '9b9b9abb-89ab-4cde-b012-3174b52f0931',
      segmentSize: 846,
      filteredSize: 490
    })
  })
  // ELASTIC TypeError: Cannot read property 'fetchStart' of undefined
  /*
  it(' load the correct configuration', () => {
    // Arrange
    const { result } = renderHook(() => useQueryBuilderUtils())

    // Assert
    expect(result.current.config).not.toBeNull()
  })

  it('to have rules', () => {
    // Arrange
    const { result } = renderHook(() => useQueryBuilderUtils())

    // Assert
    expect(result.current.rules).not.toBeNull()
  })

  it('to have conditionChange events', () => {
    // Arrange
    const { result } = renderHook(() => useQueryBuilderUtils())

    // Assert
    expect(result.current.conditionChanges()).not.toBeNull()
  }) */

  // LOADTREE is not yet working
  /*
  it('shows correct rule result', () => {
    // Arrange
    const { result } = renderHook(() => useQueryBuilderUtils())

    // Assert
    expect(result.current.treeTotal).toStrictEqual({
      segmentSize: 846,
      filteredSize: 490
    })
  }) */
})
