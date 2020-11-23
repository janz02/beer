import { DownOutlined } from '@ant-design/icons'
import { Checkbox, Dropdown, Menu } from 'antd'
import React, { useCallback, useEffect, useReducer } from 'react'
import { useTranslation } from 'react-i18next'

export const arrayElementsContainedInAnother = (a: any, b: any): boolean => {
  if (!Array.isArray(a) || !Array.isArray(b) || (a.length === 0 && b.length === 0)) return false

  return a.every(val => b.includes(val))
}

export const someArrayElementsContainedInAnother = (a: any, b: any): boolean => {
  if (!Array.isArray(a) || !Array.isArray(b) || (a.length === 0 && b.length === 0)) return false

  return a.some(val => b.includes(val))
}

export enum THREE_STATE_CHECKBOX {
  ALL = 'all',
  MINUS = 'minus',
  NONE = 'none'
}

export interface SelectableRowUtils {
  selectedItems: any[]
  setCurrentPageIds: (ids: any[]) => void
  resetSelection: () => void
  selectColumnConfig: any
}

interface SelectedState {
  selectedItems: any[]
  currentPageIds: any[]
  headerState: {
    status: THREE_STATE_CHECKBOX
    className: string
  }
}

interface SelectedStateAction {
  type: string
  payload: any
}

const initialSelectedState: SelectedState = {
  selectedItems: [],
  currentPageIds: [],
  headerState: {
    status: THREE_STATE_CHECKBOX.NONE,
    className: ''
  }
}

function reducer(state: SelectedState, action: SelectedStateAction): any {
  switch (action.type) {
    case 'add_selection':
      return {
        ...state,
        selectedItems: [...state.selectedItems, ...action.payload]
      }

    case 'remove_selection':
      return {
        ...state,
        selectedItems: state.selectedItems.filter((el: any) => !action.payload.includes(el))
      }

    case 'reset_selection':
      return { ...initialSelectedState }

    case 'set_current_page_ids':
      return {
        ...state,
        currentPageIds: [...action.payload]
      }

    case 'set_header_state':
      return { ...state, headerState: action.payload }

    default:
      throw new Error()
  }
}

export const useSelectableRowUtils = (): SelectableRowUtils => {
  const { t } = useTranslation()
  const [selectedState, dispatch] = useReducer(reducer, initialSelectedState)
  const { selectedItems, currentPageIds, headerState } = selectedState

  const resetSelection = (): void => dispatch({ type: 'reset_selection', payload: null })

  const removeFromSelection = (ids: any[]): void =>
    dispatch({ type: 'remove_selection', payload: ids })

  const addToSelection = (ids: any[]): void => dispatch({ type: 'add_selection', payload: ids })

  const setCurrentPageIds = (ids: any[]): void =>
    dispatch({ type: 'set_current_page_ids', payload: ids })

  const reverseSelection = (): void => {
    const currentPageSelectedIds = currentPageIds.filter((id: any) => selectedItems.includes(id))
    const currentPageNotSelectedIds = currentPageIds.filter(
      (id: any) => !selectedItems.includes(id)
    )
    removeFromSelection(currentPageSelectedIds)
    addToSelection(currentPageNotSelectedIds)
  }

  const setHeaderState = useCallback(() => {
    const isAllCurrentPageIdsSelected = arrayElementsContainedInAnother(
      currentPageIds,
      selectedItems
    )
    const someCurrentPageIdsAreSelected = someArrayElementsContainedInAnother(
      currentPageIds,
      selectedItems
    )

    if (
      selectedItems.length === 0 ||
      (!someCurrentPageIdsAreSelected && !isAllCurrentPageIdsSelected)
    ) {
      dispatch({
        type: 'set_header_state',
        payload: {
          status: THREE_STATE_CHECKBOX.NONE,
          className: ''
        }
      })
    } else if (someCurrentPageIdsAreSelected && !isAllCurrentPageIdsSelected) {
      dispatch({
        type: 'set_header_state',
        payload: {
          status: THREE_STATE_CHECKBOX.MINUS,
          className: 'table-select__checkbox--minus'
        }
      })
    } else if (isAllCurrentPageIdsSelected) {
      dispatch({
        type: 'set_header_state',
        payload: {
          status: THREE_STATE_CHECKBOX.ALL,
          className: ''
        }
      })
    }
  }, [selectedItems, currentPageIds])

  const headerCheckboxClicked = (): void => {
    if (headerState.status === THREE_STATE_CHECKBOX.NONE) {
      addToSelection(currentPageIds)
    } else {
      removeFromSelection(currentPageIds)
    }
  }

  const headerContainer = (
    <span className="table-select__container">
      <Checkbox
        checked={headerState.status !== THREE_STATE_CHECKBOX.NONE}
        className={`table-select__checkbox ${headerState.className}`}
        onChange={headerCheckboxClicked}
      />
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item key="table_select_reverse" onClick={reverseSelection}>
              {t('common.selection.reverse')}
            </Menu.Item>
          </Menu>
        }
        trigger={['click']}
        className="table-select__dropdown"
      >
        <DownOutlined />
      </Dropdown>
    </span>
  )

  const selectColumnConfig = {
    key: 'selectCheckboxes',
    title: headerContainer,
    width: '60px',
    render(record: any) {
      return (
        <Checkbox
          checked={selectedItems.includes(record.id)}
          onChange={e => {
            if (e.target.checked) {
              addToSelection([record.id])
            } else {
              removeFromSelection([record.id])
            }
          }}
        />
      )
    }
  }

  useEffect(() => {
    setHeaderState()
  }, [setHeaderState])

  return {
    selectedItems,
    selectColumnConfig,
    setCurrentPageIds,
    resetSelection
  }
}
