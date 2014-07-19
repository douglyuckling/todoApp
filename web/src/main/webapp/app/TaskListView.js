define([''],
function() {
    'use strict';

    return Backbone.View.extend({

        initialize: function() {
            console.log('initialize()'); // REVERT
            this.listenTo(this.collection, 'sync reset', this.render);
        },

        render: function() {
            console.log('render()'); // REVERT
            var taskListEl = document.createElement('ul');
            taskListEl.classList.add('list-group');

            this.collection.each(function(task) {
                var taskEl = document.createElement('li');
                taskEl.classList.add('list-group-item');
                taskEl.appendChild(document.createTextNode(task.escape('summary')));
                taskListEl.appendChild(taskEl);
            }.bind(this));

            var oldTaskListEl = this.el.getElementsByTagName('ul')[0];
            oldTaskListEl.parentNode.replaceChild(taskListEl, oldTaskListEl);
        }

    });

});
