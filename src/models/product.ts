export interface Product {
  id?: number
  name?: string | null
  createdDate?: moment.Moment
  createdBy?: number
  modifiedDate?: moment.Moment
  modifiedBy?: number | null
}
