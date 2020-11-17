import { ListRequestParams, Pagination } from 'hooks/useTableUtils'
import { Group } from 'models/group'
import moment from 'moment'

interface GetGroupsResponse extends Pagination {
  result: Group[]
}

const getRandomString = (length: number): string => {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return result
}

const getRandomGroup = (id: number): Group => {
  return {
    id,
    name: getRandomString(10),
    companyCount: Math.floor(Math.random() * 10),
    jobRoleCount: Math.floor(Math.random() * 10),
    permissionCount: Math.floor(Math.random() * 10),
    createdDate: moment(),
    creator: getRandomString(10)
  }
}

export const getGroupsMock = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  listParams: ListRequestParams
): Promise<GetGroupsResponse> => {
  const result: Group[] = []
  for (let i = 1; i <= 10; i++) {
    result.push(getRandomGroup(i))
  }

  return {
    result,
    page: 1,
    from: 1,
    to: 10,
    size: 10,
    pageSize: 10
  }
}

export const getExportGroupsCsv = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  listParams: ListRequestParams
): Promise<Blob> => {
  return new Blob([getRandomString(10)])
}
