class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.string :name
      t.belongs_to :chore_wheel, null: false, foreign_key: true

      t.timestamps
    end
  end
end
