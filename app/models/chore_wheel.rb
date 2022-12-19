class ChoreWheel < ApplicationRecord
    has_many :members
    has_many :tasks
    belongs_to :user
    has_many :member_tasks

    validates :name, length: { minimum: 3 }

    
end
