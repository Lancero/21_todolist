Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

Template.registerHelper( 'user', () => {
  return Meteor.users.find({}, {sort:{username: 1}});
});

Meteor.subscribe('users');
Meteor.subscribe('myCurrentTasks');
Meteor.subscribe('myFinishedTasks');