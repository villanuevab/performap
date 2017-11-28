class Event < ApplicationRecord
  has_and_belongs_to_many :venues, :uniq => true

  scope :cities, -> { includes(:venues).pluck('venues.city').uniq }
  scope :recent, -> { order(updated_at: :desc) }
end