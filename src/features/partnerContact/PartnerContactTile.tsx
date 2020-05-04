import React, { FC } from 'react'
import { PartnerContactList } from './list/PartnerContactList'
import { usePartnerContactTile } from './usePartnerContactTile'
import { PartnerContactEditor } from 'features/partnerContact/modal/editor/PartnerContactEditor'

export const PartnerContactTile: FC = () => {
  const { editorProps, listProps } = usePartnerContactTile()
  return (
    <>
      <PartnerContactList {...listProps} />
      <PartnerContactEditor {...editorProps} />
    </>
  )
}
