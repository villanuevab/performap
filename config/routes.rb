Rails.application.routes.draw do
  get 'welcome/index'

  root 'events#tablesort'

  namespace :api, defaults: {format: 'json'} do
    namespace :v1 do
      resources :events, only: [:index]
      get 'recent_countries', to: 'events#recent_countries', as: :recent_countries
      get 'cities_by_country', to: 'events#cities_by_country', as: :cities_by_country
      get 'events_by_country', to: 'events#events_by_country', as: :events_by_country
      get 'events_by_city', to: 'events#events_by_city', as: :events_by_city
    end
  end

  resources :events
end