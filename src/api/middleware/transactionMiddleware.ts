import { Middleware, ResponseContext } from 'api/swagger/admin'
import { v4 } from 'uuid'
import { api } from 'api'
import { adminConfig } from '../index'

const appliesToMicroservices: any[] = [process.env.REACT_APP_ADMIN_API_URL]

const shouldApplyMiddleware = (url: string): boolean =>
  appliesToMicroservices.some(ms => url.includes(ms))

const rollback = async (guid: any) => {
  try {
    await api.admin.transaction.rollbackTransaction({ xRTDTransactionGuid: guid })
    // NOTE: we may need to always Promise.reject here, check if Admin MS endpoints are called
    return Promise.reject(
      new Error(
        `Creating or updating the entity failed. Initiated rollback transaction with guid: ${guid}`
      )
    )
  } catch {
    return Promise.reject(new Error(`Transaction rollback failed. Transaction guid: ${guid}`))
  }
}

const commit = async (guid: any) => {
  try {
    await api.admin.transaction.commitTransaction({ xRTDTransactionGuid: guid })
    return Promise.resolve()
  } catch {
    return Promise.reject(new Error(`Transaction commit failed. Transaction guid: ${guid}`))
  }
}

const create = async (guid: any) => {
  try {
    await api.admin.transaction.createTransaction({ xRTDTransactionGuid: guid })
    return Promise.resolve()
  } catch {
    return Promise.reject(new Error(`Transaction create failed. Transaction guid: ${guid}`))
  }
}

export const middleware: Middleware[] = [
  {
    pre: async (ctx: ResponseContext) => {
      if (shouldApplyMiddleware(ctx.url)) {
        const guid = v4()

        ctx.init.headers = {
          ...ctx.init.headers,
          'X-RTD-Transaction-Guid': guid
        }

        if (ctx.init.method !== 'GET') {
          return create(guid)
        }
      } else {
        return Promise.resolve()
      }
    }
  },
  {
    post: async (ctx: ResponseContext) => {
      if (shouldApplyMiddleware(ctx.url) && ctx.init.method !== 'GET') {
        const transactionGuid = (ctx.init.headers as any)['X-RTD-Transaction-Guid']

        if (ctx.response.status >= 400) {
          return rollback(transactionGuid)
        } else if (ctx.response.status >= 200 && ctx.response.status < 400) {
          return commit(transactionGuid)
        }
      } else {
        return Promise.resolve()
      }
    }
  }
]

export const transactionMiddleware = (): void => {
  adminConfig.middleware.push(...middleware)
}
