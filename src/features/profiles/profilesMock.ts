import { ListRequestParams, Pagination } from 'hooks/useTableUtils'
import { Profile } from 'models/profile2'
import moment from 'moment'

interface GetProfilesResponse extends Pagination {
  result: Profile[]
}

const getRandomString = (length: number): string => {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return result
}

const getRandomProfile = (id: number): Profile => {
  const name = getRandomString(10)
  const username = name.toLowerCase()

  return {
    id,
    status: 'active',
    name,
    username,
    email: username + '@test.com',
    groups: Math.floor(Math.random() * 10),
    permissions: Math.floor(Math.random() * 10),
    registrationDate: moment(),
    company: 'company',
    jobDescription: 'job'
  }
}

export const getProfilesMock = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  listParams: ListRequestParams
): Promise<GetProfilesResponse> => {
  const result: Profile[] = []
  for (let i = 1; i <= 10; i++) {
    result.push(getRandomProfile(i))
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
