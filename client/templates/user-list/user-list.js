Meteor.subscribe('currentTasks');
Meteor.subscribe('finishedTasks');


Template.user_list.helpers({
	task: function(){
		var userId = Meteor.userId();

		return Tasks.find({createdBy: userId}, {sort:{createdAt: -1}});
	}
});

Template.user_list.events({
	'click .delete-task': function(){

		if(confirm('Are You Sure?')){
			Meteor.call('deleteTask', this._id)
			FlashMessages.sendSuccess('Zadanie zostało usunięte');
		} else {
			FlashMessages.sendError('Anulowane przez użytkownika');
		}		
	},
	'click .finished-task': function(){
		Meteor.call('finishTask', this._id, this.isChecked, function(err, res){
			if(!err){
				FlashMessages.sendSuccess('Zadanie zostało oznaczone jako ukończone');
			} else {
				FlashMessages.sendError('Podczas pretważania wystąpił błąd');
				console.log(err);
			}
		}) 
	}	
});