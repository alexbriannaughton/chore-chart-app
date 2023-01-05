class TasksController < ApplicationController

    def index
        render json: Task.all
    end

    def create
        task = Task.create!(task_params)
        render json: task
    end

    def update
        task = Task.find(params[:id])
        task.update!(task_params)
        render json: task
    end

    def destroy
        task = Task.find(params[:id])
        member = task.member_tasks.last.member
        cw = task.chore_wheel

        # check if there are any "nobodys"
        nobody = cw.members.find {|i| i.name == "nobody"}
        # if yes delete task and 1 nobody
        # need to reassign member with either task of nobody or free space!
        if nobody
            if nobody.member_tasks.last.task == task
                task.destroy
                nobody.destroy
            else
                reassigned_task = nobody.member_tasks.last.task
                MemberTask.create!(chore_wheel: cw, member: member, task: reassigned_task)
                task.destroy
                nobody.destroy
            end
        else
            free_space = Task.create!(chore_wheel: cw, name: "Free space!", details: "ask yourself. what can i do for my chore wheel?")
            MemberTask.create!(chore_wheel: cw, member: member, task: free_space)
            task.destroy
        end

        # task.destroy

        # if cw.members.length > cw.tasks.length
        #     MemberTask.create!(chore_wheel: cw, member: member, task: Task.first)    
        # end

        head :no_content
    end

    def new_task
        # if there's a member with a free space--assign them to this new task. otherwise assign it to nobody
        task = Task.create!(task_params)
        cw = task.chore_wheel
        num = cw.members.length

        assignee = cw.member_tasks.last(num).find {|i| i.task.name == "Free space!"}
        
        if assignee
            MemberTask.create!(chore_wheel: cw, task: task, member: assignee.member)
            assignee.task.destroy
            cw.rotate
        else
            nobody = Member.create!(chore_wheel: cw, name: "nobody", email: "nil")
            MemberTask.create!(chore_wheel: cw, member: nobody, task: task)
        end


        render json: task
    end

    private

    def task_params
        params.permit(:name, :details, :chore_wheel_id)
    end

end
