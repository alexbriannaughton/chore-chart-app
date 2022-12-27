class Task < ApplicationRecord
  belongs_to :chore_wheel
  has_many :member_tasks, dependent: :destroy

  validates :name, presence: true
  validates :details, presence: true
end
