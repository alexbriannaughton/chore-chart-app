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

        # check if there are any tasks assigned to nobody
        nobody = cw.members.find {|i| i.name == "nobody"}
  
        # if there is a task assinged to nobody
        if nobody

            # and if "nobody" is assigned to the deleted task, delete the task and the "nobody"
            if nobody.member_tasks.last.task == task
                task.destroy
                nobody.destroy

            # else we need to assign the task that was assigned to "nobody" to the member whose task is being deleted. then we can delete the "nobody"
            else
                reassigned_task = nobody.member_tasks.last.task
                MemberTask.create!(chore_wheel: cw, member: member, task: reassigned_task)
                task.destroy
                nobody.destroy
            end

        # else if there's not a task assined to nobody we'll need to create a free space and assign it to the person who was assigned to the deleted task    
        else
            free_space = Task.create!(chore_wheel: cw, name: "Free space!", details: "ask yourself. what can i do for my chore wheel?")
            MemberTask.create!(chore_wheel: cw, member: member, task: free_space)
            task.destroy
        end

        head :no_content
        
    end


    # add/create a new task that was not on the chore wheel upon chore wheel instatiation
    def new_task
        
        cw = ChoreWheel.find(task_params[:chore_wheel_id])
        num = cw.members.length

        # check if anyone is currently assigned to a free space
        assignee = cw.member_tasks.last(num).find {|i| i.task.name == "Free space!"}
        
        # if someone is assigned to a free space, assign that person to the new task
        if assignee
            assignee.task.update!(task_params)
            MemberMailer.new_chore(member: assignee.member, member_task: assignee)

        # else if there are no free spaces, create a new "nobody" for the chore wheel, and assign the new task to that "nobody"
        else
            task = Task.create!(task_params)
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
