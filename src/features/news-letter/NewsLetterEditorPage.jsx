import React, { useState, useMemo, useEffect } from 'react'
import 'grapesjs/dist/css/grapes.min.css'
import grapesjs from 'grapesjs'

export const NewsLetterEditorPage = () => {
  const [editor, setEditor] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setEditor(true)
    }, 0)
  }, [])

  const editorGJS = useEffect(() => {
    if (editor) {
      grapesjs.init({
        container: '#gjs',
        plugins: ['gjs-preset-newsletter'],
        pluginsOpts: {
          'gjs-preset-newsletter': {
            modalTitleImport: 'Import template'
            // ... other options
          }
        }
      })
    }
  }, [editor])

  return (
    <>
      <div id="gjs">
        <h1>Hello World Component!</h1>
      </div>
    </>
  )
}
