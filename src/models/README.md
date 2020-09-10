# Models

The model files found in this directory are the View Model representations in the app. They store data of each form and table.


The models needs to be created as interfaces as a best practice, this way they can be (re)used in reducers and slices as well.

Further readings: [Interfaces vs Classes](https://stackoverflow.com/questions/40973074/difference-between-interfaces-and-classes-in-typescript) and
[Redux with TypeScript](https://redux.js.org/recipes/usage-with-typescript).

## DTOs

The Data Transfer Objects are the models for the BackEnd communication.
They are automatically generated from the BE Swagger and are stored in the [models directory](../api/coupon-api/models).

</br>

## Mapping

The Models presented in the layout and DTOs are separated. 
This way, even if the BE model changes, the view does not have to be changed with it.
This solution also has the flexibility for Front End side changes, or providing additional functionality, 
like date localization with `moment.js`.

The mapping can be found in the related features slice, directly in the API call function.

</br>

**Date representation with moment**

The date types of the DTOs are transformed to the `moment.Moment` type, for internationalization purposes:

From DTO to model
```JS
 createdDate: coupon.createdDate && moment(coupon.createdDate),
```

Model to DTO
```JS
startDate: coupon.startDate && coupon.startDate.toDate(),
```

Additional information: [localization readme](../app/i18n/README.MD).
