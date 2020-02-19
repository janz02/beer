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
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'

export interface NewsLetterTemplate {
  html?: string | null
  css?: string | null
  components?: string | null
  style?: string | null
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

  const { t } = useTranslation()

  const editor = useRef<any>()

  const saveTemplate = (newTemplate: NewsLetterTemplate): void => {
    console.log({ newTemplate, editor: editor.current, cmd: editor.current.Commands.getAll() })
  }

  useEffect(() => {
    const storagePrefix = 'gjs-pkm'

    if (!editor.current) {
      indexedDB.deleteDatabase(storagePrefix)
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
      editor.current.Commands.add('save-template', {
        run: (editor: any, sender: any) => {
          const html = editor.getHtml()
          const css = editor.getCss()
          saveTemplate({ html, css })
        }
      })
      editor.current.Panels.addButton('options', [
        {
          id: 'save-template',
          className: 'fa fa-save',
          attributes: {
            title: t('common.save')
          },
          command: (editor: any, sender: any) => {
            editor.runCommand('save-template')
          }
        }
      ])
    }
    return () => {
      indexedDB.deleteDatabase(storagePrefix)
    }
  }, [t])

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
