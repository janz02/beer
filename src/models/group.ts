import { Company } from './company'

export interface Group {
  id: number
  name: string
  companyCount: number
  jobRoleCount: number
  permissionCount: number
  createdAt: moment.Moment
  createdBy: string
}
