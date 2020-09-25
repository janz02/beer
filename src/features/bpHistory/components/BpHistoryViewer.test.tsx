import React from 'react'
import { BpHistoryViewer } from './BpHistoryViewer'
import { mount } from 'enzyme'
import { I18nextProvider } from 'react-i18next'
import i18n from '../../../app/i18n'
import { act } from 'react-dom/test-utils'

const componentTitle = 'Valami'
const componentContent = '<h1>Html content</h1>'

// needed i18next provider because component uses translation hook inside
const BpHistoryViewerComponent: React.FC = () => (
  <I18nextProvider i18n={i18n}>
    <BpHistoryViewer title={componentTitle} content={componentContent} />
  </I18nextProvider>
)

describe('bp history viewer tests', () => {
  it('should render', () => {
    // Act
    const viewer = mount(<BpHistoryViewerComponent />)

    // Assert
    expect(viewer.html()).toBeDefined()
  })

  it('should have title and content', () => {
    // Act
    const viewer = mount(<BpHistoryViewerComponent />)

    // Assert
    expect(viewer.html()).toContain('Valami')
    expect(viewer.html()).toContain('h1')
    expect(viewer.html()).toContain('Html content')
  })

  it('should have subject label in every language in title', () => {
    // Act
    const viewer = mount(<BpHistoryViewerComponent />)

    // Assert
    expect(viewer.html()).toContain(
      i18n.getDataByLanguage('en').translation['bp-history'].modal.title
    )

    // Act
    act(() => {
      i18n.changeLanguage('hu')
    })

    // Assert
    expect(viewer.html()).toContain(
      i18n.getDataByLanguage('hu').translation['bp-history'].modal.title
    )
  })
})
