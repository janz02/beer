export interface Company {
  id: number
  status: 'active' | 'inactive'
  name: string
  profiles: number
  groups: number
  jobRoles: number
  campaigns: number
  dateOfCreation: moment.Moment
}
