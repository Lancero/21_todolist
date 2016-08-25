Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

Template.registerHelper( 'user', () => {
  return Meteor.users.find({}, {sort:{username: 1}});
});