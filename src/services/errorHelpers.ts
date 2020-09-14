import i18n from 'app/i18n'
import { notification } from 'antd'
import { RequestError } from 'api/middleware'

/**
 * Displays a (translated) notification for each error in the passed in error object
 * and prints the errors as a table to the console.
 * @param {RequestError} error object containing the errors to display
 * @param {string | undefined} url the url where the error comes from
 */
export const displayBackendError = (error: RequestError, url?: string): void => {
  let errorForLog = {}
  let i = 0
  error.errors?.forEach(errorItem => {
    i++
    let message = errorItem.errorkey ? i18n.t(errorItem.errorkey) : errorItem.message
    // In case it has errorkey but it isn't translated yet use the english message.
    if (message === errorItem.errorkey && errorItem.message) {
      message = errorItem.message
    }
    errorForLog = { ...errorForLog, [i]: message }
    notification.error({
      message,
      duration: null
    })
  })

  console.table({
    url: url,
    code: error.code,
    guid: error.guid,
    stacktrace: error.stacktrace,
    ...errorForLog
  })
}
