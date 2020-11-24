export interface JobRole {
  id: number
  name: string
  profileCount: number
  groupCount: number
  companyCount: number
  createdDate: moment.Moment
  createdBy: string
}
