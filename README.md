# M7

## Description
Web client for the Minute7 application.

## Setup
Install libraries.
```
$ npm install
$ gem install rails
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

## `actions/`

Declare your Redux action constants here.
For simple CRUD actions, use the `SimpleActionGenerator` to quickly generate action names for
your basic CRUD operations as well as the failed, started, and succeeded states.

## `api/`

Code used to interact with the remote API server. You do not need to import this file into any
of your code. If you use the `SimpleActionCreatorGenerator` to generate your action creator,
you will be able to make requests without importing the `Api.js` file directly.

## `apps/`

All app specific components lives in here.

## `components/`

Components that are commonly used in multiple apps live here. Currently, the most commonly used
component is the `Modal` component and the `SimpleForm` component.

The `Modal` component will enable you to render components inside a modal that can be closed or
shown by using functions from the `modalActionCreators`.

The `SimpleForm` component allows you to quickly render forms. Use `ExpenseForm` as an example on
how to render a `SimpleForm`.

## `containers/`
## `mocks/`
## `packs/`
## `reducers/`
## `routes/`
## `selectors/`
## `shapes/`
## `stores/`
## `utils/`
