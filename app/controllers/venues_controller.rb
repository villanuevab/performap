class VenuesController < ApplicationController
  def index
    @venues = Venue.all
  end

  def edit
    @venue = Venue.find(params[:id])
  end
end