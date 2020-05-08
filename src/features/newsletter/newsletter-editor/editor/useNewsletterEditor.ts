import { useTranslation } from 'react-i18next'
import { useCallback, useEffect, useMemo, useRef } from 'react'
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
      en: (locale as any)[i18n.language]
    }),
    [i18n.language]
  )

  const editor = useMemo(() => {
    if (!template) return
    return grapesjs.init({
      // TODO: consider removing db, giving db id
      container: `#${gjsEditorId}`,
      height: '100%',
      plugins: [grapesjsNewsLetter],
      pluginsOpts: {
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
  }, [gjsEditorId, template, translations])

  const getEditorContent = useCallback(() => {
    if (!editor) return
    return editor.runCommand('gjs-get-inlined-html')
  }, [editor])

  const addStyledTooltips = useCallback(() => {
    // add styled tooltip to titled elements
    // TODO: bug - the block elements are still with title tooltip, remove it
    const tooltipableElements = document.querySelectorAll('*[title][class*="gjs"]')

    // fix. the tooltips at the egde, that are adding extra horizontal by default
    const ttToLeft = [translations.en?.panels?.buttons?.titles?.['open-blocks']]
    const ttToRight = [translations.en?.panels?.buttons?.titles?.deviceDesktop]

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
  }, [editor])

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
