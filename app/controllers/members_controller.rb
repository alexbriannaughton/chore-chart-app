class MembersController < ApplicationController

    def index
        render json: Member.all
    end

    def create
        member = Member.create!(member_params)
        render json: member, status: :created
    end

    def update
        member = Member.find(params[:id])
        member.update!(member_params)
        render json: member
    end

    def destroy
        member = Member.find(params[:id])
        task = member.member_tasks.last.task
        cw = member.chore_wheel

        member.destroy

        if cw.tasks.length > cw.members.length
            nobody = Member.create!(chore_wheel: cw, name: "nobody")
            MemberTask.create!(chore_wheel: cw, member: nobody, task: task)
        end

        head :no_content
    end

    private

    def member_params
        params.permit(:name, :chore_wheel_id, :email)
    end
end
