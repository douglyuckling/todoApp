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
    new TaskListView({
        collection: taskCollection,
        el: document.getElementById('tasks')
    });

    taskCollection.fetch();
});
