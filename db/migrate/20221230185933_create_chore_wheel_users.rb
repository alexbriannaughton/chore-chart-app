class CreateChoreWheelUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :chore_wheel_users do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :chore_wheel, null: false, foreign_key: true

      t.timestamps
    end
  end
end
