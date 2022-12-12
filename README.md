# Phase 5 project: chore chart app

## Project Pitch

My app is a tool for sharing chores--it will make it easier to divvy up and keep track of household tasks in homes of multiple people.

## User Stories
- Users can create and account and login.
- Users can create a chore chart
- Users can add tasks and members/users to their chore chart
- Users can login and observe the current state of the chore chart
- Users can observe their chore chart rotate at a set interval
- Users can rotate the chore chart with a click
### Stretch Goals
- Users can set the interval by which the chore chart will rotate
- Users will receive an email when the chore chart rotates

## DB Schema
### ChoreChart
- name
- (has_many :users and has_many :tasks)
- (has_many :user_tasks) ?

### Users
- name and/or username
- email?
- chore_chart_id
- has_one ? has_many ? user_tasks

### Tasks
- name
- chore_chart_id
- has_one ? has_many ? user_tasks

### User-tasks
- task_id (belongs_to)
- user_id (belongs_to)
- chore_chart_id (belongs_to) ?

![IMG_5637](https://user-images.githubusercontent.com/109716310/207115276-43138a59-b2c7-482a-bc2b-aba0b52369fe.jpg)
