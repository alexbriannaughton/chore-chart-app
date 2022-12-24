class ChoreWheel < ApplicationRecord
    has_many :members
    has_many :tasks
    belongs_to :user
    has_many :member_tasks

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
