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
      flash[:success] = "Venue successfully updated"
      redirect_to @venue
    else
      flash[:error] = "Venue was not updated"
      render 'edit'
    end
  end

  def delete_event_from
    @venue = Venue.find(params[:id])
    event = @venue.events.find(params[:event_id])

    if event
      @venue.events.delete(event)
    end

    redirect_to @venue
  end

  private
    def venue_params
      params.require(:venue).permit(:name, :latitude, :longitude, :given_address,
                                    :formatted_address, :street_address, :city,
                                    :state, :country)
    end
end