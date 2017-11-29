class Event < ApplicationRecord
  has_and_belongs_to_many :venues, :uniq => true

  scope :cities, -> { includes(:venues).pluck('venues.city').uniq }
  scope :recent, -> { order(updated_at: :desc) }

  # get array of cities for given event based on associated venues
  def cities
    self.venues.pluck(:city).uniq
  end

  # get array of countries for given event based on associated venues
  def countries
    self.venues.pluck(:country).uniq
  end
end