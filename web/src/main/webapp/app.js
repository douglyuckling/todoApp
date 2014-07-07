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
        collection: taskCollection,
        el: document.getElementById('tasks')
    });

    taskListView.render();
    taskCollection.fetch();
});
