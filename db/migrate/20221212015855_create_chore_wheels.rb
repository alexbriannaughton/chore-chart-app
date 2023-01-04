class CreateChoreWheels < ActiveRecord::Migration[6.1]
  def change
    create_table :chore_wheels do |t|
      t.string :name
      # t.belongs_to :user, null: false, foreign_key: true
      t.boolean :auto_rotate

      t.timestamps
    end
  end
end
