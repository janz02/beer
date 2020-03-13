import { useCallback, useMemo } from 'react'
import { TablePaginationConfig } from 'antd/lib/table'
import { useIsMobile } from './isMobileHook'
import { useDispatch } from './react-redux-hooks'
import { PaginationConfig } from 'antd/lib/pagination'
import { SorterResult } from 'antd/lib/table/interface'

export enum OrderByType {
  Ascending = 'Ascending',
  Descending = 'Descending'
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

export interface UseTableUtilsProps {
  paginationState: Pagination
  filterKeys?: string[]
  getDataAction: (params: ListRequestParams) => any
}
export interface UseTableUtilsTools {
  paginationConfig: false | TablePaginationConfig
  handleTableChange: any
  sorterConfig: {
    sorter: boolean
  }
}

const showTotalText = (total: number, range: number[]): string =>
  `${range[1] - range[0] + +!!range[1]} / ${total}`

/** Combine the old and new pagination values. */
const calculatePagination = (newPagination: Pagination, oldPagination: Pagination): Pagination => ({
  ...oldPagination,
  ...newPagination,
  // page must be atleast 1 in all case
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
   const { handleTableChange } = useTableUtils({
    error,
    pagination,
    filterKeys: ['name'], // same as DTO
    getDataAction: getNewsletterTemplates
  })

  const columnsConfig = useMemo(() => [
      {
        title: t('newsletter.field.template-name'),
        key: 'name', // same as in the DTO
        dataIndex: 'name',
        filterMultiple: false, // Only single filter option is supported
        filters: [
          { text: 'Joe', value: 'Joe' },
          { text: 'Jim', value: 'Jim' }
        ]
      }
    ],[])

 @example 
 // For sorting you need to use the dto property name for the column dataIndex
    const { handleTableChange, sorterConfig } = useTableUtils({
      error,
      pagination,O
      getDataAction: getNewsletterTemplates
    })
  const columnsConfig = useMemo(() => [
      {
        title: t('newsletter.field.template-name'),
        key: 'name',
        dataIndex: 'name', // same as in the DTO
        ...sorterConfig
      }
    ],[])
 @example 
 // How you should use pagination in your getDataThunkAction(params: ListRequestParams)
    const oldPagination = getState().dataList.pagination
    const {result, ...pagination} = await api.data.getData({
      pageSize: oldPagination.pageSize,
      page: oldPagination.page,
      ...params,
    })

    dispatch(
      getDataSuccess({
        data: response.result as Data[],
        pagination: {
          ...pagination,
          pageSize: params.pageSize ?? oldPagination.pageSize
        }
      })
    )
 @example 
 // How you should use pagination in your deleteTableItemThunkAction(id)
    dispatch(deleteItemRequest())
    await api.data.deleteItem({ id })
    dispatch(deleteItemSuccess())
    const newPage = recalculatePaginationAfterDeletion(getState().data.pagination)
    dispatch(getDataList({ page: newPage }))
 */
const useTableUtils = <T = any>(props: UseTableUtilsProps): UseTableUtilsTools => {
  const { paginationState, getDataAction, filterKeys } = props

  const isMobile = useIsMobile()
  const dispatch = useDispatch()

  const paginationConfig = useMemo((): TablePaginationConfig | false => {
    const baseConfig = basePaginationConfig(isMobile, paginationState)
    return baseConfig.total ? baseConfig : false
  }, [isMobile, paginationState])

  const sorterConfig = useMemo(
    () => ({
      sorter: true
    }),
    []
  )

  const handleTableChange: any = useCallback(
    (
      pagination: PaginationConfig,
      filters: Record<string, React.ReactText[] | null>,
      sorter: SorterResult<T>
    ) => {
      const correctedPagination = calculatePagination(
        {
          page: pagination.current,
          pageSize: pagination.pageSize
        },
        paginationState
      )

      const requestParams: ListRequestParams = {
        page: correctedPagination.page,
        pageSize: correctedPagination.pageSize
      }

      if (pagination.pageSize && paginationState.pageSize !== pagination.pageSize) {
        requestParams.page = projectPageToNewPageSize(pagination.pageSize, paginationState)
      }

      if (sorter.order) {
        requestParams.orderBy = sorter?.field as string
        if (sorter.order === 'ascend') {
          requestParams.orderByType = OrderByType.Ascending
        } else if (sorter.order === 'descend') {
          requestParams.orderByType = OrderByType.Descending
        }
      }

      // eslint-disable-next-line no-unused-expressions
      filterKeys?.forEach(key => {
        requestParams[key] = filters?.[key]?.[0]
      })

      dispatch(getDataAction(requestParams))
    },
    [dispatch, filterKeys, getDataAction, paginationState]
  )

  return { paginationConfig, handleTableChange, sorterConfig }
}

export { useTableUtils, recalculatePaginationAfterDeletion }
