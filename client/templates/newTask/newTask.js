Template.newTask.events({
	'submit .new-task-form': function(){
		var taskName = event.target.taskName.value;
		var taskDesc = event.target.taskDescription.value;
		var taskUser = event.target.user.value;
		
		Meteor.call('addNewTask', taskName, taskDesc, taskUser);

		FlashMessages.sendSuccess('Zadanie dodano pomyślnie do listy');
		FlowRouter.go('/list');

		return false;
	}
});