Rails.application.routes.draw do

  root 'static_pages#welcome'

  get '/designer-dashboard', to: 'designers#dashboard', as: :designer
  post '/designer-dashboard', to: 'designers#create', as: :designer_create
  patch '/designer-dashboard/:player_id', to: 'designers#update', as: :designer_update
  delete '/designer-dashboard/:player_id', to: 'designers#destroy', as: :designer_destroy


  get  '/welcome',    to: 'static_pages#welcome', as: :welcome
  get  '/about',      to: 'static_pages#about', as: :about
  get  '/help',       to: 'static_pages#help', as: :help

  post '/',   to: 'sessions#create'
  post '/welcome',   to: 'sessions#create'
  get '/logout', to: 'sessions#destroy', as: :logout

  # sign up form for creating a new player and user model. 
  get  '/commissioner-signup', to: 'commissioners#new', as: :new_commissioner
  # post action to create the new models. 
  post '/commissioner-signup', to: 'commissioners#create'



  get  '/commissioners/:commissioner_id/new-league', to: 'leagues#new', as: :new_league
  post  '/commissioners/:commissioner_id/new-league', to: 'leagues#create'
  get  '/:league_id', to: 'leagues#show', as: :league

  get  '/dashboard/:league_id', to: 'leagues#dashboard', as: :league_dashboard

  get  '/:league_id/new-ballot',  to: 'ballots#new', as: :league_new_ballot
  post  '/:league_id/new-ballot', to: 'ballots#create'

  get  '/:league_id/:ballot_id',  to: 'ballots#show', as: :league_ballot

  get   '/commissioners/:commissioner_id', to: "commissioners#show", as: 'commissioner'
  get   '/commissioners/edit/:commissioner_id', to: "commissioners#show"
  patch '/commissioners/:commissioner_id', to: "commissioners#update"



end
