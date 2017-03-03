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
  get  '/sign-up', to: 'commissioners#new', as: :new_commissioner
  # post action to create the new models. 
  post '/sign-up', to: 'commissioners#create'


  get  '/start-a-league', to: 'leagues#new', as: :new_league
  post  '/start-a-league', to: 'leagues#create'
  get  '/:league_path', to: 'leagues#show', as: :league

  get  '/dashboard/:league_path', to: 'leagues#dashboard', as: :league_dashboard

  get  '/:league_path/new-ballot',  to: 'ballots#new', as: :league_new_ballot
  post  '/:league_path/new-ballot', to: 'ballots#create'

  get  '/:league_path/:ballot_id',  to: 'ballots#show', as: :league_ballot
  delete  '/:league_path/:ballot_id',  to: 'ballots#destroy', as: :league_ballot_destroy

  get   '/commissioners/:commissioner_id', to: "commissioners#show", as: 'commissioner'
  get   '/commissioners/edit/:commissioner_id', to: "commissioners#show"
  patch '/commissioners/:commissioner_id', to: "commissioners#update"



end
