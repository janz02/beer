# Services

## Why services

A good service/helper method candidate can be any common logic used in multiple places which cannot be placed in a custom hook (stateless) and it doesn't belong to any specific component (isn't tightly coupled to a component).  
A helper method does just one thing, accepts some inputs and returns a value based on that input(s), so helper methods should be [pure](https://en.wikipedia.org/wiki/Pure_function) functions.

## How it's made

- New services/helper method(s) should be placed in a new file or folder.
- **The exported members should be well documented!**
- Use/declare types when possible instead of any.

## Tips

- For documenting a function/type use [JSDoc](https://jsdoc.app/about-getting-started.html) supported by VS Code. Just type `/**` above the function in the editor then it should popup the JSDoc comment, then press `enter`. VS Code shows the JSDoc documentation on [hover](https://code.visualstudio.com/docs/languages/javascript#_hover-information) or it can help for you with function [signatures](https://code.visualstudio.com/docs/languages/javascript#_signature-help) during development.

## Read more

- [JSDoc](https://jsdoc.app/about-getting-started.html)
- JSDoc in [VS Code](https://code.visualstudio.com/docs/languages/javascript#_jsdoc-support)
