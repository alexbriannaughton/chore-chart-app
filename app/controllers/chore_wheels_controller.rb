class ChoreWheelsController < ApplicationController

    def index
        render json: ChoreWheel.all
    end

    def show
        cw = ChoreWheel.find(params[:id])
        num = cw.members.length
        render json: cw.member_tasks.last(num)
    end

    def create
        cw = ChoreWheel.create!(chore_wheel_params)
        render json: cw, status: :created
    end

    private

    def chore_wheel_params
        params.permit(:name, :user_id)
    end
end
