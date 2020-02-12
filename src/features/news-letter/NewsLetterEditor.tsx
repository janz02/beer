import React, { FC, useEffect } from 'react'
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

  useEffect(() => {
    const storagePrefix = 'gjs-pkm-'
    setTimeout(() => {
      const editor = grapesjs.init({
        container: '#grapesjs',
        storageManager: {
          type: 'indexeddb',
          id: storagePrefix
        },
        height: '100%',
        plugins: [grapesjsNewsLetter, grapesjsIndexxeddb],
        pluginsOpts: {
          'grapesjs-indexeddb': {
            dbName: 'cxxx'
          }
        },
        components: template?.components || template?.html,
        style: template?.style || template?.css
      })
      editor.on('storage:load', function(e: any) {
        console.log('STORAGE:LOAD ', e)
      })
      editor.on('storage:store', function(e: any) {
        console.log('STORAGE:STORE ', e)
      })
      editor.on('storage:error', function(e: any) {
        console.log('STORAGE:ERROR ', e)
      })
      console.log(grapesjsIndexxeddb)
    }, 0)
    return () => {
      indexedDB.deleteDatabase('gjs')
    }
  }, [template])

  return (
    <div className="newsletter-editor-containter">
      <div id="grapesjs" />
      <div id="blocks" />
    </div>
  )
}
