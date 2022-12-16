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

ActiveRecord::Schema.define(version: 2022_12_13_174224) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "chore_wheels", force: :cascade do |t|
    t.string "name"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_chore_wheels_on_user_id"
  end

  create_table "member_tasks", force: :cascade do |t|
    t.bigint "member_id", null: false
    t.bigint "task_id", null: false
    t.bigint "chore_wheel_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["chore_wheel_id"], name: "index_member_tasks_on_chore_wheel_id"
    t.index ["member_id"], name: "index_member_tasks_on_member_id"
    t.index ["task_id"], name: "index_member_tasks_on_task_id"
  end

  create_table "members", force: :cascade do |t|
    t.string "name"
    t.bigint "chore_wheel_id", null: false
    t.string "email"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["chore_wheel_id"], name: "index_members_on_chore_wheel_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.string "name"
    t.bigint "chore_wheel_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["chore_wheel_id"], name: "index_tasks_on_chore_wheel_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.string "email"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "chore_wheels", "users"
  add_foreign_key "member_tasks", "chore_wheels"
  add_foreign_key "member_tasks", "members"
  add_foreign_key "member_tasks", "tasks"
  add_foreign_key "members", "chore_wheels"
  add_foreign_key "tasks", "chore_wheels"
end
