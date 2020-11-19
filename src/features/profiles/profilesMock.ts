import { ProfileStatus } from 'api/swagger/admin'
import { ListRequestParams, Pagination } from 'hooks/useTableUtils'
import { Profile } from 'models/profile'
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

const getRandomStatus = (): ProfileStatus => {
  switch (Math.floor(Math.random() * 4)) {
    case 0:
      return ProfileStatus.Active
    case 1:
      return ProfileStatus.InActive
    case 2:
      return ProfileStatus.Declined
    default:
      return ProfileStatus.WaitingForApproval
  }
}

const getRandomProfile = (id: number, status?: ProfileStatus): Profile => {
  const name = getRandomString(10)
  const userName = name.toLowerCase()

  if (!status) {
    status = getRandomStatus()
  }

  return {
    id,
    status,
    name,
    userName,
    email: `${userName}@test.com`,
    groupCount: Math.floor(Math.random() * 10),
    permissionCount: Math.floor(Math.random() * 10),
    createdDate: moment(),
    company: Math.floor(Math.random() * 10),
    companyName: getRandomString(10),
    jobDescription: getRandomString(10)
  }
}

export const getProfilesMock = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  listParams: ListRequestParams
): Promise<GetProfilesResponse> => {
  const status = listParams.status

  const result: Profile[] = []
  for (let i = 1; i <= 10; i++) {
    result.push(getRandomProfile(i, status))
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

export const getExportProfilesCsv = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  listParams: ListRequestParams
): Promise<Blob> => {
  return new Blob([getRandomString(10)])
}
