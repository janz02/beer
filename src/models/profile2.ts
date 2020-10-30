export interface Profile {
  id: number
  status: 'active' | 'inactive' | 'waiting-for-approve'
  name: string
  username: string
  email: string
  groups: number
  permissions: number
  registrationDate: moment.Moment
  company: string
  jobDescription: string
}
