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
        deviceManager: {
          devices: [
            {
              name: 'Desktop',
              width: '' // default size
            },
            {
              name: 'Mobile',
              width: '320px', // this value will be used on canvas width
              widthMedia: '480px' // this value will be used in CSS @media
            }
          ]
        },
        height: '100%',
        plugins: ['gjs-preset-newsletter'],
        pluginsOpts: {
          'gjs-preset-newsletter': {
            modalTitleImport: 'Import templateeee'
            // ... other options
          }
        },
        components: '<article class="hello">Hello PKM K K user!</article>'
        // style: '.hello{color: red}',
        // plugins: ['gjs-preset-newsletter'],
        // height: '70vh',
        // panels: { defaults: [] }

        // height: '100%',
        // // noticeOnUnload: 0,
        // storageManager: {
        //   autoload: 0
        // },
        // assetManager: {
        //   // assets: images,
        //   upload: 0,
        //   uploadText: 'Uploading is not available in this demo'
        // },
        // // container : '#gjs',
        // fromElement: true,
        // plugins: ['gjs-preset-newsletter'],
        // pluginsOpts: {
        //   'gjs-preset-newsletter': {
        //     modalLabelImport: 'Paste all your code here below and click import',
        //     modalLabelExport: 'Copy the code and use it wherever you want',
        //     codeViewerTheme: 'material',
        //     // defaultTemplate: templateImport,
        //     importPlaceholder:
        //       '<table class="table"><tr><td class="cell">Hello world!</td></tr></table>',
        //     cellStyle: {
        //       'font-size': '12px',
        //       'font-weight': 300,
        //       'vertical-align': 'top',
        //       color: 'rgb(111, 119, 125)',
        //       margin: 0,
        //       padding: 0
        //     }
        //   }
        // }
        // // pluginsOpts: {
        // // 'gjs-preset-newsletter': {
        // // modalTitleImport: 'Import template',
        // // ... other options
        // // fullScrBtnTitle: 'FullyScreen',
        // // cmdBtnDesktopLabel: 'Desktopyyy'
        // // }
        // // }
        // // blockManager: {
        // //   appendTo: '#blocks',
        // //   height: '70vh',
        // //   blocks: [
        // //     {
        // //       id: 'section', // id is mandatory
        // //       label: '<b>Section</b>', // You can use HTML/SVG inside labels
        // //       attributes: { class: 'gjs-block-section' },
        // //       content: `<section>
        // //         <h1>This is a simple title</h1>
        // //         <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
        // //       </section>`
        // //     },
        // //     {
        // //       id: 'text',
        // //       label: 'Text',
        // //       content: '<div data-gjs-type="text">Insert your text here</div>'
        // //     },
        // //     {
        // //       id: 'image',
        // //       label: 'Image',
        // //       // Select the component once it's dropped
        // //       select: true,
        // //       // You can pass components as a JSON instead of a simple HTML string,
        // //       // in this case we also use a defined component type `image`
        // //       content: { type: 'image' },
        // //       // This triggers `active` event on dropped components and the `image`
        // //       // reacts by opening the AssetManager
        // //       activate: true
        // //     }
        // //   ]
        // // }
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
