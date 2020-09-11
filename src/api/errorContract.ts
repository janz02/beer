export interface RequestError {
  code?: number
  errors?: RequestErrorItem[]
  guid?: string | null
  stacktrace?: string | null
}

interface RequestErrorItem {
  errorkey?: string | null
  message?: string | null
}
