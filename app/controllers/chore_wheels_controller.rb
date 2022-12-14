class ChoreWheelsController < ApplicationController

    def index
        render json: ChoreWheel.all
    end

    def show
        cw = ChoreWheel.find(params[:id])
        render json: cw.member_tasks
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
