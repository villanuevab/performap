class VenuesController < ApplicationController
  def index
    @venues = Venue.all
  end

  def show
    @venue = Venue.find(params[:id])
  end

  def edit
    @venue = Venue.find(params[:id])
  end

  def update
    @venue = Venue.find(params[:id])
    if @venue.update_attributes(venue_params)
      redirect_to venues_path
    else
      render 'edit'
    end
  end

  def delete_event_from
    venue = Venue.find(params[:venue_id])
    event = Event.find(params[:id])

    redirect_to venues_path
  end

  private
    def venue_params
      params.require(:venue).permit(:name, :latitude, :longitude, :given_address,
                                    :formatted_address, :street_address, :city,
                                    :state, :country)
    end
end