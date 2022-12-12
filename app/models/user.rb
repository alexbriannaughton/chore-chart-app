class User < ApplicationRecord
  has_secure_password
  belongs_to :chore_wheel
end
