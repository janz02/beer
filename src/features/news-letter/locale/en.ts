// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import en from 'grapesjs/src/i18n/locale/en'

export default {
  ...(en as Record<string, any>),
  preset: {},
  panels: {
    buttons: {
      titles: {
        'pkm-save-template': 'Save template',
        'pkm-download-as-html': 'Download template file'
      }
    }
  }
}
