class ChoreWheelsController < ApplicationController

    def index
        render json: ChoreWheel.all
    end

    def show
        cw = ChoreWheel.find(params[:id])

        if cw.chore_wheel_users.exists?(user_id: session[:user_id])
            num = cw.members.length

            ## the current state of  the chore wheel = the last num of member_tasks
            render json: cw.member_tasks.last(num)
        else
            render json: { errors: ["Not authorized"] }, status: :unauthorized
        end
    end

    def create
        cw = ChoreWheel.create!(chore_wheel_params)
        render json: cw, status: :created
    end

    def update
        cw = ChoreWheel.find(params[:id])
        cw.update!(chore_wheel_params)
        render json: cw
    end

    def destroy
        cw = ChoreWheel.find(params[:id])
        cw.destroy
    end

    def create_empty_tasks
        cw = ChoreWheel.find(params[:id])

        ## grab all of the tasks that do not have member_tasks yet
        empty_tasks = cw.tasks.where.missing(:member_tasks)

            ## and create one where "nobody" is assigned
            empty_tasks.each do |i|
                nobody = Member.create!(email: "nil", chore_wheel: cw, name: "nobody")
                MemberTask.create!(chore_wheel: cw, member: nobody, task: i)
            end
            
    end

    def rotate
        cw = ChoreWheel.find(params[:id])
        cw.rotate
    end

    private

    def chore_wheel_params
        params.permit(:name, :user_id, :auto_rotate)
    end
end
