# Chore Heroes!

## Project Pitch

My app is a tool for sharing chores--it will make it easier to divvy up and keep track of household tasks in homes of multiple people.

## User Stories
- Users can securely create and account and login
- Users can create a chore chart with any number of chores and any number of heroes (the people doing the chores)
- If there are more chores than heroes, the chart will assign 'Nobody' to a chore. This is to make everyone aware that there is no one on that task.
- If there are more heroes than chores, the chart will assign one hero to a "free space"
- If a hero is added to the chart and a 'nobody' is present on the chart, the new hero will replace 'nobody'
- If a chore is added to the chart and a "free space" is present, the new chore will replace that free space
- Users can add/delete/edit chores and heroes on their chore chart after it's been created
- Users can login and observe the current state assigned tasks, which is preserved in the database
- Users can enable a cron job which will rotate the chart every Monday morning
- Users can manually rotate the chore chart in a non-randomized way
- If desired, users will receive an email each time they are assigned a new task
- Animated wheel for chart
- Each chore wheel is only authorized for use by users with the right permissions
- Users can give other users permissions to their chore wheels
- Users can communicate with one another on the chore wheel's bulletin board
- Users can click a segment of the chore wheel for more chore details
- Users can access on mobile for user-friendly experience

#### strech goals:
- users can pull up a chart history to view who was on what chore at any previous date

## DB Schema
### chore_wheel_user
- belongs_to :user
- belongs_to :chore_wheel

### chore_wheel
- has_many :members
- has_many :tasks
- has_many :member_tasks
- has_many :chore_wheel_users
- has_many :users
- has_many :comments

### comment
- belongs_to :user
- belongs_to :chore_wheel

### member_task
- belongs_to :member
- belongs_to :task
- belongs_to :chore_wheel

### member
- belongs_to :chore_wheel
- has_many :member_tasks

### task
- belongs_to :chore_wheel
- has_many :member_tasks

### user
- has_many :chore_wheel_users
- has_many :chore_wheels
- has_many :comments