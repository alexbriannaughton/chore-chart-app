class Member < ApplicationRecord
  belongs_to :chore_wheel

  validates :name, presence: true
end