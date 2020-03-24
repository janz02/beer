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
  const { getList, deleteItem } = actions
  const { sites, listParams, loading } = useSelector(selector)

  useEffect(() => {
    dispatch(getList({}))
  }, [dispatch, getList])

  const sitesListProps: SitesListProps = {
    cardProps: {
      disableAutoScale: alternativeMode
    },
    hidden,
    sites,
    loading,
    listParamsState: listParams,
    getDataAction: getList,
    handleAdd: () => history.push(route.root),
    handleEdit: (id: number) => history.push(`${route.root}/${id}`),
    deleteAction: deleteItem
  }

  return <SitesList {...sitesListProps} />
}
