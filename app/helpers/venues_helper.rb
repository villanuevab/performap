module VenuesHelper
  def coordinates(venue)
    "#{venue.latitude}, #{venue.longitude}"
  end
end