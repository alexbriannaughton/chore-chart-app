class ChoreWheel < ApplicationRecord
    has_many :members, dependent: :destroy
    has_many :tasks, dependent: :destroy
    has_many :member_tasks
    has_many :chore_wheel_users, dependent: :destroy
    has_many :users, through: :chore_wheel_users
    has_many :comments, dependent: :destroy

    validates :name, length: { minimum: 2 }
    validates :auto_rotate, inclusion: { in: [ true, false ] }

    def rotate
        num = self.members.length

        arr = []

        self.member_tasks.last(num).each do |mt|
            arr << mt.task.id
        end

        self.members.each_with_index do |i, index|
            MemberTask.create!(chore_wheel: self, member_id: i.id, task_id: arr.rotate(-1)[index])
        end

        self.member_tasks.last(num).each do |mt|
            i.send_new_task_email
        end
        
    end

end
