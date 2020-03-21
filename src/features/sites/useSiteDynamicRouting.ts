import { useMemo } from 'react'
import { useParams } from 'hooks/react-router-dom-hooks'
import { useSelector } from 'hooks/react-redux-hooks'
import { RootState } from 'app/rootReducer'
import { useTranslation } from 'react-i18next'

interface SiteDynamicRoute {
  root: string
  exit: string
}

interface SiteDynamicLabel {
  title: string
}

interface UseSiteDynamicRoutingUtils {
  route: SiteDynamicRoute
  label: SiteDynamicLabel
}

export const useSiteDynamicRouting = (): UseSiteDynamicRoutingUtils => {
  const { t } = useTranslation()
  const { partnerId } = useParams()
  const { pathname } = useSelector((state: RootState) => state.router.location)
  const { partner } = useSelector((state: RootState) => state.partnerEditor)

  const utils: UseSiteDynamicRoutingUtils = useMemo(() => {
    if (pathname.startsWith('/partners') && partnerId) {
      console.log({ partner })

      return {
        route: {
          root: `/partners/${partnerId}/site`,
          exit: `/partners/${partnerId}`
        },
        label: {
          title: t('partner.site.editor-title')
        }
      }
    }
    return {
      route: {
        root: `/sites/editor`,
        exit: '/sites'
      },
      label: {
        title: t('site.editor-title')
      }
    }
  }, [partner, partnerId, pathname, t])

  return utils
}
