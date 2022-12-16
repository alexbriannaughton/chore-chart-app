class CreateMembers < ActiveRecord::Migration[6.1]
  def change
    create_table :members do |t|
      t.string :name
      t.belongs_to :chore_wheel, null: false, foreign_key: true
      t.string :email

      t.timestamps
    end
  end
end
