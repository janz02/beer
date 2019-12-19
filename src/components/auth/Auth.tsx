import React, { useState, useMemo } from 'react'
import { Card, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { LoginForm } from './LoginForm'
import { SignupForm } from './SignupForm'
import { PasswordRecoveryForm } from './PasswordRecoveryForm'
import './Auth.scss'

enum AuthFormView {
  RECOVERY = 'forgot-password',
  SIGNUP = 'signup',
  LOGIN = 'login'
}

export const Auth = () => {
  
  const { t } = useTranslation()

  const [view, setView] = useState<AuthFormView>(AuthFormView.LOGIN)

  const otherAuthFormButtons = useMemo(() => Object.keys(AuthFormView)
    .map(v => (AuthFormView as any)[v])
    .filter(v => v !== view)
    .map(v => <Button
      key={v}
      size="small"
      type={v === AuthFormView.RECOVERY ? 'link' : 'default'}
      onClick={() => setView(v)}
    >{t(`auth.${v}`)}</Button>), [view, t])


  return (
    <div className='auth-component' >
      <Card title={t(`auth.${view}`)} className='auth-card'>
        {view === AuthFormView.LOGIN && <LoginForm />}
        {view === AuthFormView.SIGNUP && <SignupForm />}
        {view === AuthFormView.RECOVERY && <PasswordRecoveryForm />}
        <div className="auth-card__option-buttons">
          {otherAuthFormButtons}
        </div>
      </Card>
    </div>
  )
}
