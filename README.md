# M7

## Description
Web client for the Minute7 application.

## Development TODOs
- [x] Login UI
- [ ] Login API
- [ ] Expensing UI
- [ ] Expensing API
- [ ] Time tracking UI
- [ ] Time tracking API

## DevOps TODOs
- [ ] Remove ActiveRecord
- [ ] Launch EC2 instance
- [ ] Setup Nginx
- [ ] Setup Puma
- [ ] Deploy to production
- [ ] Use Docker

## Setup
```
$ gem install rails
$ bundle install
```

## Run development server
This will run Rails server, webpack dev server, and webpack watcher for asset bundling.

```
$ bundle exec foreman start -f Procfile.dev
```

## Deploy
1. Precompile assets
1. Deploy master to production server (todo)
1. Run server

```
$ bundle exec rake assets:precompile RAILS_ENV=production
$ bundle exec foreman start
```

## Technology stack
1. Webpack
1. Rails
1. React
1. Redux

## Problems
1. Where to store the signature?
