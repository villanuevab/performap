class Event < ApplicationRecord
  has_and_belongs_to_many :venues, :uniq => true

  scope :recent, -> { order(updated_at: :desc) }
  scope :names, -> { pluck(:name).uniq }

  # get the city in which the most venues are found
  def primary_city
    mode(self.venues.cities)
  end

  private
    def mode(array)
      freq = array.inject(Hash.new(0)) { |h,v| h[v] += 1; h }
      array.max_by { |v| freq[v] }
    end
end