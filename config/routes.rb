Rails.application.routes.draw do
  root 'events#index'

  resources :events

  get '/tablesort', to: 'events#tablesort', :as => 'tablesort'
end