Meteor.publish('myCurrentTasks', function(){
	return Tasks.find({isChecked: false, taskFor: this.userId}, {sort:{createdAt: -1}});	//Current tasks for user
});

Meteor.publish('myFinishedTasks', function(){
	return Tasks.find({isChecked: true, taskFor: this.userId}, {sort:{finishedAt: -1}}); 	//Finished tasks for user
});

Meteor.publish('currentTasks', function(){
	return Tasks.find({isChecked: false, createdBy: this.userId}, {sort:{createdAt: -1}});	//Current tasks created by user
});

Meteor.publish('finishedTasks', function(){
	return Tasks.find({isChecked: true, createdBy: this.userId}, {sort:{finishedAt: -1}}); 	//Finished tasks created by user
});

Meteor.publish('singleTask', function(id){
	return Tasks.find({_id: id});
});

Meteor.publish('users', function(){
	return Meteor.users.find({}, {sort:{username: 1}});
});