class ChoreWheel < ApplicationRecord
    has_many :members
    has_many :tasks

    validates :name, length: { minimum: 3 }
end
