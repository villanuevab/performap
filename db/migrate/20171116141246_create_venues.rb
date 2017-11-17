class CreateVenues < ActiveRecord::Migration[5.1]
  def change
    create_table :venues do |t|
      t.text :name
      t.float :latitude
      t.float :longitude
      t.text :formatted_address
      t.text :city
      t.text :country

      t.timestamps
    end
  end
end