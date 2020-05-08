import React, { FC } from 'react'
import { UserAccessList } from './list/UserAccessList'
import { UserAccessEditor } from './editor/UserAccessEditor'

export const UserAccessPage: FC = () => {
  return (
    <>
      <UserAccessList />
      <UserAccessEditor />
    </>
  )
}
