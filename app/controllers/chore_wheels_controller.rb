class ChoreWheelsController < ApplicationController

    def index
        render json: ChoreWheel.all
    end

    def show
        cw = ChoreWheel.find(params[:id])
        if cw.user.id != session[:user_id]
            render json: { errors: ["Not authorized"] }, status: :unauthorized         
        else
            num = cw.members.length
            render json: cw.member_tasks.last(num)
        end
    end

    def create
        cw = ChoreWheel.create!(chore_wheel_params)
        render json: cw, status: :created
    end

    def create_empty_tasks
        cw = ChoreWheel.find(params[:id])

        if cw.tasks.length > cw.members.length
            num = cw.tasks.length - cw.members.length
            cw.tasks.last(num).each do |i|
                nobody = Member.create!(chore_wheel: cw, name: "nobody")
                MemberTask.create!(chore_wheel: cw, member: nobody, task: i)
            end
        else return null
        end
    end

    private

    def chore_wheel_params
        params.permit(:name, :user_id)
    end
end
