# Preview all emails at http://localhost:3000/rails/mailers/member_task
class MemberTaskPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/member_task/new_chore
  def new_chore
    MemberTaskMailer.new_chore
  end

end
