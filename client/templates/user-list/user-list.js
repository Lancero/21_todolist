Template.user_list.helpers({
	task: function(){
		var userId = Meteor.userId();

		return Tasks.find({createdBy: userId}, {sort:{createdAt: -1}});
	}
});

Template.user_list.events({
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
				isChecked: !currentState
			}
		});
	}	
});