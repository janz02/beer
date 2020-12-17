export interface ViewProps<T> {
  value?: T
  hasRightToNavigate?: boolean
}

export interface ViewSelect {
  name: string
  linkTo: string
}

export interface ViewInputProps<T> extends ViewProps<T> {
  type?: 'text' | 'email' | 'phone' | 'name' | 'date'
}

export interface ViewSelectProps<T> extends ViewProps<T> {
  type?: 'select' | 'multiselect'
}
