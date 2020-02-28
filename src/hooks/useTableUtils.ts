import { useCallback, useMemo } from 'react'
import { TablePaginationConfig } from 'antd/lib/table'
import { basePaginationConfig, Pagination } from 'models/pagination'
import { useIsMobile } from './isMobileHook'
import { useDispatch } from './react-redux-hooks'
import { PaginationConfig } from 'antd/lib/pagination'
import { SorterResult } from 'antd/lib/table/interface'

export enum OrderByType {
  Ascending = 'Ascending',
  Descending = 'Descending'
}

export interface ListRequestParams {
  [filterKey: string]: any
  page?: number
  pageSize?: number
  from?: number
  size?: number
  total?: number
  to?: number
  orderBy?: string
  orderByType?: OrderByType
}

export interface UseTableUtilsProps {
  pagination: Pagination
  error: string
  filterKeys?: string[]
  getDataAction: (params: ListRequestParams) => any
}

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
    const pagination = calculatePagination(params, oldPagination)
    const response = await api.data.getData({
      ...params,
      pageSize: pagination.pageSize,
      page: pagination.page
    })

    dispatch(
      getDataSuccess({
        data: response.result as Data[],
        pagination: {
          page: response.page,
          from: response.from,
          size: response.size,
          to: response.to,
          pageSize: pagination.pageSize // From pagination state of the list
        }
      })
    )
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useTableUtils = <T = any>(props: UseTableUtilsProps) => {
  const { pagination, error, getDataAction, filterKeys } = props

  const isMobile = useIsMobile()
  const dispatch = useDispatch()

  const paginationConfig = useMemo((): TablePaginationConfig | false => {
    const baseConfig = basePaginationConfig(isMobile, !!error, pagination)
    return baseConfig.total ? baseConfig : false
  }, [error, isMobile, pagination])

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
      const requestParams: ListRequestParams = {
        page: pagination.current,
        pageSize: pagination.pageSize
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
    [dispatch, filterKeys, getDataAction]
  )

  return { paginationConfig, handleTableChange, sorterConfig }
}
