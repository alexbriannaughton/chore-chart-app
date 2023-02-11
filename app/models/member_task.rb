class MemberTask < ApplicationRecord
  belongs_to :member
  belongs_to :task
  belongs_to :chore_wheel

  after_create :send_new_task_email

  def send_new_task_email
    # if we don't have their email, don't try to send it. also, we rotate the wheel one time upon instatiation, don't send the email immediately upon instatiation. 
    if self.member.email == "" || self.member.email == nil || self.chore_wheel.member_tasks.length <= self.chore_wheel.members.length
      return nil
    else
      # check if the chart has a "nobody" on it
      with_nobody = self.chore_wheel.members.find {|i| i.name == "nobody"}

      # if there is a "nobody", send the email template with a nobody
      if with_nobody
        MemberMailer.new_chore_with_nobody(member: self.member, member_task: self, nobody: with_nobody)

      # else send the email template without the "nobody"
      else
        MemberMailer.new_chore(member: self.member, member_task: self).deliver_now
      end
    end
  end


  # this is for the rake task in lib/tasks/auto_rotate.rake. when the rake task is run, this rotate will apply to all wheels that are set to auto rotate. 
  def self.rotate_all
    all_cw = ChoreWheel.where(auto_rotate: true)
    all_cw.each do |cw|
      num = cw.members.length
      arr = []
      cw.member_tasks.last(num).each do |mt|
        arr << mt.task.id
      end
      cw.members.each_with_index do |i, index|
        MemberTask.create!(chore_wheel: cw, member_id: i.id, task_id: arr.rotate(-1)[index])
      end
    end
  end
end
