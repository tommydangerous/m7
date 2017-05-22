# M7
Web client for the Minute7 application.

## Setup
Install RVM and Rails.
```
$ curl -sSL https://get.rvm.io | bash -s stable --ruby
$ gem install rails
```

Install libraries.
```
$ npm install
$ bundle install
```
Copy contents of `.env.sample` and save into a file named `.env` in the app’s root directory.

## Run development server
This will run Rails server, webpack dev server, and webpack watcher for asset bundling.

```
$ bundle exec foreman start -f Procfile.dev
```

## Deploy
1. Precompile assets
1. Deploy to Heroku

```
$ bundle exec rake assets:precompile RAILS_ENV=production
$ git heroku push master
```

Or
```
$ bin/deploy
```

## Pages
Visit [mobile-v2.minute7.com](http://mobile-v2.minute7.com) in your browser to load the production
application.

1. [Login](http://mobile-v2.minute7.com/login)
1. [Timesheets](http://mobile-v2.minute7.com/timesheets)
1. [Expenses](http://mobile-v2.minute7.com/expenses)

## Technology stack
1. Webpack
1. Rails
1. React
1. Redux

## Frontend Development
React and Redux code lives in the `app/javascript` directory.

The single page app is rendered in `pages/index.html.erb`. On this page, it loads a JavaScript
package from `app/javascript/packs/pages/index.js`.

Each pack file loads an app. In this case, it loads `app/javascript/apps/pages/index/index.jsx`.

## Frontend project structure
All page specific components live inside `app/javascript/apps/[page_name]/[app_name]/`.
For example, the Login page app lives in `app/javascript/apps/sessions/login/`.

Here is a description for all directories under `app/javascript/`:

### `action_creators/`
Functions for interacting with the store.
Use the `SimpleActionCreatorGenerator` to create action creators with base CRUD operations.
Look at the `timesheetActionCreators` as an example on how to use the generator.

### `actions/`
Declare your Redux action constants here.
For simple CRUD actions, use the `SimpleActionGenerator` to quickly generate action names for
your basic CRUD operations as well as the failed, started, and succeeded states.

### `api/`
Code used to interact with the remote API server. You do not need to import this file into any
of your code. If you use the `SimpleActionCreatorGenerator` to generate your action creator,
you will be able to make requests without importing the `Api.js` file directly.

### `apps/`
All app specific components lives in here.

### `components/`
Components that are commonly used in multiple apps live here. Currently, the most commonly used
component is the `Modal` component and the `SimpleForm` component.

The `Modal` component will enable you to render components inside a modal that can be closed or
shown by using functions from the `modalActionCreators`.

The `SimpleForm` component allows you to quickly render forms. Use `ExpenseForm` as an example on
how to render a `SimpleForm`.

### `containers/`
Containers are used to render components with properties from the global store.

### `mocks/`
Helper functions to generate fake data.

### `packs/`
Entry point for single page apps.

### `reducers/`
Redux reducers. Use `SimpleReducerGenerator` to create a basic reducer for all CRUD operations.
See `expenseReducers` as an example on how to generate a reducer.

### `routes/`
React router routes.

### `selectors/`
Helper functions for mapping state to props in components.

### `shapes/`
React prop type shapes.

### `stores/`
Single store for all apps. Also contains functions for interacting with the local storage.
You typically will not need to make any changes to the files in this directory.

### `utils/`
All helper functions that are shared across apps.

## Common Files
### `SimpleReducerGenerator`
This will create a reducer that properly updates the state after any CRUD operation.

Here are the available parameters:
1. `action`: this is required
1. `name`: this is required; it must be pluralized
1. `responseParsers`: if you have custom parsing logic for each CRUD operation, use this parameter
to parse the response from the server
1. `saveParsers`: if you want to parse the payload after the server has already successfully
performed a desired operation, use this parameter to do so
1. `singularName`: if the plural name is difficult to singularize, use this parameter
to explicitly declare the singular name of the resource you are generating a reducer for
1. `states`: you must always include the state argument as the `current` value under the
`states` parameter, if you want to include an initial state and a reset state then you can
add them here as well

```javascript
export default function reducers(state, action) {
  return SimpleReducerGenerator({
    action, // Required
    name: 'expenses', // Required
    // Optional
    responseParsers: {
      create: singleObjectParser,
      index: resp => resp.TimeEntries.map(obj => singleObjectParser(obj)),
      update: singleObjectParser,
    },
    // Optional
    saveParsers: {
      create: singleObjectParser,
      update: singleObjectParser,
    },
    states: {
      current: state, // Required
      initial: INITIAL_STATE, // Optional
      reset: RESET_STATE, // Optional
    },
  });
}
```

## Questions
- Ask in [Slack](https://arcaio.slack.com)
- Email [Tommy Dang](mailto:tommydangerouss@gmail.com)
