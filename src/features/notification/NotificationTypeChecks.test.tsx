import { NotificationLinkPreValidator } from './NotificationLinkPreValidator'
import { NotificationType } from 'api/coupon-api/models/NotificationType'
import notificationLinks from './notificationLinks.json'
import hungarianTranslations from '../../app/i18n/locales/hu.json'

describe('NotificationType tests', () => {
  it('should have a method for every NotificationType', () => {
    // Arrange
    const preValidator = NotificationLinkPreValidator

    // Act
    const allItemHasTypes = Object.keys(NotificationType)
      .map(k => NotificationType[k as NotificationType])
      .every(e => preValidator[e] !== undefined)

    // Assert
    expect(allItemHasTypes).toBeTruthy()
  })

  it('should have a navigation link for every NotificationType', () => {
    // Arrange
    const links = notificationLinks.map(x => x.type)

    // Act
    const allItemHasLink = Object.keys(NotificationType).every(e => links.includes(e))

    // Assert
    expect(allItemHasLink).toBeTruthy()
  })

  it('should have a hungarian translation for every NotificationType', () => {
    // Arrange
    const translations = Object.keys(hungarianTranslations.enum['notification-type'])
    const translatedStrings = Object.values(hungarianTranslations.enum['notification-type'])

    // Act
    const allItemHasTranslation = Object.keys(NotificationType).every(e => translations.includes(e))
    const allItemIsTranslated = translatedStrings.every(e => e !== '__STRING_NOT_TRANSLATED__')

    // Assert
    expect(allItemHasTranslation).toBeTruthy()
    expect(allItemIsTranslated).toBeTruthy()
  })
})
