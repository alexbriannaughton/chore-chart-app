class UserSerializer < ActiveModel::Serializer
  attributes :id, :username

  has_many :chore_wheels
end
