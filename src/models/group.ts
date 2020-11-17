export interface Group {
  id: number
  name: string
  companyCount: number
  jobRoleCount: number
  permissionCount: number
  createdDate: moment.Moment
  creator: string
}
