class EventsController < ApplicationController
  def index
    @events = Event.all
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

  def tablesort
    @events = Event.recent
    @recent_countries = Event.countries
    gon.jbuilder template: 'app/views/api/v1/events/index.json.jbuilder', as: :events

    gon.citiesByCountry = Event.cities_by_country
  end

  private
    def event_params
      params.require(:event).permit(:name, :presenter, :city, :state, :country,
                                    :start_date, :end_date, :description, :website,
                                    :facebook, :instagram, :twitter, :youtube)
    end
end