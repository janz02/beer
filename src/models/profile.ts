import { ProfileStatus } from 'api/swagger/admin'

export interface Profile {
  id: number
  status: ProfileStatus
  name: string
  userName: string
  email: string
  createdDate: moment.Moment
  groupCount: number
  permissionCount: number
  company: number
  companyName: string
  jobRoleName: string
}
