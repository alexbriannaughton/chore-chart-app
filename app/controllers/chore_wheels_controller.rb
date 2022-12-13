class ChoreWheelsController < ApplicationController

    def index
        render json: ChoreWheel.all
    end

    def create
        cw = ChoreWheel.create!(chore_wheel_params)
        render json: cw, status: :created
    end

    private

    def chore_wheel_params
        params.permit(:name)
    end
end
