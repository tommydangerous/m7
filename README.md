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
