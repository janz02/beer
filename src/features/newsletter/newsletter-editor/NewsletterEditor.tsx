import React, { FC, useEffect, useRef, useState } from 'react'
import './NewsletterEditor.scss'
import { useTranslation } from 'react-i18next'
import locale from './locale'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import grapesjs from 'grapesjs'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import grapesjsNewsLetter from 'grapesjs-preset-newsletter'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import grapesjsIndexxeddb from 'grapesjs-indexeddb'
import { GenericPopup } from 'components/popups/GenericPopup'

enum CMD {
  // used as locale key and cmd string
  SaveTemplate = 'pkm-save-template',
  RevertTemplate = 'pkm-revert-template'
}

export interface NewsletterEditorProps {
  id?: string
  template?: string
  handleSave?: (template: string, afterSave: () => void) => void
  handleRevert?: () => void
  handleExit?: () => void
}

export const NewsletterEditor: FC<NewsletterEditorProps> = props => {
  const { id, handleSave, handleRevert, handleExit } = props
  const template = props?.template ?? ''

  const { i18n } = useTranslation()
  const [visibleDiscardPopup, setVisibleDiscardPopup] = useState(false)
  const [templateModified, setTemplateModified] = useState(false)
  const storageId = `gjs-pkm-${id ?? ''}`

  const editor = useRef<any>()

  useEffect(() => {
    const translations = { en: (locale as any)[i18n.language] }

    console.log('RENDER')

    editor.current = grapesjs.init({
      // TODO: consider removing db, giving db id
      container: '#grapesjs',
      storageManager: {
        type: 'indexeddb',
        id: storageId,
        autoload: true
      },
      height: '100%',
      plugins: [grapesjsNewsLetter, grapesjsIndexxeddb],
      pluginsOpts: {
        [grapesjsIndexxeddb]: {
          dbName: storageId
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
    editor.current.on('update', () => {
      setTemplateModified(true)
    })
    editor.current.Commands.add(CMD.SaveTemplate, {
      run: (editor: any) => {
        handleSave &&
          handleSave(editor.runCommand('gjs-get-inlined-html'), () => setTemplateModified(false))
      }
    })
    editor.current.Commands.add(CMD.RevertTemplate, {
      run: () => {
        handleRevert && handleRevert()
      }
    })
    editor.current.Panels.addButton('options', [
      {
        id: CMD.SaveTemplate,
        className: 'fa fa-save',
        command: (editor: any) => {
          editor.runCommand(CMD.SaveTemplate)
        }
      },
      {
        id: CMD.RevertTemplate,
        className: 'fa fa-history',
        command: (editor: any, sender: any) => {
          editor.runCommand(CMD.RevertTemplate)
        }
      },
      {
        id: 'pkm-download-as-html',
        className: 'fa fa-file-text',
        command: (editor: any) => {
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
      },
      {
        id: 'close-editor',
        className: 'fa fa-close',
        command: () => {
          if (templateModified) {
            setVisibleDiscardPopup(true)
          } else {
            handleExit && handleExit()
          }
        }
      }
    ])
  }, [handleRevert, handleSave, i18n.language, template, storageId, templateModified, handleExit])

  useEffect(() => {
    if (editor.current) {
      editor.current.setComponents(template)
    }
  }, [template, i18n.language])

  return (
    <>
      <div className="newsletter-editor-containter">
        <div id="grapesjs" />
      </div>
      <GenericPopup type="discard" />
      <GenericPopup
        type="discard"
        visible={visibleDiscardPopup}
        onOk={handleExit}
        onCancel={() => setVisibleDiscardPopup(false)}
      />
    </>
  )
}
