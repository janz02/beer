import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { history } from 'router/router'
import { SitesList, SitesListProps } from './SitesList'
import { useReusableSites } from '../useReusableSites'

interface SitesListTileProps {
  hidden?: boolean
}

export const SitesListTile: FC<SitesListTileProps> = props => {
  const { hidden } = props
  const dispatch = useDispatch()

  const { route, alternativeMode, actions, selector } = useReusableSites()
  const { getSites, deleteSite } = actions

  const { sites, listParams, loading } = useSelector(selector)

  useEffect(() => {
    dispatch(getSites({}))
  }, [dispatch, getSites])

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
