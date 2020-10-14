import '@testing-library/jest-dom'
import React from 'react'
import { FeatureState } from 'models/featureState'
import { Roles } from 'api/swagger/coupon'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route } from 'react-router-dom'
import { useSystemParamsTabUtils } from './useSystemParamsTabUtils'
import { setupPermissions, setupStore, setupUseParams } from '../../../../../config/setupMocks'

jest.mock('app/store')

setupUseParams({ id: 0, tab: 'system-params' })

setupStore({
  systemParams: {
    systemParamsList: [
      {
        key: 'example_key0',
        id: 0,
        value: 'Some string value',
        type: 'text',
        name: 'example_key0 name',
        description: 'example_key0 description'
      },
      {
        key: 'example_key1',
        id: 1,
        value: 50,
        type: 'number',
        name: 'example_key1 name',
        description: 'example_key1 description'
      }
    ],
    listParams: {
      pageSize: 10
    },
    listState: FeatureState.Initial,
    editorState: FeatureState.Initial
  }
})

const SystemParamsTabContent: React.FC = () => {
  return (
    <MemoryRouter>
      <Route>{useSystemParamsTabUtils().tabContent}</Route>
    </MemoryRouter>
  )
}

const SystemParamsHeaderContent: React.FC = () => {
  return (
    <MemoryRouter>
      <Route>{useSystemParamsTabUtils().headerOptions}</Route>
    </MemoryRouter>
  )
}

test('SystemParamsTab should contain keys from store', () => {
  setupPermissions([Roles.Administrator])

  render(<SystemParamsTabContent />)

  expect(screen.getByText(/example_key0 name/)).toBeInTheDocument()
  expect(screen.getByText(/example_key1 name/)).toBeInTheDocument()
})
