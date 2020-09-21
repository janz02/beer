import { api } from 'api'
import { GetTestGroupCategoriesRequest, TestGroupCategoriesApi } from 'api/swagger/campaign-editor'
import { CouponsApi } from 'api/swagger/coupon'
import { TestGroupCategory } from 'models/testGroupCategory'
import { mocked } from 'ts-jest/utils'
// import moment from 'moment'
// import React from 'react'

jest.mock('api/swagger/campaign-editor', () => {
  return {
    TestGroupCategoriesApi: jest.fn().mockImplementation(() => {
      return {
        getTestGroupCategories: (requestParameters: GetTestGroupCategoriesRequest) => {
          return { items: [] }
        }
      }
    })
  }
})

describe('Valami', () => {
  const MockedTestGroupCategoriesApi = mocked(TestGroupCategoriesApi, true)

  beforeEach(() => {
    // Clears the record of calls to the mock constructor function and its methods
    MockedTestGroupCategoriesApi.mockClear()
  })

  it('We can check if the consumer called the class constructor', () => {
    // const soundPlayerConsumer = new SoundPlayerConsumer();
    expect(MockedTestGroupCategoriesApi).toHaveBeenCalledTimes(1)
  })
})
