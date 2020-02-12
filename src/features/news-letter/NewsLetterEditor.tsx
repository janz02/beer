import React, { FC, useEffect } from 'react'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import grapesjs from 'grapesjs'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import grapesjsNewsLetter from 'grapesjs-preset-newsletter'
// import grapesjs from 'grapesjs'
import './NewsLetterEditor.scss'

export const NewsLetterEditor: FC = () => {
  useEffect(() => {
    const storagePrefix = 'gjs-pkm-'
    setTimeout(() => {
      grapesjs.init({
        container: '#grapesjs',
        storageManager: {
          id: storagePrefix
        },
        height: '100%',
        plugins: [grapesjsNewsLetter],
        components: '<article class="hello">Hello PKM K K user!</article>'
      })
    }, 0)
    return () => {
      for (const key in localStorage) {
        if (key.startsWith(storagePrefix)) {
          localStorage.removeItem(key)
        }
      }
    }
  }, [])

  return (
    <div className="newsletter-editor-containter">
      <div id="grapesjs" />
      <div id="blocks" />
    </div>
  )
}
