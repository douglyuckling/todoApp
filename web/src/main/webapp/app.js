requirejs.config({
    baseUrl: 'lib',
    paths: {
        app: '../app'
    }
});

require(['app/TaskCollection',
         'app/TaskListView'],
function(TaskCollection,
         TaskListView) {
    'use strict';

    var taskCollection = new TaskCollection();
    var taskListView = new TaskListView({
        collection: taskCollection
    });

    document.getElementById('tasks').appendChild(taskListView.render().el);

    setTimeout(function() {
        taskCollection.fetch();
    }, 1000);
});
