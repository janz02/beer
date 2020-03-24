import React, { FC, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSites, deleteSite, setSitesListConstraints, resetSiteList } from './siteListSlice'
import { RootState } from 'app/rootReducer'
import { history } from 'router/router'
import { SitesList, SitesListProps } from './SitesList'
import { useParams } from 'react-router-dom'
import { useSiteDynamicRouting } from '../useSiteDynamicRouting'

interface SitesListTileProps {
  hidden?: boolean
}

export const SitesListTile: FC<SitesListTileProps> = props => {
  const { hidden } = props
  const { partnerId } = useParams()
  const dispatch = useDispatch()
  const { sites, listParams, loading } = useSelector((state: RootState) => state.siteList)

  const { route, alternativeMode } = useSiteDynamicRouting()

  const listConstraints = useMemo(() => (partnerId ? { partnerId } : {}), [partnerId])

  useEffect(() => {
    dispatch(setSitesListConstraints(listConstraints))
    if (partnerId && isNaN(+partnerId)) return
    dispatch(getSites({}))
  }, [dispatch, listConstraints, partnerId])

  useEffect(() => {
    return () => {
      dispatch(resetSiteList())
    }
  }, [dispatch])

  const sitesListProps: SitesListProps = {
    cardProps: {
      disableAutoScale: alternativeMode
    },
    hidden,
    sites,
    loading,
    listParamsState: listParams,
    getDataAction: getSites,
    handleAdd: () => history.push(route.root),
    handleEdit: (id: number) => history.push(`${route.root}/${id}`),
    deleteAction: deleteSite
  }

  return <SitesList {...sitesListProps} />
}
