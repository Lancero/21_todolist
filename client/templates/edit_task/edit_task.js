Template.edit_task.onCreated(function(){
	this.taskId = FlowRouter.getParam('id');
		
	var self = this;
	self.autorun(function(){
		var id = FlowRouter.getParam('id');

		//self.subscribe('singleRecipe', id);
	});
});

Template.edit_task.helpers({
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

Template.edit_task.events({
	'submit .edit-task-form': function(event){
		var taskName = event.target.taskName.value;
		var taskDesc = event.target.taskDescription.value;
		var taskUser = event.target.user.value;			
		var taskId = FlowRouter.getParam('id');

		Meteor.call('editTask', taskName, taskDesc, taskUser, taskId);

		FlashMessages.sendSuccess('Zadanie zostało zaaktualiowane');
		FlowRouter.go('/list');

		return false;
	}
});