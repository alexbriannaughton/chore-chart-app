class MemberTasksController < ApplicationController

    def index
        render json: MemberTask.all
    end

    def create
        # if "none" is the task_id we're going to create a free space task and create a membertask for it
        if mt_params[:task_id] == "none"
            free_space = Task.create!(chore_wheel_id: mt_params[:chore_wheel_id], name: "Free space!", details: "ask yourself. what can i do for my chore wheel?")
            mt = MemberTask.create(task: free_space, member_id: mt_params[:member_id], chore_wheel_id: mt_params[:chore_wheel_id])
        else
            mt = MemberTask.create!(mt_params)
        end
        render json: mt, status: :created
    end

    private

    def mt_params
        params.permit(:member_id, :task_id, :chore_wheel_id)
    end

end
