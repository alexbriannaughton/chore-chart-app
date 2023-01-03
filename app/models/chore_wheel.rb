class ChoreWheel < ApplicationRecord
    has_many :members, dependent: :destroy
    has_many :tasks, dependent: :destroy
    has_many :member_tasks
    has_many :chore_wheel_users, dependent: :destroy
    has_many :users, through: :chore_wheel_users
    has_many :comments

    validates :name, length: { minimum: 3 }

    def rotate
        num = self.members.length

        arr = []

        self.member_tasks.last(num).each do |i|
            arr << i.task.id
        end

        self.members.each_with_index do |i, index|
            MemberTask.create!(chore_wheel: self, member_id: i.id, task_id: arr.rotate(-1)[index])
        end


    end

    
end
