export interface ViewModeProps<T> {
  value?: T
  onClick?: Function
  onChange?: Function
}

export interface ViewModeInputProps<T> extends ViewModeProps<T> {
  type?: 'text' | 'email' | 'phone' | 'name' | 'date'
}

export * from './input'
export * from './select'
export * from './multiSelect'
