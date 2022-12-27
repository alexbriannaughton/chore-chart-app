class TaskSerializer < ActiveModel::Serializer
  attributes :id, :name, :details, :chore_wheel_id
  # has_one :chore_wheel
end
