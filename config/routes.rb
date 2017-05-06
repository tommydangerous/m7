Rails.application.routes.draw do
  root "pages#index"
  get "expenses", to: "pages#index"
  get "login", to: "pages#index"
  get "timesheets", to: "pages#index"
end
