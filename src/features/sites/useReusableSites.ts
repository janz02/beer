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
  alternativeMode: boolean
  actions: SiteListSliceActions
  selector: (state: RootState) => SiteListState
}

export const useReusableSites = (): UseReusableSitesUtils => {
  const { t } = useTranslation()
  const { partnerId } = useParams()
  const { pathname } = useSelector((state: RootState) => state.router.location)
  const dispatch = useDispatch()

  const utils: UseReusableSitesUtils = useMemo(() => {
    if (pathname.startsWith('/partners') && partnerId) {
      const actions = partnerSiteListSlice.actions
      dispatch(actions.setListConstraints({ partnerId: +partnerId }))
      return {
        alternativeMode: true,
        route: {
          root: `/partners/${partnerId}/site`,
          exit: `/partners/${partnerId}`
        },
        label: {
          title: t('partner.site.editor-title')
        },
        actions,
        selector: (s: RootState) => s.partnerSiteList
      }
    }
    return {
      alternativeMode: false,
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
  }, [dispatch, partnerId, pathname, t])

  return utils
}
