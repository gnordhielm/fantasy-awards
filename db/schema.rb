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

ActiveRecord::Schema.define(version: 20170303062057) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "ballots", force: :cascade do |t|
    t.integer  "player_id"
    t.integer  "league_id"
    t.string   "best_picture"
    t.string   "best_actress"
    t.string   "best_actor"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["league_id"], name: "index_ballots_on_league_id", using: :btree
    t.index ["player_id"], name: "index_ballots_on_player_id", using: :btree
  end

  create_table "commissioners", force: :cascade do |t|
    t.integer  "player_id"
    t.string   "password_digest"
    t.boolean  "designer"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["player_id"], name: "index_commissioners_on_player_id", using: :btree
  end

  create_table "league_commissioners", force: :cascade do |t|
    t.integer  "commissioner_id"
    t.integer  "league_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["commissioner_id"], name: "index_league_commissioners_on_commissioner_id", using: :btree
    t.index ["league_id"], name: "index_league_commissioners_on_league_id", using: :btree
  end

  create_table "leagues", force: :cascade do |t|
    t.string   "league_name"
    t.string   "award_name"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "league_path"
  end

  create_table "players", force: :cascade do |t|
    t.string   "screen_name"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_foreign_key "ballots", "leagues"
  add_foreign_key "ballots", "players"
  add_foreign_key "commissioners", "players"
  add_foreign_key "league_commissioners", "commissioners"
  add_foreign_key "league_commissioners", "leagues"
end
