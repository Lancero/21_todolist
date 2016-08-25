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