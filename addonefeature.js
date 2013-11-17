Tasks = new Meteor.Collection('tasks');

if (Meteor.isClient) {
  Template.list_tasks.tasks = function () {
    return Tasks.find();
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
        assignee_id: $('#assigned_user_id option:selected').val()
      });
      $('#new_task_modal').modal('hide');
      return false;
    }
  };
}

if(Meteor.isClient)
{
	Handlebars.registerHelper('getUserEmail', function(userId){//Allowing Handlebar to get the user's first e-mail from Meteor. (We can add an index/selector parameter later.)
		if(userId === '')
		{
			return 'Undefined';
		}

		userElement = Meteor.users.findOne({'_id': userId});
		userEmail = userElement.emails[0].address;

		if(typeof userEmail === 'undefined')
		{
			return 'Undefined';
		}
		else
		{
			return userEmail;
		}
	});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
