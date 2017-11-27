class AddUniquenessConditionToEventsVenues < ActiveRecord::Migration[5.1]
  def change
    add_index :events_venues, [:event_id, :venue_id], unique: true
    add_index :events_venues, [:venue_id, :event_id], unique: true
  end
end