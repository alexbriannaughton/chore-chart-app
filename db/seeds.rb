# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts 'seedin...'


alex = User.create(username: 'alex', password: 'alex', email: 'alexbriannaughton@gmail.com')
cw = ChoreWheel.create(name: 'first chorewheel', user: alex)
free_task = Task.create(name: "free space", chore_wheel: cw)

puts 'done seedin.'