Rails.application.routes.draw do
  resources :favorites
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  post '/auth/login', to: 'authentication#login'
  get '/auth/verify', to: 'authentication#verify'
  # Defines the root path route ("/")
  # root "articles#index"
end
