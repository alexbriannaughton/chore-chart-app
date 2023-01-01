class ChoreWheelUsersController < ApplicationController
    def create
        cwu = ChoreWheelUser.create!(cwu_params)
        render json: cwu, status: :created
    end

    def index
        render json: ChoreWheelUser.all
    end

    def add_user
        user = User.find_by(username: cwu_params[:username])
        cw = ChoreWheel.find(cwu_params[:chore_wheel_id])
        cwu = ChoreWheelUser.create!(user: user, chore_wheel: cw)
        render json: cwu, status: :created
    end

    private

    def cwu_params
        params.permit(:chore_wheel_id, :user_id, :username)
    end
end
