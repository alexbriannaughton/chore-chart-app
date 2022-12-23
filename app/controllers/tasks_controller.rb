class TasksController < ApplicationController

    def index
        render json: Task.all
    end

    def create
        task = Task.create!(task_params)
        render json: task
    end

    def update
        task = Task.find(params[:id])
        task.update!(task_params)
        render json: task
    end

    def destroy
        task = Task.find(params[:id])
        member = task.member_tasks.last.member
        cw = task.chore_wheel

        task.destroy

        if cw.members.length > cw.tasks.length
            free_space = Task.create!(chore_wheel: cw, name: "Free space!")
            MemberTask.create!(chore_wheel: cw, member: member, task: free_space)    
        end

        head :no_content
    end

    private

    def task_params
        params.permit(:name, :details, :chore_wheel_id)
    end

end
