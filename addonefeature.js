Tasks = new Meteor.Collection('tasks');

if (Meteor.isClient) {
  Template.list_tasks.tasks = function () {
    return Tasks.find();
  };

  Template.new_task.users = function () {
    return Meteor.users.find();
  };

  Template.new_task.events = {
    'click button' : function(event) {
      Tasks.insert({             
        title: $('#new_task_title').val(),
        description: $('#new_task_description').val(),
        creator_id: Meteor.userId(),
        assignee_id: ''
      });

      return false;
    }
  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
