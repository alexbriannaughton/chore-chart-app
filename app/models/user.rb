class User < ApplicationRecord
  has_secure_password

  has_many :chore_wheel_users
  has_many :chore_wheels, through: :chore_wheel_users
  has_many :comments

  validates :username, presence: true, uniqueness: true

  # after_create :send_welcome_email

    def send_welcome_email
        UserMailer.welcome.deliver_now  
    end
end
