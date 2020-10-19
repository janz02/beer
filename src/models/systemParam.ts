import { SystemParameterVm } from 'api/swagger/coupon'

export interface SystemParam extends SystemParameterVm {
  id: number
  name: string
  description?: string
}
