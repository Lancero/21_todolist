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

FlowRouter.route('/new_task', {
	name: 'new_task',
	action() {
		BlazeLayout.render('MainLayout', {main: 'new_task'});
	}
});

FlowRouter.route('/task/:id', {
	name: 'task',
	action() {
		BlazeLayout.render('MainLayout', {main: 'edit_task'});
	}
});

FlowRouter.route('/user_list', {
	name: 'user_list',
	action() {
		BlazeLayout.render('MainLayout', {main: 'user_list'});
	}
});

FlowRouter.route('/users', {
	name: 'users',
	action() {
		BlazeLayout.render('MainLayout', {main: 'users'});
	}
});