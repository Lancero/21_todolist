Template.userList.onCreated(function()	{
		this.subscribe('currentTasks');
		this.subscribe('finishedTasks');
	});

Template.userList.helpers({
	task: function(){
		var userId = Meteor.userId();
		return Tasks.find({createdBy: userId}, {sort:{createdAt: -1}});
	}
});

Template.userList.events({
	'click .delete-task': function(){
		if(confirm('Are You Sure?')){
			Meteor.call('deleteTask', this._id, function(err, res){
				if(!err){
					FlashMessages.sendSuccess('Zadanie zostało usunięte');
				} else {
					FlashMessages.sendError('Podczas przetważania wystąpił błąd');
					console.log(err);
				}
			});
		}
	},
	'click .finished-task': function(){
		Meteor.call('finishTask', this._id, this.isChecked, function(err, res){
			if(err){
				FlashMessages.sendError('Podczas przetważania wystąpił błąd');
				console.log(err);
			}
		});
	}
});