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
        deleted_member = Member.find(params[:id])
        ex_members_last_task = deleted_member.member_tasks.last.task
        cw = deleted_member.chore_wheel
        num = cw.members.length


        # if the deleted member was on a free space, delete the member and the task
        if ex_members_last_task.name == "Free space!"
            deleted_member.destroy
            ex_members_last_task.destroy
        else
            # check if there are free spaces
            free_space_mt = cw.member_tasks.last(num).find {|i| i.task.name == "Free space!"}

            # if there are free spaces, find the member who was on the free space and assign them the deleted member's task
            if free_space_mt
                MemberTask.create!(chore_wheel: cw, member: free_space_mt.member, task: ex_members_last_task)
                deleted_member.destroy

            # if there aren't free spaces, assign the deleted person's task to nobody
            else
                nobody = Member.create!(chore_wheel: cw, name: "nobody")
                MemberTask.create!(chore_wheel: cw, member: nobody, task: ex_members_last_task)
                deleted_member.destroy
            end
        end

        head :no_content

    end

    #add a new a member who was not originally on the chore wheel upon its instantiation
    def new_member
        member = Member.create!(member_params)
        cw = member.chore_wheel
        num = cw.members.length

        ##check if there are any tasks assigned to nobody
        empty_member_task = cw.member_tasks.last(num-1).find {|i| i.member.name == "nobody"}

        # if there are tasks assigned to "nobody", assign the new member to that task and delete this wheels "nobody"
        if empty_member_task
            MemberTask.create!(chore_wheel: cw, task: empty_member_task.task, member: member)
            empty_member_task.member.destroy

        ## else, we'll need to create a new free space task to assign to our new member
        else
            free_space = Task.create!(chore_wheel: cw, name: "Free space!", details: "Be creative! Help out!")
            MemberTask.create!(chore_wheel: cw, member: member, task: free_space)
        end

    end

    private

    def member_params
        params.permit(:name, :chore_wheel_id, :email)
    end
end
