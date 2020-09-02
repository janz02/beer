# Responsible components

<br>

## What makes a website responsive?

A responsive website can fit on small displays without horizontal scrolling or zooming, only
vertical scrolling is allowed (there could be a few exceptions). The best way to achive this is with
CSS FlexBox or CSS Grids. But in some cases, you may want to have a different DOM based on certain
display sizes, there's the `useIsMobile` hook for that:

```ts
export const Component: React.FC = props => {
  const isMobile = useIsMobile()

  // ...
}
```

The `useIsMobile` hook checks if the display is small with this media quesry:

```css
@media (max-device-width: 575px) {}
```

`max-device-width` won't evaluate to a different result if you resize the browser window, it only
depends on the display. The display size usually doesn't change, but it's affected by the display
settings such as resolution or scaling factor and it can be also changed in the devtools. If it
changes, the `useIsMobile` will cause the component to rerender.

Instead of using `useIsMobile` throughout the code, it's better to define more generic responsive
components like `ResponsiveXYZ` in this folder, so they can be reused.

<br>

## When to use `ResponsiveCard`, `ResponsiveHeader` and `ResponsiveTable`?

* `ResponsiveCard` groups other components together, contains the body of the current page
* `ResponsiveHeader` title of the page
* `ResponsiveTable` has slight modifications to the exiting `Table`.

<br>

## Which components can be added to this folder in the future?

Layout related components that work on any display sizes, e.g. with `useIsMobile`. They can be also
wrapper component around existing components that are not responsive.

<br>

## Examples from the `ResponsiveCard` component

The `useIsMobile` hook is used at the top of the function body:

```ts
export const ResponsiveCard: FC<ResponsiveCardProps> = props => {
  // ...
  const isMobile = useIsMobile()
  
  // ...
}
```

And later you can use the `isMobile` variable to determine which CSS class should be applied to the 
element, e.g. here the `r-card--mobile` class will only be present on small displays:

```tsx
<Card className={
  `r-card ` +
  `${isMobile ? 'r-card--mobile ' : ''}` +
  `${forTable ? 'as-table-wrapper ' : ''}`
}>
```

Another use case could be to use different elements based on `isMobile`, but this is not from the
PKM code:

```tsx
const elementA = <div>...</div>
const elementB = <Something>...</Something>
const finalElement = isMobile ? elementA : elementB
```
