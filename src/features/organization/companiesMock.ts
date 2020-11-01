import { ListRequestParams, Pagination } from 'hooks/useTableUtils'
import { Company } from 'models/company'
import moment from 'moment'

interface GetCompaniesResponse extends Pagination {
  result: Company[]
}

const getRandomString = (length: number): string => {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return result
}

const getRandomCompany = (id: number): Company => {
  const name = getRandomString(10)

  return {
    id,
    status: 'active',
    name,
    profiles: Math.floor(Math.random() * 10),
    groups: Math.floor(Math.random() * 10),
    jobRoles: Math.floor(Math.random() * 10),
    campaigns: Math.floor(Math.random() * 10),
    dateOfCreation: moment()
  }
}

export const getCompaniesMock = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  listParams: ListRequestParams
): Promise<GetCompaniesResponse> => {
  const result: Company[] = []
  for (let i = 1; i <= 10; i++) {
    result.push(getRandomCompany(i))
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
