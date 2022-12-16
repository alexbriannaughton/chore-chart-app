# Preview all emails at http://localhost:3000/rails/mailers/member
class MemberPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/member/new_chore
  def new_chore
    MemberMailer.new_chore
  end

end
