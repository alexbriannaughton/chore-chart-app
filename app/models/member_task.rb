class MemberTask < ApplicationRecord
  belongs_to :member
  belongs_to :task
  belongs_to :chore_wheel

  after_create :send_new_task_email

  def send_new_task_email
    if self.member.email != "" || self.member.email != nil
      MemberMailer.new_chore(member: self.member, member_task: self).deliver_now
    else return nil
    end
  end

  def self.rotate_all
    all_cw = ChoreWheel.all
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
