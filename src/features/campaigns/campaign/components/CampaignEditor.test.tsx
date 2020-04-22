import React from 'react'
import { CampaignEditor, CampaignEditorProps } from './CampaignEditor'
import { setupStore, setupUseParams } from '../../../../../config/setupMocks'
import { shallow } from 'enzyme'

describe('CampaignEditor tests', () => {
  it('should not display button when not editing or not new', () => {
    // Arrange
    const props: CampaignEditorProps = {
      editing: false
    }
    setupStore({ coupons: { categories: [] } })
    setupUseParams({ editing: false })

    // Act
    const wrapper = shallow(<CampaignEditor {...props} />)

    // Assert
  })
})
