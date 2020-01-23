import { TablePaginationConfig } from 'antd/lib/table/Table'

const showTotalText = (total: number, range: number[]): string =>
  `${range[1] - range[0] + +!!range[1]} / ${total}`

export interface Pagination {
  page?: number
  from?: number
  to?: number
  size?: number
  pageSize?: number
}

/**
 * Use the old and new paginatition
 * @param newPagination
 * @param oldPagination
 */
export const calculatePagination = (
  newPagination: Pagination,
  oldPagination: Pagination
): Pagination => {
  const pageSize = newPagination?.pageSize ?? oldPagination?.pageSize ?? 10
  const page = newPagination?.page ?? oldPagination?.page ?? 1
  return {
    pageSize,
    page: Math.max(page, 1)
  }
}

/**
 * When the last item is deleted on page, the page must be reduced.
 * @param oldPagination
 */
export const recalculatePagination = (oldPagination?: Pagination): number => {
  if (oldPagination?.page === undefined) {
    return 1
  }
  const reductPage = oldPagination.to === oldPagination.from
  const page = oldPagination.page - +reductPage
  return page
}

/**
 * When the page size is changed, this will keep the previous top element on the new (resized) page.
 * @param newSize
 * @param pagination
 */
export const projectPage = (newSize: number, pagination?: Pagination): number => {
  return typeof pagination?.from === 'number' ? Math.ceil(pagination.from / newSize) : 1
}

/**
 * The common pagination config.
 * @param pagination
 * @param isMobile
 * @param tableHasError
 */
export const basePaginationConfig = (
  isMobile: boolean,
  tableHasError: boolean,
  pagination?: Pagination
): TablePaginationConfig => ({
  showTotal: showTotalText,
  pageSize: pagination?.pageSize ?? 10,
  current: pagination?.page ?? 1,
  total: pagination?.size ?? 0,
  simple: isMobile,
  pageSizeOptions: ['5', '10', '25', '50'],
  showSizeChanger: !tableHasError
})
