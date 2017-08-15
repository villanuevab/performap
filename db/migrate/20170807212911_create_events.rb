class CreateEvents < ActiveRecord::Migration[5.1]
  def change
    create_table :events do |t|
      t.text :name
      t.text :presenter
      t.text :city
      t.text :state
      t.text :country
      t.date :start_date
      t.date :end_date
      t.text :description
      t.text :website
      t.text :facebook
      t.text :instagram
      t.text :twitter
      t.text :youtube

      t.timestamps
    end
  end
end
