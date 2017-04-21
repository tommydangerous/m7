Rails.application.routes.draw do
  root "pages#index"

  get "login", to: "sessions#login"

  get "test", to: "pages#test"
end
