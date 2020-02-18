import React, { FC, useEffect, useRef } from 'react'
import './NewsLetterEditor.scss'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import grapesjs from 'grapesjs'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import grapesjsNewsLetter from 'grapesjs-preset-newsletter'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import grapesjsIndexxeddb from 'grapesjs-indexeddb'

export interface NewsLetterTemplate {
  html: string | null
  css: string | null
  components: string | null
  style: string | null
}

const defaultTemplate: NewsLetterTemplate = {
  html: `<div>...</div>`,
  css: null,
  components: null,
  style: null
}

export interface NewsLetterEditorProps {
  template?: NewsLetterTemplate
}

export const NewsLetterEditor: FC<NewsLetterEditorProps> = props => {
  const template = props?.template ?? defaultTemplate

  const editor = useRef<any>()

  useEffect(() => {
    const storagePrefix = 'gjs-pkm'

    if (!editor.current) {
      editor.current = grapesjs.init({
        container: '#grapesjs',
        storageManager: {
          type: 'indexeddb',
          id: `${storagePrefix}-`
        },
        height: '100%',
        plugins: [grapesjsNewsLetter, grapesjsIndexxeddb],
        pluginsOpts: {
          [grapesjsIndexxeddb]: {
            dbName: storagePrefix
          }
        }
      })
    }
    return () => {
      indexedDB.deleteDatabase(storagePrefix)
    }
  }, [])

  useEffect(() => {
    if (editor.current) {
      editor.current.setComponents(template?.components || template?.html)
      editor.current.setStyle(template?.style || template?.css)
    }
  }, [template])

  return (
    <div className="newsletter-editor-containter">
      <div id="grapesjs" />
    </div>
  )
}
