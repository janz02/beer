import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSites, deleteSite } from './siteListSlice'
import { RootState } from 'app/rootReducer'
import { history } from 'router/router'
import { SitesList, SitesListProps } from './SitesList'
import { ResponsivePage } from 'components/responsive/ResponsivePage'

export const SitesListPage: FC = () => {
  const dispatch = useDispatch()
  const { sites, listParams, loading } = useSelector((state: RootState) => state.siteList)

  useEffect(() => {
    dispatch(getSites())
  }, [dispatch])

  const sitesListProps: SitesListProps = {
    sites,
    loading,
    listParamsState: listParams,
    getDataAction: getSites,
    handleAdd: () => history.push(`/sites/editor`),
    handleEdit: (id: number) => history.push(`/sites/editor/${id}`),
    deleteAction: deleteSite
  }

  return (
    <ResponsivePage>
      <SitesList {...sitesListProps} />
    </ResponsivePage>
  )
}
