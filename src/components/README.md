# Components

Components placed in this folder are highly used building blocks of the application.
If there are any new component that will be used up as a base of another components or as an element of the page, they should be placed here for further reuse.

Don't forget: we use ant design component library for the design, this should be the starting pont for creating a new reusable component. Browse at [Ant Design page](https://ant.design/components/overview/).

</br>

# Best practices

There are some best practices to keep the components clean, maintainable and reusable.
Besides the react redux specific guidelines written here, keep in mind the Clean code principles (some of them also mentioned here).
To learn even more, visit the [Features Readme](../features/README.md) or this [React best practices post](https://www.codeinwp.com/blog/react-best-practices/)

</br>

## File placement
Keep all files relating to any one component in a single folder, including styling files.

Add the same name to the style file as well.For example:

../responsive/
- ResponsiveCard.SCSS
- ResponsiveCard.TSX

It’s a good practice to name a component after the function that it executes so that it’s easily recognizable.


## Formatting

The format of the components should look like this:

```js
interface MomentDisplayProps { //define props interface on top
  date?: moment.Moment
}

export const MomentDisplay: React.FC<MomentDisplayProps> = props => {//File and component names are the same
  const { date } = props //extract the prop values
  const { i18n } = useTranslation() //hooks for logic

  date.locale(i18n.language)  //minimal logic

  return ( // display logic
    ...
  );
}
```

## Move logic to reducers

* Wherever possible, try to put as much of the logic for calculating a new state into the appropriate reducer, rather than in the code that prepares and dispatches the action

* Move complex synchronous or async logic outside components into thunks.

* If a component does not own a property, then that property should not influence its state. Add it in props instead


## Single responsibility 

* Keep components small and function-specific

* Function-specific components can be standalone, which makes testing and maintenance easier.

* If the component becomes huge, unwieldy and difficult to maintain, it’s better to break it up into as many smaller components as required.

* Reuse instead of creating a new component.

## Pass html attributes as props to spread

```js
export const ResponsiveCard: FC<ResponsiveCardProps> = props => {
  const {
    ResponsiveCardProps,
    **...rest**
  } = props
```
usage:
```js
      <Card
        {...rest}
        />
```
