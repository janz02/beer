import React from 'react'
import { CampaignEditorForm, CampaignEditorFormProps } from './CampaignEditorForm'
import { setupStore, setupUseParams } from '../../../../config/setupMocks'
import { shallow } from 'enzyme'

describe('CampaignEditorForm tests', () => {
  it('should not display button when not editing or not new', () => {
    // Arrange
    const props: CampaignEditorFormProps = {
      editing: false
    }
    setupStore({ coupons: { categories: [] } })
    setupUseParams({ editing: false })

    // Act
    const wrapper = shallow(<CampaignEditorForm {...props} />)

    // Assert
  })
})
