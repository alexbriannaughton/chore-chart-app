class User < ApplicationRecord
  has_secure_password

  has_many :chore_wheels

  validates :username, presence: true, uniqueness: true

  # after_create :send_welcome_email

    def send_welcome_email
        UserMailer.welcome.deliver_now  
    end
end
