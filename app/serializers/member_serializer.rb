class MemberSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :chore_wheel_id
  # has_one :chore_wheel
end
