export type ProfileStatus = 'approved' | 'declined' | 'waiting-for-approval'

export interface Profile {
  id: number
  status: ProfileStatus
  name: string
  username: string
  email: string
  group: string
  permissions: number
  dateOfRegistration: moment.Moment
  company: string
  jobRole: string
}
