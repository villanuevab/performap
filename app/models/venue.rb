class Venue < ApplicationRecord
  has_and_belongs_to_many :events

  geocoded_by :given_address do |venue, results|
    if geo = results.first
      venue.latitude = geo.latitude
      venue.longitude = geo.longitude
      venue.street_address = geo.street_address
      venue.city = geo.city
      venue.state = geo.state
      venue.country = geo.country
      venue.formatted_address = geo.formatted_address
    end
  end

  after_validation :geocode, :if => lambda{ |obj| obj.given_address_changed? }
end