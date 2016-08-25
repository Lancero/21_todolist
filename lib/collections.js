Tasks = new Mongo.Collection('tasks');

Meteor.methods({
	finishTask: function(id, isChecked){
		var taskId = id;
		var currentState = isChecked;

		if(currentState===false){

			Tasks.update({
				_id: taskId
			},{
				$set:{
					isChecked: !currentState,
					finishedAt: new Date()
				}
			});	
		} else {
			Tasks.update({
				_id: taskId
			},{
				$set:{
					isChecked: !currentState,
					finishedAt: false
				}
			});	
		}								
	},
	deleteTask: function(taskId){
		Tasks.remove({
			_id: taskId
		});		
	},
	addNewTask: function(taskName, taskDesc, taskUser){
		Tasks.insert({
			taskName: taskName,
			taskDescription: taskDesc,
			taskFor: taskUser,
			createdBy: Meteor.userId(),
			createdAt: new Date(),
			isChecked: false
		});	
	},
	editTask: function(taskName, taskDesc, taskUser, taskId){
		Tasks.update({
			_id: taskId
		},{
			$set:{
				taskName: taskName,
				taskDescription: taskDesc,
				taskFor: taskUser,
				updatedBy: Meteor.userId(),
				updatedAt: new Date()
			}
		});		
	}
});