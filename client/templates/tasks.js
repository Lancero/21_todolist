Template.registerHelper( 'user', () => {
  return Meteor.users.find({}, {sort:{username: 1}});
});

Template.new_task.events({
	'submit .new-task-form': function(event){
		var taskName = event.target.taskName.value;
		var taskDesc = event.target.taskDescription.value;
		var taskUser = event.target.user.value;

		Tasks.insert({
			taskName: taskName,
			taskDescription: taskDesc,
			taskFor: taskUser,
			createdBy: Meteor.userId(),
			createdAt: new Date(),
			isChecked: false
		});

		FlashMessages.sendSuccess('Zadanie dodano pomyślnie do listy');
		FlowRouter.go('/list');

		return false;
	}
});

Template.list.helpers({
	task: function(){
		var userId = Meteor.userId();
		return Tasks.find({isChecked: false, taskFor: userId}, {sort:{createdAt: -1}});	//Current tasks
	},
	finishedTask: function(){
		var userId = Meteor.userId();
		return Tasks.find({isChecked: true, taskFor: userId}, {sort:{finishedAt: -1}}); //Finished tasks
	},
	userName: function(){
		var userId = Meteor.userId();
		return Meteor.users.find(userId);
	}
});

Template.list.events({
	'click .delete-task': function(event){
		var taskId = this._id;

		if(confirm('Are You Sure?')){
			Tasks.remove({
				_id: taskId
			});
			FlashMessages.sendSuccess('Zadanie zostało usunięte');
		} else {
			FlashMessages.sendError('Anulowane przez użytkownika');
		}		
	},
	'click .finished-task': function(event, tmpl){
		var taskId = this._id;
		var currentState = this.isChecked;

		Tasks.update({
			_id: taskId
		},{
			$set:{
				isChecked: !currentState,
				finishedAt: new Date()

			}
		});
	}
});