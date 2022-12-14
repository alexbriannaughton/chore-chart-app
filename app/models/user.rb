class User < ApplicationRecord
  has_secure_password

  has_many :chore_wheels

  validates :username, presence: true, uniqueness: true
end
