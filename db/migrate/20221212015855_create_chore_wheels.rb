class CreateChoreWheels < ActiveRecord::Migration[6.1]
  def change
    create_table :chore_wheels do |t|
      t.string :name

      t.timestamps
    end
  end
end
