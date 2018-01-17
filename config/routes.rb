Rails.application.routes.draw do
  root 'home#directory'

  get 'map', to: 'home#map', as: :map
  get 'dashboard', to: 'home#dashboard', as: :dashboard

  namespace :api, defaults: {format: 'json'} do
    namespace :v1 do
      resources :events, only: [:index]
      get 'recent_countries', to: 'events#recent_countries', as: :recent_countries
      get 'cities_by_country', to: 'events#cities_by_country', as: :cities_by_country
      get 'events_by_country', to: 'events#events_by_country', as: :events_by_country
      get 'events_by_city', to: 'events#events_by_city', as: :events_by_city
    end
  end

  resources :events do
    post 'delete_venue_from', on: :member
  end

  resources :venues, only: [:index, :show, :edit, :update] do
    post 'delete_event_from', on: :member
  end

  get 'sign_up', to: 'users#new', as: :sign_up
  resources :users

  get 'sign_in', to: 'sessions#new', as: :sign_in
  post 'sign_in', to: 'sessions#create'
  get 'sign_out', to: 'sessions#destroy', as: :sign_out
end