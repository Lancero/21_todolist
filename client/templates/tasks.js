//Meteor.subscribe('users'); //Temp off

Template.registerHelper( 'user', () => {
  return Meteor.users.find({}, {sort:{username: 1}});
});

Template.new_task.onCreated(function(){
	this.subscribe('users');
});

Template.new_task.events({
	'submit .new-task-form': function(){
		var taskName = event.target.taskName.value;
		var taskDesc = event.target.taskDescription.value;
		var taskUser = event.target.user.value;
		
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

Template.list.onCreated(function(){
	this.subscribe('myCurrentTasks');
	this.subscribe('finishedTasks');
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
		return Meteor.user().username;
	}
});

Template.list.events({
	'click .delete-task': function(){
		if(confirm('Are You Sure?')){
			Meteor.call('deleteTask', this._id, function(err, res){
				if(!err){
					FlashMessages.sendSuccess('Zadanie zostało usunięte');					
				} else {
					FlashMessages.sendError('Podczas operacji wystąpił błąd');
					console.log(err);
				}
			});
		}
	},
	'click .finished-task': function(){
		Meteor.call('finishTask', this._id, this.isChecked, function(err, res){
			if(err){
				FlashMessages.sendError('Podczas operacji wystąpił błąd');
				console.log(err);
			}
		});
	}
});