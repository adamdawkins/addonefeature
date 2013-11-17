// Routes
Meteor.Router.add({
  '/': 'home'
});
Meteor.Router.filters({
  requireLogin: function(page) {
    if(!Meteor.user()) {
      return 'login';
    } else {
      return page;
    }
  } 
});

Meteor.Router.filter('requireLogin');

// Templates

//-- Tasks


Template.all_tasks.tasks = function () {
  return Tasks.find();
};

Template.my_tasks.tasks = function () {
  return Tasks.find({assignee_id: Meteor.userId()});
};

Template.new_task_form.users = function () {
  return Meteor.users.find();
};

Template.new_task_form.events = {
  'click button' : function(event) {
    Tasks.insert({             
      title: $('#new_task_title').val(),
    description: $('#new_task_description').val(),
    creator_id: Meteor.userId(),
    assignee_id: $('#assigned_user_id').val()
    });
    $('#new_task_modal').modal('hide');
    event.preventDefault();
  }
};


// View helpers
Handlebars.registerHelper('getUserEmail', function(userId){//Allowing Handlebar to get the user's first e-mail from Meteor. (We can add an index/selector parameter later.)

		userElement = Meteor.users.findOne({'_id': userId});
    if (userElement === undefined) {
      return 'Undefined'
    } else {
		userEmail = userElement.emails[0].address;

		if(typeof userEmail === undefined)
		{
			return 'Undefined';
		}
		else
		{
			return userEmail;
		}
    }
	});

