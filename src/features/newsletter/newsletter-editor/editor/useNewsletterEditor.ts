import { useTranslation } from 'react-i18next'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import grapesjs from 'grapesjs'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import grapesjsNewsLetter from 'grapesjs-preset-newsletter'
import { Newsletter } from 'models/newsletter'
import locale from '../locale'
import { useDispatch, useSelector } from 'react-redux'
import {
  newsletterEditorActions,
  NewsletterTemplateContentState as ContentState
} from '../newsletterEditorSlice'
import { RootState } from 'app/rootReducer'
import grapesjsMergeTags from '../plugins/grapesjsMergeTags'
import { api } from 'api'

interface GjsLogger {
  at: string
  event: string
  count: number
  info?: any
}

export interface UseNewsletterEditorProps {
  // id of the div element, which will hold the editor
  gjsEditorId: string
  template: Newsletter | undefined | null
  currentTemplateVersionId?: number
  onEditorLoaded?: () => void
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useNewsletterEditor = (props: UseNewsletterEditorProps) => {
  const { gjsEditorId, template, currentTemplateVersionId, onEditorLoaded } = props
  const { i18n } = useTranslation()
  const dispatch = useDispatch()

  const { templateContentState } = useSelector((s: RootState) => s.newsletterEditor)

  const currentTemplateVersion = useMemo(() => {
    const version = template?.history?.find(h => h?.id === currentTemplateVersionId)
    return version
  }, [currentTemplateVersionId, template])

  const isLatestTemplate = useMemo(() => {
    const newestTemplateVersionId = template?.history?.[0]?.id
    return newestTemplateVersionId === currentTemplateVersionId
  }, [currentTemplateVersionId, template])

  const isNewTemplate = useMemo(() => {
    return !template
  }, [template])

  // const [isTemplateModified, setIsTemplateModified] = useState(false)

  const updateCount = useRef(0)

  // Logger for finding bugs
  const logged = useRef<GjsLogger>({
    count: 0,
    at: '',
    event: ''
  })
  const logger = useCallback(
    (log: GjsLogger) => {
      if (log?.event === logged.current.event) {
        logged.current.count++
      } else {
        if (logged.current.count > 1) {
          dispatch(newsletterEditorActions.logGrapesjsEvent(logged.current))
        }
        dispatch(newsletterEditorActions.logGrapesjsEvent(log))
        logged.current = { ...log }
      }
    },
    [dispatch]
  )

  const translations = useMemo(
    () => ({
      ...(locale as any)[i18n.language]
    }),
    [i18n.language]
  )

  const [staticTagList, setStaticTagList] = useState([])

  useEffect(() => {
    api.campaignEditor.staticMergeTags
      .getStaticMergeTags({ skip: 0, take: -1 })
      .then((res: any) => {
        const mappedTags = res.items.map((tag: any) => ({ id: tag.name, name: tag.name }))
        setStaticTagList(mappedTags)
      })
      .catch(e => console.log(e))
  }, [])

  const editor = useMemo(() => {
    if (!template) return
    return grapesjs.init({
      // TODO: consider removing db, giving db id
      container: `#${gjsEditorId}`,
      height: '100%',
      plugins: [grapesjsNewsLetter, grapesjsMergeTags],
      pluginsOpts: {
        [grapesjsNewsLetter]: {
          // Translations that are not handled by the news letter preset.
          // Update only the locale files, the `en` is a placeholder for all translations.
          ...translations?.preset
        },
        [grapesjsMergeTags]: {
          tagSelectOptions: staticTagList
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
  }, [gjsEditorId, template, translations, staticTagList])

  const getEditorContent = useCallback(() => {
    if (!editor) return
    return editor.runCommand('gjs-get-inlined-html')
  }, [editor])

  const addStyledTooltips = useCallback(() => {
    // add styled tooltip to titled elements
    // TODO: bug - the block elements are still with title tooltip, remove it
    const tooltipableElements = document.querySelectorAll('*[title][class*="gjs"]')

    // fix. the tooltips at the egde, that are adding extra horizontal by default
    const ttToLeft = [translations?.panels?.buttons?.titles?.['open-blocks']]
    const ttToRight = [translations?.panels?.buttons?.titles?.deviceDesktop]

    for (let index = 0; index < tooltipableElements.length; index++) {
      const element = tooltipableElements[index]
      const title = element.getAttribute('title')?.trim()
      if (!title) return
      element.setAttribute('data-tooltip', title)
      if (ttToLeft.includes(title)) {
        element.setAttribute('data-tooltip-pos', 'left')
      } else if (ttToRight.includes(title)) {
        element.setAttribute('data-tooltip-pos', 'right')
      } else {
        element.setAttribute('data-tooltip-pos', 'bottom')
      }
      element.setAttribute('title', '')
    }
  }, [translations])

  useEffect(() => {
    if (!editor) return
    editor.on('load', () => {
      addStyledTooltips()
      onEditorLoaded?.()
      logger({ at: 'load', event: '', count: 1 })
    })
  }, [addStyledTooltips, dispatch, editor, logger, onEditorLoaded])

  useEffect(() => {
    if (!editor) return
    editor.on('update', (event: any) => {
      updateCount.current++
      if (updateCount.current === 2) {
        templateContentState !== ContentState.Modified &&
          dispatch(newsletterEditorActions.setTemplateContentState(ContentState.Modified))
        // setIsTemplateModified(true)
      }
      logger({
        at: 'update',
        event: event ?? '',
        count: 1,
        info: { updateCount: updateCount.current }
      })
    })
    editor.on('run', (event: any, b: any) => {
      logger({ at: 'run', event, count: 1 })
    })
  }, [dispatch, editor, logger, templateContentState])

  useEffect(() => {
    // register buttons
    if (!editor) return
    editor.Panels.addButton('options', [
      {
        id: 'pkm-download-as-html',
        className: 'fa fa-file-text',
        command: (editor: any) => {
          const template = editor.runCommand('gjs-get-inlined-html')
          const download = (filename: string, text: string): void => {
            const el = document.createElement('a')
            el.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
            el.setAttribute('download', filename)

            if (document.createEvent) {
              const event = document.createEvent('MouseEvents')
              event.initEvent('click', true, true)
              el.dispatchEvent(event)
            } else {
              el.click()
            }
          }
          download('template.html', template)
        }
      }
    ])

    // borrowed code sample from grapesjs-preset-newsletter plugin
    // original solution caused form submitting bug with the unset button type
    // Custom code import workaround:
    editor.Panels.removeButton('options', 'gjs-open-import-template')

    editor.Panels.addButton('options', [
      {
        id: 'pkm-import-code',
        className: 'fa fa-download',
        command: (editor: any) => {
          const md = editor.Modal
          const codeViewer = editor && editor.CodeManager.getViewer('CodeMirror').clone()
          const container = document.createElement('div')
          // Init import button
          const btnImp = document.createElement('button')
          btnImp.setAttribute('type', 'button')
          btnImp.className = 'gjs-btn-prim gjs-btn-import'
          btnImp.innerHTML = translations?.preset?.modalBtnImport
          btnImp.onclick = () => {
            const code = codeViewer.editor.getValue()
            editor.DomComponents.getWrapper().set('content', '')
            editor.setComponents(code)
            editor.Modal.close()
          }
          codeViewer.set({
            codeName: 'htmlmixed',
            readOnly: 0
          })

          let viewer = codeViewer.editor
          md.setTitle(translations?.preset?.modalTitleImport)
          // Init code viewer if not yet instantiated
          if (!viewer) {
            const txtarea = document.createElement('textarea')
            container.appendChild(txtarea)
            container.appendChild(btnImp)
            codeViewer.init(txtarea)
            viewer = codeViewer.editor
          }
          md.setContent('')
          md.setContent(container)
          codeViewer.setContent('')
          md.open()
          viewer.refresh()
        }
      }
    ])
  }, [editor, translations])

  useEffect(() => {
    // reload template if editor, template or locale changed
    if (!editor) return
    if (!isLatestTemplate) {
      editor.runCommand('core:preview')
    } else {
      editor.stopCommand('core:preview')
    }
    editor.setComponents(currentTemplateVersion?.content ?? '')
    updateCount.current = 0
    dispatch(newsletterEditorActions.setTemplateContentState(ContentState.Initial))
    // setIsTemplateModified(false)
  }, [currentTemplateVersion, editor, isLatestTemplate, updateCount, dispatch])

  return { getEditorContent, isLatestTemplate, isNewTemplate }
}
