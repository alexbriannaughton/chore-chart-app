class MemberTasksController < ApplicationController

    def index
        render json: MemberTask.all
    end

    def create
        mt = MemberTask.create!(mt_params)
        render json: mt, status: :created
    end

    private

    def mt_params
        params.permit(:member_id, :task_id, :chore_wheel_id)
    end

end
