# M7

## Description
Web client for the Minute7 application.

## Todos
- [ ] `gem "bitters"`
- [ ] `gem "bootstrap-sass"`
- [ ] `gem "bourbon"`
- [ ] `gem "flutie"`
- [ ] `gem "font-awesome-rails"`
- [ ] `gem "refills"`
- [ ] Uncomment lines in `application.scss`
- [ ] Uncomment lines in `_media_queries.scss`
- [ ] Uncomment lines in `_responsiveness.scss`

## Todos
- [ ] Remove ActiveRecord
- [ ] Launch EC2 instance
- [ ] Setup Nginx
- [ ] Setup Puma
- [ ] Deploy to production
- [ ] Login
- [ ] Expensing
- [ ] Time tracking
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

## Technology stack
1. Webpack
1. Rails
1. React
1. Redux

## Deploy
1. Precompile assets
1. Deploy master to production server (todo)
1. Run server

```
$ bundle exec rake assets:precompile RAILS_ENV=production
$ bundle exec foreman start
```
