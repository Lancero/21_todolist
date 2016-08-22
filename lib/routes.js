if (Meteor.isClient){
	Accounts.onLogin(function(){
		FlowRouter.go('list');
	});

	Accounts.onLogout(function(){
		FlowRouter.go('home');
	});
}

FlowRouter.triggers.enter([function(context, redirect){
	if (!Meteor.userId()) {
		FlowRouter.go('home');
	}
}]);

FlowRouter.route('/', {
	name: 'home',
	action() {
		BlazeLayout.render('HomeLayout');
	}
});
FlowRouter.route('/list', {
	name: 'list',
	action() {
		BlazeLayout.render('MainLayout', {main: 'list'});
	}
});

FlowRouter.route('/newTask', {
	name: 'newTask',
	action() {
		BlazeLayout.render('MainLayout', {main: 'newTask'});
	}
});

FlowRouter.route('/task/:id', {
	name: 'task',
	action() {
		BlazeLayout.render('MainLayout', {main: 'editTask'});
	}
});

FlowRouter.route('/userList', {
	name: 'userList',
	action() {
		BlazeLayout.render('MainLayout', {main: 'userList'});
	}
});

FlowRouter.route('/users', {
	name: 'users',
	action() {
		BlazeLayout.render('MainLayout', {main: 'users'});
	}
});