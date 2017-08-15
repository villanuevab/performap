Rails.application.routes.draw do
  get 'welcome/index'

  root 'events#tablesort'

  resources :events
end