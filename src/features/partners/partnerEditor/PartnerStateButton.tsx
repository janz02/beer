import React, { FC } from 'react'
import { PartnerState } from 'api/swagger/models'
import { useTranslation } from 'react-i18next'
import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import { useSelector } from 'hooks/react-redux-hooks'
import { RootState } from 'app/rootReducer'
import { useDispatch } from 'react-redux'
import { setPartnerState } from './partnerEditorSlice'

export const PartnerStateButton: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { partner, loadingState } = useSelector((state: RootState) => state.partnerEditor)

  const btnConfig: ButtonProps = {
    size: 'large',
    loading: loadingState
  }

  const handleStateChange = (state: PartnerState): void => {
    dispatch(setPartnerState(state))
  }

  switch (partner?.partnerState) {
    case PartnerState.Active:
      return (
        <Button {...btnConfig} onClick={() => handleStateChange(PartnerState.Inactive)}>
          {t('common.inactivate')}
        </Button>
      )
    case PartnerState.Inactive:
      return (
        <Button {...btnConfig} onClick={() => handleStateChange(PartnerState.Active)}>
          {t('common.activate')}
        </Button>
      )
    default:
      return <></>
  }
}
