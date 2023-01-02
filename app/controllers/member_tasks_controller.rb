class MemberTasksController < ApplicationController

    def index
        render json: MemberTask.all
    end

    def create
        if mt_params[:task_id] == 1
            free_space = Task.create!(chore_wheel_id: mt_params[:chore_wheel_id], name: "Free space!", details: "ask yourself. what can i do for my chore wheel?")
            mt = MemberTask.create(task: free_space, member_id: mt_params[:member_id], chore_wheel_id: mt_params[:chore_wheel_id])
        else
            mt = MemberTask.create!(mt_params)
        end
        render json: mt, status: :created
    end

    def rotate
        cw = ChoreWheel.find(params[:id])
        cw.rotate
        # num = cw.members.length

        # arr = []
        # cw.member_tasks.last(num).each do |i|
        #     arr << i.task.id
        # end

        # cw.members.each_with_index do |i, index|
        #     MemberTask.create!(chore_wheel: cw, member_id: i.id, task_id: arr.rotate(-1)[index])
        # end
    end

    private

    def mt_params
        params.permit(:member_id, :task_id, :chore_wheel_id)
    end

end
