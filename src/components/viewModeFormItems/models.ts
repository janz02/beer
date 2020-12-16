export interface ViewModeProps<T> {
  value?: T
  onClick?: Function
  onChange?: Function
  type?: 'text' | 'email' | 'phone' | 'name' | 'date' | 'select' | 'multiselect'
}

export interface ViewModeSelect {
  name: string
  linkTo: string
}
