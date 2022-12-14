class CreateMemberTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :member_tasks do |t|
      t.belongs_to :member, null: false, foreign_key: true
      t.belongs_to :task, null: false, foreign_key: true
      t.belongs_to :chore_wheel, null: false, foreign_key: true

      t.timestamps
    end
  end
end
