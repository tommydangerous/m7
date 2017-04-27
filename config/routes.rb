Rails.application.routes.draw do
  root "pages#index"

  get "login", to: "sessions#login"
  post "login", to: "sessions#login"
  get "logout", to: "sessions#logout"

  get "test", to: "pages#test"

  resources :expenses, only: :index
  resources :timesheets, only: :index
end
