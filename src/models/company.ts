export interface Company {
  id: number
  isActive?: boolean | null
  name: string
  profileCount: number
  groupCount: number
  jobRoleCount: number
  campaignCount: number
  createdDate: moment.Moment
}
