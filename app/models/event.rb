class Event < ApplicationRecord
  scope :countries, -> { pluck(:country).uniq }
  scope :cities_in_country, -> (country) { where(country: country).pluck(:city).uniq }
  scope :in_city, -> (city) { where(city: city) }

  scope :recent, -> { order(updated_at: :desc) }

  def self.cities_by_country
    citiesByCountry = Hash.new()
    self.countries.each do |c|
      citiesByCountry[c] = self.recent.cities_in_country(c)
    end
    citiesByCountry
  end
end