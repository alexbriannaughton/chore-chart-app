class ChoreWheel < ApplicationRecord
    has_many :members, dependent: :destroy
    has_many :tasks, dependent: :destroy
    has_many :member_tasks
    has_many :chore_wheel_users, dependent: :destroy
    has_many :users, through: :chore_wheel_users
    has_many :comments, dependent: :destroy

    validates :name, length: { minimum: 2 }
    validates :auto_rotate, inclusion: { in: [ true, false ] }


    # rotates tasks on chore wheel one member over
    def rotate
        # grab number for every member in the chore wheel
        num = self.members.length

        # make array of ids for all the chore wheel's current tasks
        tasks_arr = []
        self.member_tasks.last(num).each do |mt|
            tasks_arr << mt.task.id
        end

        # create new member_task for each member with the tasks array rotated
        self.members.each_with_index do |mem, index|
            MemberTask.create!(chore_wheel: self, member_id: mem.id, task_id: tasks_arr.rotate(-1)[index])
        end

        # email new tasks to the members
        self.member_tasks.last(num).each do |mt|
            mt.send_new_task_email
        end
        
    end

end
