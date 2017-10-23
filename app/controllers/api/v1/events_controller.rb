module Api
  module V1
    class EventsController < ApplicationController
      def index
        @events = Event.all
      end

      def recent_countries
        @countries = Event.countries
      end

      def cities_by_country
        @country = params[:country] || ""
        @cities = Event.cities_in_country(@country)
      end

      def recent_events
        @events = Event.recent
      end

      def events_by_country
        @country = params[:country] || ""
        @events = Event.where(country: @country)
      end

      def events_by_city
        @city = params[:city] || ""
        # @state = params[:state] || ""
        @events = Event.where(city: @city)
      end
    end
  end
end