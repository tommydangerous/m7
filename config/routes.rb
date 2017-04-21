Rails.application.routes.draw do
  get "/login", to: "sessions#login"
end
