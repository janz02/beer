import React, { useCallback, useMemo } from 'react'
import { TablePaginationConfig } from 'antd/lib/table'
import { useIsMobile } from './isMobileHook'
import { useDispatch } from './react-redux-hooks'
import { PaginationConfig } from 'antd/lib/pagination'
import { SorterResult, SortOrder, ColumnFilterItem, ColumnType } from 'antd/lib/table/interface'
import { SearchOutlined, CalendarOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
import { SearchTableDropdown } from 'components/table-dropdowns/SearchTableDropdown'
import { DatepickerTableDropdown } from 'components/table-dropdowns/DatepickerTableDropdown'
import { MomentDisplay } from 'components/MomentDisplay'

export enum OrderByType {
  Ascending = 'Ascending',
  Descending = 'Descending'
}

export enum FilterMode {
  FILTER = 'filter',
  SEARCH = 'search',
  DATEPICKER = 'datepicker'
}

export interface Pagination {
  page?: number
  from?: number
  to?: number
  size?: number
  pageSize?: number
}
export interface ListRequestParams extends Pagination {
  [filterKey: string]: any
  total?: number
  orderBy?: string
  orderByType?: OrderByType
}

export interface UseTableUtilsProps<T> {
  listParamsState: ListRequestParams
  filterKeys?: (keyof T)[]
  getDataAction: (params: ListRequestParams) => any
}

export const reviseListRequestParams = (
  oldParams: ListRequestParams,
  newParams: ListRequestParams
): ListRequestParams => ({
  ...oldParams,
  ...newParams
})

export const storableListRequestParams = (
  revisedParams: ListRequestParams,
  responsePagination: Pagination
): ListRequestParams => ({
  ...revisedParams,
  ...responsePagination
})

interface ColumnConfigParams extends ColumnType<any> {
  key: string
  filterMode?: FilterMode
  filters?: ColumnFilterItem[]
  sort?: boolean
  highlightSearch?: boolean
}

export interface UseTableUtils {
  paginationConfig: false | TablePaginationConfig
  handleTableChange: any
  columnConfig: (params: ColumnConfigParams) => ColumnType<any>
}

const showTotalText = (total: number, range: number[]): string =>
  `${range[1] - range[0] + +!!range[1]} / ${total}`

/** Combine the old and new pagination values. */
const calculatePagination = (newPagination: Pagination, oldPagination: Pagination): Pagination => ({
  ...oldPagination,
  ...newPagination,
  page: Math.max(newPagination?.page ?? oldPagination?.page ?? 1, 1)
})

/** When the last item is deleted on the table page, the pagination page must be reduced. */
const recalculatePaginationAfterDeletion = (oldPagination?: Pagination): number => {
  if (oldPagination?.page === undefined) {
    return 1
  }
  const reductPage = oldPagination.to === oldPagination.from
  const page = oldPagination.page - +reductPage
  return Math.max(page, 1)
}

/** When the page size is changed, this will keep the previous top element on the new (resized) page. */
const projectPageToNewPageSize = (newSize: number, pagination?: Pagination): number => {
  return typeof pagination?.from === 'number' ? Math.ceil(pagination.from / newSize) : 1
}

/** The common pagination config. */
export const basePaginationConfig = (
  isMobile: boolean,
  pagination?: Pagination
): TablePaginationConfig => ({
  showTotal: showTotalText,
  pageSize: pagination?.pageSize ?? 10,
  current: pagination?.page ?? 1,
  total: pagination?.size ?? 0,
  simple: isMobile,
  pageSizeOptions: ['5', '10', '25', '50'],
  showSizeChanger: true
})

/**
 * 
 @example 
 // For filtering with dropdown select

 */
function useTableUtils<T>(props: UseTableUtilsProps<T>): UseTableUtils {
  const { listParamsState, getDataAction, filterKeys } = props

  const isMobile = useIsMobile()
  const dispatch = useDispatch()

  const paginationConfig = useMemo((): TablePaginationConfig | false => {
    const baseConfig = basePaginationConfig(isMobile, listParamsState)
    return baseConfig.total ? baseConfig : false
  }, [isMobile, listParamsState])

  const toSortOrder = useCallback((orderType?: OrderByType | null): SortOrder | undefined => {
    switch (orderType) {
      case OrderByType.Ascending:
        return 'ascend'
      case OrderByType.Descending:
        return 'descend'
      default:
        return undefined
    }
  }, [])

  const toOrderByType = useCallback((sortOrder?: SortOrder): OrderByType | undefined => {
    switch (sortOrder) {
      case 'ascend':
        return OrderByType.Ascending
      case 'descend':
        return OrderByType.Descending
      default:
        return undefined
    }
  }, [])

  const searchedTextHighlighter = useCallback(
    (key: string, fieldText: string): any =>
      listParamsState?.[key] ? (
        <Highlighter
          autoEscape
          highlightStyle={{
            backgroundColor: '#ffc06966',
            padding: '0.05rem',
            borderRadius: '5px'
          }}
          searchWords={[listParamsState?.[key]]}
          textToHighlight={fieldText.toString()}
        />
      ) : (
        fieldText
      ),
    [listParamsState]
  )

  const columnConfig = useCallback(
    (params: ColumnConfigParams): ColumnType<any> => {
      const { key, filterMode, sort, filters, highlightSearch, ...rest } = params
      const config: ColumnType<any> = {
        ...rest,
        key: key,
        dataIndex: key
      }

      if (filterMode) {
        config.filteredValue = listParamsState?.[key] ? [listParamsState?.[key]] : undefined
      }

      switch (filterMode) {
        case FilterMode.SEARCH:
          config.filterDropdown = SearchTableDropdown
          config.filterIcon = () => <SearchOutlined />
          if (highlightSearch) {
            config.render = (text: string) => searchedTextHighlighter(key, text)
          }
          break
        case FilterMode.DATEPICKER:
          config.filterDropdown = DatepickerTableDropdown
          config.filterIcon = () => <CalendarOutlined />
          config.render = (value: any) => <MomentDisplay date={value} />
          break
        case FilterMode.FILTER:
          if (filters?.length) {
            config.filterMultiple = false
            config.filters = filters
            config.filterMultiple = false
            config.filters = filters
          }
          break
        default:
          break
      }

      const noNeedForSort = filterMode && filterMode !== FilterMode.SEARCH && filters

      if (sort && !noNeedForSort) {
        config.sorter = true
        config.sortOrder =
          listParamsState.orderBy === key ? toSortOrder(listParamsState.orderByType) : undefined
      }

      return config
    },
    [listParamsState, searchedTextHighlighter, toSortOrder]
  )

  const handleTableChange: any = useCallback(
    (
      pagination: PaginationConfig,
      filters: Record<string, React.ReactText[] | null>,
      sorter: SorterResult<any>
    ) => {
      const correctedPagination = calculatePagination(
        {
          page: pagination.current,
          pageSize: pagination.pageSize
        },
        listParamsState
      )

      const requestParams: ListRequestParams = {
        page: correctedPagination.page,
        pageSize: correctedPagination.pageSize
      }

      if (pagination.pageSize && listParamsState.pageSize !== pagination.pageSize) {
        requestParams.page = projectPageToNewPageSize(pagination.pageSize, listParamsState)
      }

      requestParams.orderByType = toOrderByType(sorter.order)
      requestParams.orderBy = requestParams.orderByType ? (sorter?.field as string) : undefined

      filterKeys?.forEach((key: any) => {
        requestParams[key] = filters?.[key]?.[0]
      })

      console.log({ requestParams })

      dispatch(getDataAction(requestParams))
    },
    [dispatch, filterKeys, getDataAction, listParamsState, toOrderByType]
  )

  return {
    paginationConfig,
    handleTableChange,
    columnConfig
  }
}

export { useTableUtils, recalculatePaginationAfterDeletion }
