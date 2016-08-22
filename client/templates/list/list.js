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
			Meteor.call('deleteTask', this._id);
			FlashMessages.sendSuccess('Zadanie zostało usunięte');
		} else {
			FlashMessages.sendError('Anulowane przez użytkownika');
		}		
	},
	'click .finished-task': function(){
		Meteor.call('finishTask', this._id, this.isChecked);
	}
});