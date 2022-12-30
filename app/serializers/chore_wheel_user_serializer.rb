class ChoreWheelUserSerializer < ActiveModel::Serializer
  attributes :id
  has_one :user
  has_one :chore_wheel
end
