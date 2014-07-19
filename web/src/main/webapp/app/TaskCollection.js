define(['./TaskModel'],
function(TaskModel) {
    'use strict';

    return Backbone.Collection.extend({
        model: TaskModel,
        url: '/data/tasks'
    });

});
