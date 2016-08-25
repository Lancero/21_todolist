Template.newTask.events({
	'submit .new-task-form': function(){
		var taskName = event.target.taskName.value;
		var taskDesc = event.target.taskDescription.value;
		var taskUser = event.target.user.value;

		//console.log(taskName, taskDesc, taskUser);
		
		Meteor.call('addNewTask', taskName, taskDesc, taskUser, function(err, res){
			if(!err){
				FlashMessages.sendSuccess('Zadanie dodano pomyślnie do listy');
				FlowRouter.go('/list');	
			} else {
				FlashMessages.sendError('Podczas operacji wystąpił błąd');
				console.log(err);
			}
		});
		return false;
	}
});

