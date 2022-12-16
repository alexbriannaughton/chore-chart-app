class MemberTasksController < ApplicationController

    def index
        render json: MemberTask.all
    end

    def create
        mt = MemberTask.create!(mt_params)
        render json: mt, status: :created
    end

    def rotate
        cw = ChoreWheel.find(params[:id])

        num = cw.members.length

        arr = []
        cw.member_tasks.last(num).each do |i|
            arr << i.task.id
        end

        new_tasks = cw.members.each_with_index do |i, index|
            @member_task = MemberTask.create!(chore_wheel: cw, member_id: i.id, task_id: arr.rotate(-1)[index])

        end
        render json: new_tasks, status: :created
    end

    private

    def mt_params
        params.permit(:member_id, :task_id, :chore_wheel_id)
    end

end
