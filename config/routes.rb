Rails.application.routes.draw do
  root 'directory#index'

  get '/tablesort', to: 'directory#tablesort', :as => 'tablesort'
end