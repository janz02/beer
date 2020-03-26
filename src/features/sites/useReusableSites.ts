import { useMemo } from 'react'
import { useParams } from 'hooks/react-router-dom-hooks'
import { useSelector, useDispatch } from 'hooks/react-redux-hooks'
import { RootState } from 'app/rootReducer'
import { useTranslation } from 'react-i18next'
import {
  SiteListSliceActions,
  partnerSiteListSlice,
  siteListSlice,
  SiteListState
} from './siteList/siteListSliceFactory'

interface SitesDynamicRoute {
  root: string
  exit: string
}

interface SitesDynamicLabel {
  title: string
}

interface UseReusableSitesUtils {
  route: SitesDynamicRoute
  label: SitesDynamicLabel
  shrinks: boolean
  actions: SiteListSliceActions
  selector: (state: RootState) => SiteListState
}

export const useReusableSites = (): UseReusableSitesUtils => {
  const { t } = useTranslation()
  const { partnerId } = useParams()
  const { pathname } = useSelector((state: RootState) => state.router.location)
  const selfPartnerId = useSelector((state: RootState) => state.auth.userData.partnerId)
  const dispatch = useDispatch()

  const utils = useMemo((): UseReusableSitesUtils => {
    if (pathname.startsWith('/partners') && partnerId) {
      dispatch(partnerSiteListSlice.actions.setListConstraints({ partnerId: +partnerId }))
      return {
        shrinks: true,
        route: {
          root: `/partners/${partnerId}/site`,
          exit: `/partners/${partnerId}`
        },
        label: {
          title: t('partner.site.editor-title')
        },
        actions: partnerSiteListSlice.actions,
        selector: (s: RootState) => s.partnerSiteList
      }
    }
    dispatch(siteListSlice.actions.setListConstraints({ partnerId: selfPartnerId }))
    return {
      shrinks: false,
      route: {
        root: `/sites/editor`,
        exit: '/sites'
      },
      label: {
        title: t('site.editor-title')
      },
      actions: siteListSlice.actions,
      selector: (s: RootState) => s.siteList
    }
  }, [dispatch, partnerId, pathname, selfPartnerId, t])

  return utils
}
