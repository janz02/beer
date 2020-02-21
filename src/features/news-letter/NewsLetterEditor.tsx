import React, { FC, useEffect, useRef } from 'react'
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

export interface NewsLetterEditorProps {
  template?: string
}

export const NewsLetterEditor: FC<NewsLetterEditorProps> = props => {
  const template = props?.template ?? ''

  const { i18n } = useTranslation()

  const editor = useRef<any>()

  const saveTemplate = (newTemplate: any): void => {
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
        id: `${storagePrefix}-`,
        autoload: true
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
        // tried alse ..setLocale + editor.render() -> causes problems in the template
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
      },
      {
        id: 'pkm-download-as-html',
        className: 'fa fa-file-text',
        command: (editor: any, sender: any) => {
          const ee = editor.runCommand('gjs-get-inlined-html')
          const download = (filename: string, text: string): void => {
            const pom = document.createElement('a')
            pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
            pom.setAttribute('download', filename)

            if (document.createEvent) {
              const event = document.createEvent('MouseEvents')
              event.initEvent('click', true, true)
              pom.dispatchEvent(event)
            } else {
              pom.click()
            }
          }
          download('template.html', ee)
        }
      }
    ])
  }, [i18n.language, template])

  useEffect(() => {
    if (editor.current) {
      editor.current.setComponents(template)
    }
  }, [template, i18n.language])

  return (
    <div className="newsletter-editor-containter">
      <div id="grapesjs" />
    </div>
  )
}
