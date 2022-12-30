class ChoreWheelsController < ApplicationController

    def index
        render json: ChoreWheel.all
    end

    def show
        cw = ChoreWheel.find(params[:id])

        if cw.chore_wheel_users.exists?(user_id: session[:user_id])
            num = cw.members.length
            render json: cw.member_tasks.last(num)
            
        else
            render json: { errors: ["Not authorized"] }, status: :unauthorized
        end
    end

    def create
        cw = ChoreWheel.create!(chore_wheel_params)
        render json: cw, status: :created
    end

    def create_empty_tasks
        cw = ChoreWheel.find(params[:id])

        # if cw.tasks.length > cw.members.length

        empty_tasks = cw.tasks.where.missing(:member_tasks)


            # num = cw.tasks.length - cw.members.length
            empty_tasks.each do |i|
                nobody = Member.create!(email: "nil", chore_wheel: cw, name: "nobody")
                MemberTask.create!(chore_wheel: cw, member: nobody, task: i)
            end
        # else return null
        # end
    end

    private

    def chore_wheel_params
        params.permit(:name, :user_id)
    end
end
