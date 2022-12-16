require "rails_helper"

RSpec.describe MemberMailer, type: :mailer do
  describe "new_chore" do
    let(:mail) { MemberMailer.new_chore }

    it "renders the headers" do
      expect(mail.subject).to eq("New chore")
      expect(mail.to).to eq(["to@example.org"])
      expect(mail.from).to eq(["from@example.com"])
    end

    it "renders the body" do
      expect(mail.body.encoded).to match("Hi")
    end
  end

end
