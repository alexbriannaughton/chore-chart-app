class MemberTask < ApplicationRecord
  belongs_to :member
  belongs_to :task
  belongs_to :chore_wheel

  after_create :send_new_task_email

  def send_new_task_email
    MemberMailer.new_chore(member: self.member, member_task: self).deliver_now
  end
end
