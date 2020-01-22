import React from 'react'
import EnLogo from 'assets/img/flags/en.svg'
import HuLogo from 'assets/img/flags/hu.svg'
import { Dropdown, Menu } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import './LanguageSelector.scss'

interface LanguageSelectorProps {
  menuClosed?: boolean
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = props => {
  const { t, i18n } = useTranslation()

  const changeLanguage = (lng: string): void => {
    localStorage.setItem('selectedLanguage', lng)
    i18n.changeLanguage(lng)
  }

  const availableLanguages = [
    {
      key: 'en',
      image: EnLogo,
      label: t('languages.en')
    },
    {
      key: 'hu',
      image: HuLogo,
      label: t('languages.hu')
    }
  ]

  const languageOptions = (
    <Menu key="language" className="language-selector-dropdown-content">
      {availableLanguages.map(({ image, key, label }) => (
        <Menu.Item key={key} onClick={() => changeLanguage(key)}>
          <img
            src={image}
            alt={label}
            title={label}
            className="language-selector-dropdown-content__image"
          />
          <span className="language-selector-dropdown-content__text">{label}</span>
        </Menu.Item>
      ))}
    </Menu>
  )

  const CurrentLanguageImg = (): JSX.Element | null => {
    const currentLanguage = availableLanguages.find(({ key }) => key === i18n.language)

    if (!currentLanguage) {
      return null
    }

    return (
      <img
        src={currentLanguage.image}
        alt={currentLanguage.label}
        title={currentLanguage.label}
        className="language-selector__image"
      />
    )
  }

  return (
    <Dropdown
      className={`language-selector ${props.menuClosed ? 'menu-collapsed' : ''}`}
      overlay={languageOptions}
      trigger={['click']}
    >
      <div>
        <CurrentLanguageImg />
        {props.menuClosed || (
          <>
            <span className="language-selector__text">{t('languages.language')}</span>
            <DownOutlined />
          </>
        )}
      </div>
    </Dropdown>
  )
}
