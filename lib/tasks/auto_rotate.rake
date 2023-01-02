namespace :auto_rotate do
    desc 'auto rotates all chorewheels'
    task weeks: :environment do
        MemberTask.rotate_all
    end
end