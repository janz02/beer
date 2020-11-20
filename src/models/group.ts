import { Company } from './company'

export interface Group {
  id: number
  name: string
  profileCount: number
  companyCount: number
  jobRoleCount: number
  permissionsCount: number
  createdDate: moment.Moment
  createdBy: string
}
