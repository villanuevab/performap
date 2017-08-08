class Event < ApplicationRecord
  scope :countries, -> { distinct.pluck(:country) }
  scope :cities, -> (country) { where(country: country).distinct.pluck(:city) }
  scope :for_city, -> (city) { where(city: city) }

  scope :recent, -> { order(updated_at: :desc) }
end