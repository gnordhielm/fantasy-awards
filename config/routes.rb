Rails.application.routes.draw do

  root 'static_pages#welcome'

  get  '/welcome',    to: 'static_pages#welcome'
  get  '/about',      to: 'static_pages#about'
  get  '/help',       to: 'static_pages#help'

  post '/',   to: 'sessions#create'
  post '/welcome',   to: 'sessions#create'
  delete '/', to: 'sessions#destroy', as: :logout_path

  # sign up form for creating a new player and user model. 
  get  '/commissioner-signup', to: 'commissioners#new', as: :new_commissioner
  # post action to create the new models. 
  post '/commissioner-signup', to: 'commissioners#create'


  get  '/commissioners/:commissioner_id/new-league', to: 'leagues#new', as: :new_league
  post  '/commissioners/:commissioner_id/new-league', to: 'leagues#create'
  get  '/:league_id', to: 'leagues#show', as: :league

  get  '/dashboard/:league_id', to: 'leagues#dashboard', as: :league_dashboard

  get   '/commissioners/:commissioner_id', to: "commissioners#show", as: 'commissioner'
  get   '/commissioners/edit/:commissioner_id', to: "commissioners#show"
  patch '/commissioners/:commissioner_id', to: "commissioners#update"



end
