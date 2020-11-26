import { ProfileStatus } from 'api/swagger/admin'

export interface Profile {
  id: number
  status: ProfileStatus
  name: string
  userName: string
  email: string
  birthDay: moment.Moment
  createdDate: moment.Moment
  phoneNumber: string
  groupCount: number
  permissionCount: number
  companyId: number
  companyName: string
  jobRoleId: number
  jobRoleName: string
}
