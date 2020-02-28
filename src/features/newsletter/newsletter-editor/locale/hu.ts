export default {
  preset: {
    // The labels set by newsletter-preset. See `default` in:
    // https://github.com/artf/grapesjs-preset-newsletter/blob/master/src/index.js
    modalTitleImport: 'Sablon importálása',
    modalTitleExport: 'Sablon kódja',
    modalLabelImport: '',
    modalLabelExport: '',
    modalBtnImport: 'Importálás'
  },

  // Only the used labels are translated.
  // example: https://github.com/artf/grapesjs/blob/dev/src/i18n/locale/es.js
  assetManager: {
    addButton: 'Kép hozzáadás',
    inputPlh: 'kép url-je',
    modalTitle: 'Válasz egy képet',
    uploadTitle: 'Húzz ide egy képet!'
  },
  modal: {
    'Import template': 'hello'
  },

  blockManager: {
    labels: {
      sect100: '1 Szelet',
      sect50: '2 Szelet',
      sect30: '3 Szelet',
      sect37: '3/7 Szelet',
      button: 'Gomb',
      divider: 'Osztó',
      text: 'Szöveg sor',
      'text-sect': 'Szöveg szakasz',
      image: 'Kép',
      quote: 'Idézet',
      link: 'Hivatkozás',
      'link-block': 'Hivatkozás szakasz',
      'grid-items': 'Rács elemek',
      'list-items': 'Lista elemek'
    }
  },
  domComponents: {
    names: {
      '': 'Elem',
      // TODO: body is still english, the line bellow doesn't work
      // body: 'test',
      wrapper: 'Burkoló',
      text: 'Szöveg',
      comment: 'Megjegyzés',
      image: 'Kép',
      video: 'Videó',
      label: 'Felirat',
      link: 'Hivatkozás',
      map: 'Térkép',
      tfoot: 'Táblázat lábjegyzék',
      tbody: 'Táblázat test',
      thead: 'Táblázat fejléc',
      table: 'Táblázat',
      row: 'Táblázat sor',
      cell: 'Táblázat cella'
    }
  },
  panels: {
    buttons: {
      titles: {
        preview: 'Előnézet',
        fullscreen: 'Teljes képernyő',
        'sw-visibility': 'Komponens nézet',
        'export-template': 'Kód megtekintése',
        'open-sm': 'Stílus szerkesztő',
        'open-tm': 'Beállítások',
        'open-layers': 'Rétegek',
        'open-blocks': 'Blokkok',
        'gjs-toggle-images': 'Képek',
        deviceTablet: 'Táblagép',
        deviceMobile: 'Telefon',
        deviceDesktop: 'Asztali gép',
        'pkm-save-template': 'Sablon mentése',
        'pkm-download-as-html': 'Sablon fájl letöltése',
        'pkm-restore-template': 'Sablon visszaállítása'
      }
    }
  },
  styleManager: {
    empty: 'Jelölj ki egy komponenst!',
    layer: 'Réteg',
    fileButton: 'Kép',
    sectors: {
      general: 'Általános',
      layout: 'Elrendezés',
      typography: 'Betűk',
      decorations: 'Dekorációk',
      extra: 'Extra',
      flex: 'Flex',
      dimension: 'Méretek'
    },

    properties: {
      // dimension panel
      width: 'Szélesség',
      height: 'Magasság',
      'max-width': 'Max. Szélesség',
      'min-height': 'Min. Magasság',
      margin: 'Margó',
      'margin-top': 'Felső',
      'margin-right': 'Jobb',
      'margin-left': 'Bal',
      'margin-bottom': 'Alsó',
      padding: 'Kitöltés',
      'padding-top': 'Felső',
      'padding-right': 'Jobb',
      'padding-left': 'Bal',
      'padding-bottom': 'Alsó',

      // letter panel
      'font-family': 'Betűtípus',
      'font-size': 'Betűméret',
      'font-weight': 'Betűvastagság',
      'letter-spacing': 'Betűköz',
      color: 'Szín',
      'line-height': 'Sormagasság',
      'text-align': 'Szöveg igazitása',
      'text-shadow': 'Szöveg árnyék',
      'text-shadow-h': 'Vizszintes',
      'text-shadow-v': 'Függőleges',
      'text-shadow-blur': 'Elhomályosítás',
      'text-shadow-color': 'Szín',

      // decorations panel
      'background-color': 'Háttérszín',
      'border-collapse': 'Összevont szegély',
      'border-radius': 'Szegély lekerekítés',
      'border-top-left-radius': 'Bal felső',
      'border-top-right-radius': 'Jobb felső',
      'border-bottom-left-radius': 'Bal alsó',
      'border-bottom-right-radius': 'Jobb alsó',
      border: 'Szegély',
      'border-width': 'Vastagság',
      'border-style': 'Stílus',
      'border-color': 'Szín',
      background: 'Háttér',
      'background-image': 'Háttérkép',
      'background-repeat': 'Ismétlés',
      'background-position': 'Pozíció',
      'background-attachment': 'Melléklet',
      'background-size': 'Méret'
    }
  },
  traitManager: {
    empty: 'Válasz ki egy komponenst!',
    label: 'Komponens beállítások',
    traits: {
      labels: {
        id: 'Azonosító',
        title: 'Név'
      }
    }
  }
}
