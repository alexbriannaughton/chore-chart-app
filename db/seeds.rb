# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts 'seedin...'

cw = ChoreWheel.create(name: 'first chorewheel')
alex = User.create(name: 'Alex Naughton', username: 'alex', chore_wheel: cw, password: 'alex')
tummy = User.create(name: 'Tummy Rooters', username: 'tummy', chore_wheel: cw, password: 'tummy')
jeans = User.create(name: 'Jeans Hammond', username: 'jeans', chore_wheel: cw, password: 'jeans')

puts 'done seedin.'