Rails.application.routes.draw do
  
  resources :comments
  resources :chore_wheel_users
  resources :member_tasks
  resources :tasks
  resources :members
  resources :users
  resources :chore_wheels

  get "/rotate/:id", to: "chore_wheels#rotate"
  get "/empty_tasks/:id", to: "chore_wheels#create_empty_tasks"

  post "/new_task", to: "tasks#new_task"

  post "/new_member", to: "members#new_member"

  post "/add_user", to: "chore_wheel_users#add_user"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "/me", to: "users#show"
  post "/signup", to: "users#create"
 
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
