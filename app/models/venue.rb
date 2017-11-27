class Venue < ApplicationRecord
  has_and_belongs_to_many :events, :uniq => true

  scope :countries, -> { pluck(:country).uniq }
  scope :cities_in_country, -> (country) { where(country: country).pluck(:city).uniq }

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

  def self.cities_by_country
    citiesByCountry = Hash.new()
    self.countries.each do |c|
      citiesByCountry[c] = Event.recent.joins(:venues).where(venues: { country: c }).pluck('venues.city').uniq
    end
    citiesByCountry
  end
end