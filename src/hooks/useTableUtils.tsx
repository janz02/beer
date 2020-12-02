import React, { useCallback, useMemo } from 'react'
import { TablePaginationConfig } from 'antd/lib/table'
import { useIsMobile } from './useIsMobile'
import { useDispatch } from './react-redux-hooks'
import { PaginationConfig } from 'antd/lib/pagination'
import { SorterResult, SortOrder, ColumnFilterItem } from 'antd/lib/table/interface'
import { SearchOutlined, CalendarOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
import { SearchTableDropdown } from 'components/table-dropdowns/SearchTableDropdown'
import { DatepickerTableDropdown } from 'components/table-dropdowns/DatepickerTableDropdown'
import { DateRangePickerTableDropdown } from 'components/table-dropdowns/DateRangePickerTableDropdown'
import { MomentDisplay } from 'components/MomentDisplay'
import { useTranslation } from 'react-i18next'
import { ActivenessDisplay } from 'components/ActivenessDisplay'
import moment from 'moment'
import { ExtendedColumnType } from 'components/table-columns/ExtendedColumnType'

export enum OrderByType {
  Ascending = 'Ascending',
  Descending = 'Descending'
}

export enum FilterMode {
  FILTER = 'filter',
  SEARCH = 'search',
  DATEPICKER = 'datepicker',
  DATERANGEPICKER = 'daterangepicker',
  /**
   * For filtering and renderindg YES or NO values, mapped to 'true' and 'fasle'.
   * No need to populate filters and render prop with this option.
   */
  YES_NO = 'yes_no',
  /**
   * For filtering and rendering ACTIVE or INACTIVE values, mapped to 'true' and 'fasle'.
   * No need to populate filters and render prop with this option.
   */
  ACTIVE_INACTIVE = 'active_inactive',
  ENUM = 'enum'
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

export interface TableUtilsProps<T> {
  listParamsState: ListRequestParams
  sortWithoutDefaultOption?: boolean
  getDataAction: (params: ListRequestParams) => any
  /** Config for the columns that contain data */
  columnParams: ColumnConfigParams[]
  /** Config for the column that contains the edit, view or delete buttons */
  actionColumnParams?: Partial<ColumnConfigParams>
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

export interface ActivenessOptions {
  active: string
  inactive: string
  deleted?: string
}

/**
 * Configures the Ant Design table
 */
export interface ColumnConfigParams extends ExtendedColumnType<any> {
  /** The property name of the item */
  key: string
  /** The way that the column can be filtered */
  filterMode?: FilterMode
  /**
   * Optional, overwrites the default filters if present. These filters are the values that the
   * table can be filtered for.
   */
  filters?: ColumnFilterItem[]
  /** Enables sorting the table by this column's value */
  sort?: boolean
  /** Highlighting won't be visible when searching */
  disableSearchHighlight?: boolean
  /**
   * If this parameter has the value "date time", the column will be rendered with
   * `MomentDisplay`
   */
  renderMode?: 'date time' | null
}

export interface TableUtils<T> {
  paginationConfig: false | TablePaginationConfig
  handleTableChange: any
  columnsConfig: ExtendedColumnType<T>[]
  addKeyProp: (data?: T[]) => T[]
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
  showSizeChanger: true,
  // TODO: this doesn't work but hopefully they will fix it.
  position: ['bottomCenter']
})

/**
 * Used for implementating tables with pagination, filtering, searching and sorting.
 @example
 // For filtering with dropdown select

 */
function useTableUtils<T extends { [key: string]: any }>(props: TableUtilsProps<T>): TableUtils<T> {
  const {
    listParamsState,
    getDataAction,
    sortWithoutDefaultOption,
    actionColumnParams,
    columnParams
  } = props

  const isMobile = useIsMobile()
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const addKeyProp = (data?: T[]): T[] => data?.map((t, i) => ({ ...t, key: '' + i + t?.id })) ?? []

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

  /**
   * Renders the text in the table cell with highliting if the column is filtered by searching for
   * the value contained in `listParamsState?.[key]`
   * @param key The property name of the item that corresponds to the column
   * @param fieldText The text that is present in the table cell
   */
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
          textToHighlight={fieldText?.toString()}
        />
      ) : (
        fieldText
      ),
    [listParamsState]
  )

  const columnsConfig = useMemo((): ExtendedColumnType<any>[] => {
    const columnsConfig = columnParams.map(params => {
      const { key, filterMode, sort, filters, disableSearchHighlight, renderMode, ...rest } = params

      const config: ExtendedColumnType<T> = {
        ellipsis: true,
        ...rest,
        dataIndex: key,
        key
      }

      switch (filterMode) {
        case FilterMode.SEARCH:
          config.filterDropdown = SearchTableDropdown
          config.filterIcon = () => <SearchOutlined />
          if (!disableSearchHighlight) {
            config.render = (text: string) => searchedTextHighlighter(key, text)
          }
          break
        case FilterMode.DATEPICKER:
          config.filterDropdown = DatepickerTableDropdown
          config.filterIcon = () => <CalendarOutlined />
          config.render = (value: any) => <MomentDisplay date={value} />
          break
        case FilterMode.DATERANGEPICKER:
          config.filterDropdown = DateRangePickerTableDropdown
          config.filterIcon = () => <CalendarOutlined />

          if (!config.render) {
            config.render = (value: any) => <MomentDisplay date={value} />
          }
          break
        case FilterMode.FILTER:
          if (filters?.length) {
            config.filterMultiple = false
            config.filters = filters
          }
          break
        case FilterMode.YES_NO:
          config.filterMultiple = false
          config.filters = filters ?? [
            { value: 'true', text: t('common.yes') },
            { value: 'false', text: t('common.no') }
          ]
          config.render = (value: boolean) => (value ? t('common.yes') : t('common.no'))
          break
        case FilterMode.ACTIVE_INACTIVE: {
          const activeText = t('common.active')
          const inactiveText = t('common.inactive')

          config.filterMultiple = false
          config.filters = [
            { value: true, text: activeText },
            { value: false, text: inactiveText }
          ]

          if (!config.render) {
            config.render = value => (
              <ActivenessDisplay
                status={value ? 'active' : 'inactive'}
                text={value ? activeText : inactiveText}
              />
            )
          }
          break
        }
        case FilterMode.ENUM:
          config.filters = filters
          break
        default:
          break
      }

      if (sort) {
        config.sorter = true
        config.sortOrder =
          listParamsState.orderBy === key ? toSortOrder(listParamsState.orderByType) : null
      }

      if (renderMode === 'date time') {
        config.render = (value: any) => <MomentDisplay date={value} mode="date time" />
      }

      if (filterMode) {
        const value = listParamsState?.[key]
        if (value) {
          config.filteredValue = config.filterMultiple ? value : [value]
        }
      }

      return config
    })

    if (actionColumnParams) {
      columnsConfig.push({
        key: 'actions',
        colSpan: 1,
        width: '130px',
        ...actionColumnParams
      })
    }

    return columnsConfig
  }, [listParamsState, searchedTextHighlighter, t, toSortOrder, columnParams, actionColumnParams])

  /**
   * `onChange` handler for Ant Design Table
   * This callback executed when pagination, filters or sorter is changed
   */
  const handleTableChange: any = useCallback(
    (
      pagination: PaginationConfig,
      filters: Record<string, React.ReactText[] | null>,
      sorter: SorterResult<any>
    ) => {
      // In case of no sort use 'ascend'. So instead of 'ascend' -> 'descent' -> undefined -> 'ascend'
      // it will be 'ascend' -> 'descent' -> 'ascend'
      if (sortWithoutDefaultOption && !sorter.order) sorter.order = 'ascend'

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

      for (const { key, filterMode, filterMultiple } of columnParams) {
        const filterItems = filters?.[key]

        switch (filterMode) {
          case FilterMode.DATEPICKER:
            if (filterItems) {
              const filterItem = (filterItems[0] as unknown) as moment.Moment
              requestParams[key] = filterItem
            } else {
              requestParams[key] = undefined
            }

            break

          case FilterMode.DATERANGEPICKER:
            if (filterItems) {
              const filterItem = (filterItems[0] as unknown) as moment.Moment[]
              requestParams[key + 'From'] = filterItem[0].format('L')
              requestParams[key + 'To'] = (filterItem[1] as moment.Moment).add(1, 'day').format('L')
              break
            } else {
              requestParams[key] = undefined
            }

            break

          default: {
            requestParams[key] = filterMultiple ? filterItems : filterItems?.[0]
            break
          }
        }
      }

      dispatch(getDataAction(requestParams))
    },
    [
      dispatch,
      getDataAction,
      listParamsState,
      sortWithoutDefaultOption,
      toOrderByType,
      columnParams
    ]
  )

  return {
    paginationConfig,
    handleTableChange,
    columnsConfig,
    addKeyProp
  }
}

export { useTableUtils, recalculatePaginationAfterDeletion }
