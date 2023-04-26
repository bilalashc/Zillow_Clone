# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_04_26_053725) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "listings", force: :cascade do |t|
    t.string "address", null: false
    t.string "street", null: false
    t.string "city", null: false
    t.string "state", null: false
    t.string "zip_code", null: false
    t.string "market_status", null: false
    t.integer "home_price", null: false
    t.string "rent_estimate", null: false
    t.text "home_overview", null: false
    t.bigint "author_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["address"], name: "index_listings_on_address", unique: true
    t.index ["author_id"], name: "index_listings_on_author_id"
    t.index ["city"], name: "index_listings_on_city"
    t.index ["home_price"], name: "index_listings_on_home_price"
    t.index ["market_status"], name: "index_listings_on_market_status"
    t.index ["rent_estimate"], name: "index_listings_on_rent_estimate"
    t.index ["state"], name: "index_listings_on_state"
    t.index ["street"], name: "index_listings_on_street"
    t.index ["zip_code"], name: "index_listings_on_zip_code", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

  add_foreign_key "listings", "users", column: "author_id"
end
