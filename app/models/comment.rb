class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :chore_wheel
end
