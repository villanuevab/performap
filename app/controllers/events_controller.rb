class EventsController < ApplicationController
  def index
    @events = Event.all
  end

  def show
    @event = Event.find(params[:id])
  end

  def new
    @event = Event.new
  end

  def create
    @event = Event.new(event_params)

    @event.save
    redirect_to events_path
  end

  def edit
    @event = Event.find(params[:id])
  end

  def update
    @event = Event.find(params[:id])
    if @event.update_attributes(event_params)
      redirect_to events_path
    else
      render 'edit'
    end
  end

  def delete_venue_from
    @event = Event.find(params[:id])
    venue = @event.venues.find(params[:venue_id])

    if venue
      @event.venues.delete(venue)
    end

    redirect_to @event
  end

  private
    def event_params
      params.require(:event).permit(:name, :presenter, :start_date, :end_date,
                                    :description, :website, :facebook,
                                    :instagram, :twitter, :youtube)
    end
end