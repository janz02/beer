import React, { FC, useEffect, useRef, useState } from 'react'
import './NewsLetterEditor.scss'
import { useTranslation } from 'react-i18next'
import locale from './locale/'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import grapesjs from 'grapesjs'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import grapesjsNewsLetter from 'grapesjs-preset-newsletter'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import grapesjsIndexxeddb from 'grapesjs-indexeddb'

enum CMD {
  // used as locale key and cmd string
  SaveTemplate = 'pkm-save-template'
}

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

  const { t, i18n } = useTranslation()

  const editor = useRef<any>()

  const saveTemplate = (newTemplate: NewsLetterTemplate): void => {
    console.log({
      newTemplate,
      editor: editor.current,
      cmd: editor.current.Commands.getAll(),
      I18n: editor.current.I18n
    })
  }

  useEffect(() => {
    const storagePrefix = 'gjs-pkm'
    const translations = { en: (locale as any)[i18n.language] }

    editor.current = grapesjs.init({
      // TODO: consider removing db, giving db id
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
        },
        [grapesjsNewsLetter]: {
          // Translations that are not handled by the news letter preset.
          // Update only the locale files, the `en` is a placeholder for all translations.
          ...translations.en?.preset
        }
      },
      i18n: {
        // bugfix: The editor.current.I18n.setLocale function is not switching the languege.
        // The locale is kept always as `en` but the translations are switched,
        // and the the editor is reinitialized.
        locale: 'en',
        localeFallback: 'en',
        messages: translations
      }
    })
    editor.current.Commands.add(CMD.SaveTemplate, {
      run: (editor: any, sender: any) => {
        const html = editor.getHtml()
        const css = editor.getCss()
        saveTemplate({ html, css })
      }
    })
    editor.current.Panels.addButton('options', [
      {
        id: CMD.SaveTemplate,
        className: 'fa fa-save',
        command: (editor: any, sender: any) => {
          editor.runCommand(CMD.SaveTemplate)
        }
      }
    ])
  }, [i18n.language, t])

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
