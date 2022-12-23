Rails.application.routes.draw do
  
  resources :member_tasks
  resources :tasks
  resources :members
  resources :people
  resources :users
  resources :chore_wheels

  get "/rotate/:id", to: "member_tasks#rotate"
  get "/empty_tasks/:id", to: "chore_wheels#create_empty_tasks"

  post "/new_task", to: "tasks#new_task"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "/me", to: "users#show"
  post "/signup", to: "users#create"
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
