class Event < ApplicationRecord
  has_and_belongs_to_many :venues, :uniq => true

  scope :cities, -> { includes(:venues).pluck('venues.city').uniq }
  scope :recent, -> { order(updated_at: :desc) }

  # get array of unique cities for given event based on associated venues
  def cities
    self.venues.pluck(:city).uniq
  end

  # get the city with the majority of an event's venue(s)
  def primary_city
    mode(self.venues.pluck(:city))
  end

  # get array of unique countries for given event based on associated venues
  def countries
    self.venues.pluck(:country).uniq
  end

  private
    def mode(array)
      freq = array.inject(Hash.new(0)) { |h,v| h[v] += 1; h }
      array.max_by { |v| freq[v] }
    end

end