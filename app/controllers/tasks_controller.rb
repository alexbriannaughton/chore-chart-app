class TasksController < ApplicationController

    def index
        render json: Task.all
    end

    def create
        task = Task.create!(task_params)
        render json: task
    end

    private

    def task_params
        params.permit(:name, :chore_wheel_id)
    end

end
