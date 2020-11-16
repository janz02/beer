export type ProfileStatus = 'approved' | 'declined' | 'waiting-for-approval'

export interface ProfileListItem {
  id: number
  status: ProfileStatus
  name: string
  username: string
  email: string
  group: string
  permissions: number
  createdDate: moment.Moment
  company: string
  jobRole: string
}
