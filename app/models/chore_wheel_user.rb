class ChoreWheelUser < ApplicationRecord
  belongs_to :user
  belongs_to :chore_wheel

  validates :user_id, uniqueness: {scope: :chore_wheel_id}
end
