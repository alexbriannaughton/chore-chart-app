class Member < ApplicationRecord
  belongs_to :chore_wheel
  has_many :member_tasks, dependent: :destroy

  validates :name, presence: true
end
