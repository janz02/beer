import React, { useEffect } from 'react'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { useTranslation } from 'react-i18next'
import { getSegmentations } from './segmentationListSlice'
import { useSegmentationListPage } from './useSegmentationList'
import { useDispatch } from 'react-redux'

export const SegmentationListPage: React.FC = () => {
  const { t } = useTranslation()
  const { headerOptions, tableProps } = useSegmentationListPage()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSegmentations())
  }, [dispatch])

  return (
    <>
      <ResponsiveCard
        floatingTitle={t('segmentation.list.title')}
        floatingOptions={headerOptions}
        forTable
      >
        <ResponsiveTable {...tableProps} />
      </ResponsiveCard>
    </>
  )
}
