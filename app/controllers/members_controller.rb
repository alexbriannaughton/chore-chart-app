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

        if ex_members_last_task.name == "Free space!"
            deleted_member.destroy
            ex_members_last_task.destroy
            # cw.rotate
        else
            free_space_mt = cw.member_tasks.last(num).find {|i| i.task.name == "Free space!"}

            if free_space_mt
                MemberTask.create!(chore_wheel: cw, member: free_space_mt.member, task: ex_members_last_task)
                deleted_member.destroy
                # free_space_mt.task.destroy
            else
                nobody = Member.create!(chore_wheel: cw, name: "nobody")
                MemberTask.create!(chore_wheel: cw, member: nobody, task: ex_members_last_task)
                deleted_member.destroy
            end
        end
        ## if there's a free space, destroy the free space and assign the ex member's task to the person who was on the free space. if the ex member was on the free space, delete both the task and the member. 

            
  


        # if cw.tasks.length > cw.members.length
        #     # nobody = Member.create!(chore_wheel: cw, name: "nobody", email: "")
        #     MemberTask.create!(chore_wheel: cw, member: Member.first, task: task)
        # end

        head :no_content
    end

    def new_member
        # if there's a task assigned to "nobody", assign that task to new_member and remove nobody. otherwise, assign new_member to free space
        member = Member.create!(member_params)
        cw = member.chore_wheel
        num = cw.members.length

        empty_member_task = cw.member_tasks.last(num-1).find {|i| i.member.name == "nobody"}

        if empty_member_task
            MemberTask.create!(chore_wheel: cw, task: empty_member_task.task, member: member)
            empty_member_task.member.destroy
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
