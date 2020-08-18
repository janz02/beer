# Localization
>"For spreading coupons worldwide"

*-Ghandi*
  </br>
    </br>

## I18n

I18n is an internationalization framework that provides the capability of dynamically changing a site's language
and makes easier to add additional languages to our project. The initial set up is in the *../index.ts* file.
[i18n website](https://react.i18next.com/) for further readings.
  </br>
    </br>

## Moment.js for date localization

 Framework for date, time and timespan handling and localization.
 The initial set up is in the *../index.ts* and the *../moment-locale/index.ts* files.
 The translation of the dates are in the *../moment-locale* directory.
Take a [moment](https://momentjs.com/) to check this website.

The date types of the DTOs are transformed to the **moment.Moment** type:
```
import moment from 'moment'

const startDate = moment(dto.startDate)
```

Usage/display
```
 <MomentDisplay date={value} />
 ```

  </br>
  </br>

## Locales

Currently we have two available languages, **english** and **hungarian**. 
Their dictionaries found in the *../locales* directory and are in a valid json format.

The filname should be the two-letter iso code of the locale.
Theese files are generated, only the translations are provided manually.

No duplicate keys are allowed. Unused keys will be removed by the i18next-scanner (see below).

Example
```
  "app": {
    "title": "Plus Campaign Engine"
  },
  ```

The translated text will be available in dot separated stringified key:
```
  t('app.title')
  ```
  </br> 

## i18next-scanner

To make the translations consistent and ordered, i18next-scanner is also available in the project.
It will scan through all .ts and .tsx files to check their used translations.
Unused translations in the locales will be removed, while new ones will be added and ordered.
The new, missing values will be added as *__STRING_NOT_TRANSLATED__*.

Usage
```
npm run i18n:generate
```

Configuration
</br>
*./config/i18next-scanner:config.js*

</br>

### **In components**
```
import { useTranslation } from 'react-i18next'
```

use the useTranslation hook in the root of the component function
```
const { t } = useTranslation()
```

The key of the resource will be the parameter of the hooked t() function.
```
  t('app.title')
```
  </br>
  
### **With interpolation**

Additional parameters can be added to the translation in json format, that can be referenced with
the parameter name in double brackets {{parameter}}. 
</br>
More usage examples can be found at [i18n interpolation page](https://www.i18next.com/translation-function/interpolation).



```
 t('error.common.max-length-exact', { max })
```
*en.json*
```
 {
  "error":{
    "common": {
      "max-length-exact": "This field must be less then {{max}} characters."
    }
  }
 }
```

  </br>

### **Data model interpolation**
 ```
 const user = {
   name: "Will Smith",
   username: "wsmith"
 };

 t('welcome.title', {user})

```
*en.json*
```
 {
   "welcome" :
   {
     title: "Welcome back, {{user.name}}"
   }
 }
```

  </br>

 
### **Plural/singular versions**

The default version is the singular term in every translation.
To provide a plural trasnlation as well, a **count** parameter must be added for interpolation.
The plural key must end with _plural in the dictionaries.
```
t('key', {count: 1}); // - "item"
t('key', {count: 5}); // - "items"
```

*en.json*
```
{
  "key": "item",
  "key_plural": "items"
}
```

The count parameter can be used in the translations as well, or we can add addtional parameters too.
  </br>  </br>

## BackEnd generated code

The BackEnd provides their side of translations for validation messages and enums via Swagger.
The *generate-backend-translation-keys* npm script pulls the actual translations from the dev environment, 
and will be saved to the *backend-generated-enum-codes.ts* and *..-error-codes.ts* files like the following:

```
i18n.t(key)
```

The saved keys will be references to the localization, so the i18next-scanner *(see above)*
can add the new translation keys to the locales. The new additions needs to be translated.
This usage is needed, otherwise the scanner will remove them as they are not present in any of the other files.

There are some enums that the swagger does not provide, so they needs to be added to the *backend-manual-enum-codes.ts*

Usage
```
npm run generate-backend-translation-keys
```
  </br>

## Language change

The language selector is available in the login page and the main menu left navbar as well.
It is controlled by the **LanguageSelector** component that renders a select list with the available
languages to choose from. As the result of the selection, the i18n and moment language change
function will be called. Every component that hooks the i18n UseTranslation() will be rerendered.
The selected language will be also stored to the **localStorage** as *selectedLanguage*.
  </br>  </br>

## Adding a new language

* Add the 2-letter language code to the *./config/i18next-scanner.config.js*  lngs array.
* Generate the new locale file via *npm run i18n:generate*. 
* Fill out the missing translations for the generated locale.
* Setup the new locale to the *../index.ts* file: import the generated file and add it to the resources.
* Find, download and add the moment localization to the moment-locale directory [from its github](https://github.com/moment/moment/tree/develop/locale)
* Setup the moment-locale to the *../moment-locale/index.ts* file: import and use.
* Update the *App.tsx* file. Import the needed Ant Locale and include it to the language switch.
* Update the *./src/components/LanguageSelector.tsx*
  * Import a flag picture the the *./src/assets/img/flags/xy.svg*
  * Update the availableLanguages array. A new locale key is needed for the label. *languages.xy*
  * Provide translation for the newly added label. Add the key manually, or generate with the *i18n:generate* script.
