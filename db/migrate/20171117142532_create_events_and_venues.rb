class CreateEventsAndVenues < ActiveRecord::Migration[5.1]
  def change
    create_table :events_venues, id: false do |t|
      t.belongs_to :event, index: true
      t.belongs_to :venue, index: true
    end
  end
end