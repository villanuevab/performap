# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171129213118) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "events", force: :cascade do |t|
    t.text "name"
    t.text "presenter"
    t.text "city"
    t.text "state"
    t.text "country"
    t.date "start_date"
    t.date "end_date"
    t.text "description"
    t.text "website"
    t.text "facebook"
    t.text "instagram"
    t.text "twitter"
    t.text "youtube"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "events_venues", id: false, force: :cascade do |t|
    t.bigint "event_id"
    t.bigint "venue_id"
    t.index ["event_id", "venue_id"], name: "index_events_venues_on_event_id_and_venue_id", unique: true
    t.index ["event_id"], name: "index_events_venues_on_event_id"
    t.index ["venue_id", "event_id"], name: "index_events_venues_on_venue_id_and_event_id", unique: true
    t.index ["venue_id"], name: "index_events_venues_on_venue_id"
  end

  create_table "venues", force: :cascade do |t|
    t.text "name"
    t.float "latitude"
    t.float "longitude"
    t.text "formatted_address"
    t.text "city"
    t.text "country"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "given_address"
    t.text "street_address"
    t.text "state"
  end

end
