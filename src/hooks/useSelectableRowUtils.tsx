import { DownOutlined } from '@ant-design/icons'
import { Checkbox, Dropdown, Menu } from 'antd'
import React, { useCallback, useEffect, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import {
  arrayElementsContainedInAnother,
  someArrayElementsContainedInAnother
} from 'services/commonFunctions'

export enum THREE_STATE_CHECKBOX {
  ALL = 'all',
  MINUS = 'minus',
  NONE = 'none'
}

export interface SelectableRowUtils {
  selectedItems: any[]
  setCurrentPageIds: (source: any[], currentPage?: number, pageSize?: number) => void
  resetSelection: () => void
  selectColumnConfig: any
}

export interface SelectableRowUtilsParams {
  isBackendPagination: boolean
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

export const useSelectableRowUtils = (props: SelectableRowUtilsParams): SelectableRowUtils => {
  const { isBackendPagination } = props
  const { t } = useTranslation()
  const [selectedState, dispatch] = useReducer(reducer, initialSelectedState)
  const { selectedItems, currentPageIds, headerState } = selectedState

  const resetSelection = (): void => dispatch({ type: 'reset_selection', payload: null })

  const removeFromSelection = (ids: any[]): void =>
    dispatch({ type: 'remove_selection', payload: ids })

  const addToSelection = (ids: any[]): void => dispatch({ type: 'add_selection', payload: ids })

  const setCurrentPageIds = (source: any[], currentPage?: number, pageSize?: number): void => {
    const mappedIds = source.map(el => el.id)

    if (isBackendPagination) {
      dispatch({ type: 'set_current_page_ids', payload: mappedIds })
    } else {
      const take = pageSize || 10
      const skip = take * ((currentPage || 1) - 1)
      const filtered = mappedIds.filter((el, i) => i >= skip && i < skip + take)

      dispatch({ type: 'set_current_page_ids', payload: filtered })
    }
  }

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
        data-testid="tableSelect_HeaderCheckbox"
        checked={headerState.status !== THREE_STATE_CHECKBOX.NONE}
        className={`table-select__checkbox ${headerState.className}`}
        onChange={headerCheckboxClicked}
      />
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item
              key="table_select_reverse"
              data-testid="tableSelect_ReverseSelection"
              onClick={reverseSelection}
            >
              {t('common.selection.reverse')}
            </Menu.Item>
          </Menu>
        }
        trigger={['click']}
        className="table-select__dropdown"
      >
        <DownOutlined data-testid="tableSelect_HeaderDropdown" />
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
          data-testid={`tableSelect_rowcheckbox_${record.id}`}
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
