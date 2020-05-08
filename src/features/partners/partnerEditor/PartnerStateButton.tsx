import React, { FC, useState, useMemo } from 'react'
import { PartnerState } from 'api/swagger/models'
import { useTranslation } from 'react-i18next'
import { Button } from 'antd'
import { useSelector } from 'hooks/react-redux-hooks'
import { RootState } from 'app/rootReducer'
import { setPartnerState } from './partnerEditorSlice'
import { GenericPopup, PopupType, PopupState } from 'components/popups/GenericPopup'
import { PartnerContact } from 'models/partnerContact'

interface PartnerStateButtonState {
  visible: boolean
  buttonLabel?: string
  popupContent?: {
    popupType: PopupType
    targetState: PartnerState
  }
}

export const PartnerStateButton: FC = () => {
  const { t } = useTranslation()

  const { partner, loadingState } = useSelector((state: RootState) => state.partnerEditor)

  const [popupState, setPopupState] = useState<PopupState<PartnerContact>>()

  const config = useMemo<PartnerStateButtonState>(() => {
    switch (partner?.partnerState) {
      case PartnerState.Active:
        return {
          visible: true,
          buttonLabel: t('common.inactivate'),
          popupContent: {
            popupType: 'inactivate',
            targetState: PartnerState.Inactive
          }
        }
      case PartnerState.Inactive:
        return {
          visible: true,
          buttonLabel: t('common.activate'),
          popupContent: {
            popupType: 'activate',
            targetState: PartnerState.Active
          }
        }
      default:
        return {
          visible: false
        }
    }
  }, [partner, t])

  return (
    <>
      <Button
        hidden={!config.visible}
        loading={loadingState}
        size="large"
        onClick={() => setPopupState({ popupVisible: true })}
      >
        {config.buttonLabel}
      </Button>
      {config.popupContent && (
        <GenericPopup
          type={config.popupContent.popupType}
          id={partner?.id}
          visible={!!popupState?.popupVisible}
          onCancel={() => setPopupState({ popupVisible: false })}
          onOkAction={setPartnerState(partner?.id!, config.popupContent.targetState)}
          afterClose={() => setPopupState(null)}
        >
          <div>{partner?.name}</div>
        </GenericPopup>
      )}
    </>
  )
}
