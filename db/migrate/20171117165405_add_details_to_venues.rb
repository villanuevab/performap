class AddDetailsToVenues < ActiveRecord::Migration[5.1]
  def change
    add_column :venues, :given_address, :text
    add_column :venues, :street_address, :text
    add_column :venues, :state, :text
  end
end
