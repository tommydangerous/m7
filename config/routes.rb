Rails.application.routes.draw do
  root "sessions#login"

  get "login", to: "sessions#login"

  get "test", to: "pages#test"

  resources :expenses, only: :index
  resources :timesheets, only: :index
end
