Template.editTask.onCreated(function(){
    this.subscribe('users');
	this.taskId = FlowRouter.getParam('id');
		
	var self = this;
	self.autorun(function(){
		var id = FlowRouter.getParam('id');
		self.subscribe('singleTask', id);
	});
});

Template.editTask.helpers({
	task: ()=> {
		var id = FlowRouter.getParam('id');
		return Tasks.findOne({_id: id});
	},
	author: function(val1, val2){
		if(val1===val2){
			return 'selected'
		}
	}
});

Template.editTask.events({
	'submit .edit-task-form': function(event){
		var taskName = event.target.taskName.value;
		var taskDesc = event.target.taskDescription.value;
		var taskUser = event.target.user.value;			
		var taskId = FlowRouter.getParam('id');

		Meteor.call('editTask', taskName, taskDesc, taskUser, taskId, function(err, res){
			if(!err){
				FlashMessages.sendSuccess('Zadanie zostało zaaktualiowane');
				FlowRouter.go('/list');
			} else {
				FlashMessages.sendError('Podczas operacji wystąpił błąd');
				console.log(err);
			}
		});
		return false;
	}
});