class MemberTaskSerializer < ActiveModel::Serializer
  attributes :id
  has_one :member
  has_one :task
  has_one :chore_wheel
end
