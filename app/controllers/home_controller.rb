class HomeController < ApplicationController
  def directory
    @events = Event.recent.includes(:venues)
    @recent_countries = Venue.countries
    gon.jbuilder template: 'app/views/api/v1/events/index.json.jbuilder', as: :events

    gon.citiesByCountry = Venue.cities_by_country
  end

  def map
    @events = Event.recent.includes(:venues)
    gon.jbuilder template: 'app/views/api/v1/events/index.json.jbuilder', as: :events
  end

  def logo
  end
end
