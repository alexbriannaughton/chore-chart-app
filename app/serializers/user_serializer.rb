class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :name
  has_one :chore_wheel
end
