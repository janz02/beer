import { useReducer } from 'react'

interface FileValidatorState {
  fields: string[]
  fieldErrors: any[]
}

const initialState: FileValidatorState = {
  fields: [],
  fieldErrors: []
}

const reducer = (
  state: FileValidatorState,
  action: { type: string; payload: any }
): FileValidatorState => {
  switch (action.type) {
    case 'add_error':
      return {
        ...state,
        fieldErrors: [...state.fieldErrors, action.payload]
      }
    case 'remove_error':
      return {
        ...state,
        fieldErrors: [
          ...state.fieldErrors.filter(fieldError => fieldError.name !== action.payload.name)
        ]
      }

    default:
      throw new Error()
  }
}

const pictureDimensionError = 'Nem jó kép dimenzió'
const tooBigFIleError = 'Túl nagy fájl méret'
const notSupportedExtensionError = 'Nem megfelelő fájl kiterjesztés'

export const useFileValidatorUtils = (
  fields: string[] = []
): {
  setError: (fieldName: string, type: 'dimension' | 'size' | 'extension') => void
  removeError: (fieldName: string) => void
  getFieldState: (fieldName: string) => string | undefined
} => {
  const [fieldsState, dispatch] = useReducer(reducer, { ...initialState, fields })

  const getErrorMsgByType = (type: string): string => {
    switch (type) {
      case 'dimension':
        return pictureDimensionError
      case 'size':
        return tooBigFIleError
      case 'extension':
        return notSupportedExtensionError
      default:
        return 'Nem kezelt hiba típus'
    }
  }

  const setError = (fieldName: string, type: 'dimension' | 'size' | 'extension'): void =>
    dispatch({ type: 'add_error', payload: { name: fieldName, error: getErrorMsgByType(type) } })

  const removeError = (fieldName: string): void =>
    dispatch({ type: 'remove_error', payload: { name: fieldName } })

  const getFieldState = (fieldName: string): string | undefined => {
    const foundField = fieldsState.fieldErrors.find(field => field.name === fieldName)
    return foundField ? foundField.error : undefined
  }

  return {
    setError,
    removeError,
    getFieldState
  }
}
