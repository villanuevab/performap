class RemoveAddressInfoFromEvents < ActiveRecord::Migration[5.1]
  def change
    remove_column :events, :city
    remove_column :events, :state
    remove_column :events, :country
  end
end