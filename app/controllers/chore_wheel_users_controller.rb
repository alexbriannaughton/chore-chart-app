class ChoreWheelUsersController < ApplicationController
    def create
        cwu = ChoreWheelUser.create!(cwu_params)
        render json: cwu, status: :created
    end

    private

    def cwu_params
        params.permit(:chore_wheel_id, :user_id)
    end
end
