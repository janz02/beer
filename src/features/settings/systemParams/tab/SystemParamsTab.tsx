import React from 'react'
import { SystemParamsEditor } from '../editor/SystemParamsEditor'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'

interface TabProps {
  listUtils: any
  editorUtils: any
}

export const SystemParamsTab: React.FC<TabProps> = props => {
  return (
    <>
      <ResponsiveTable hasHeaderOffset {...props.listUtils.tableProps} />
      <SystemParamsEditor
        params={props.editorUtils.editorParams}
        handleExit={props.editorUtils.handleExit}
        afterClose={props.editorUtils.handleAfterClose}
      />
    </>
  )
}
