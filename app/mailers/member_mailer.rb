class MemberMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.member_mailer.new_chore.subject
  #
  def new_chore(member:, member_task:)
    @member_task = member_task
    @member = member
    mail(to: member.email, subject: 'Chore Heroes: your chore this week')
  end

  def new_chore_with_nobody(member:, member_task:, nobody:)
    @member_task = member_task
    @member = member
    @nobody = nobody
    mail(to: member.email, subject: 'Chore Heroes: your chore this week')
  end
end
