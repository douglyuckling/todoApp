define(['./TaskListHeaderRowView',
        './TaskListRowView',
        './TaskListNewTaskRowView'],
function(TaskListHeaderRowView,
         TaskListItemRowView,
         TaskListNewTaskRowView) {
    'use strict';

    var $tableFragment = $(document.createDocumentFragment());
    $tableFragment.append($('<thead></thead>'));
    $tableFragment.append($('<tbody></tbody>'));
    $tableFragment.append($('<tfoot></tfoot>'));

    function cloneTableFragment() {
        return $tableFragment[0].cloneNode(true);
    }

    return Backbone.View.extend({
        tagName: 'table',
        className: 'table',

        initialize: function() {
            this.headerRowView = new TaskListHeaderRowView({tableView: this});
            this.itemRowViewsByTaskId = {};
            this.newItemRowView = new TaskListNewTaskRowView({tableView: this});
            this.listenTo(this.collection, 'sync reset', this.render);
        },

        events: {
            'click tr[data-task-id] > td[data-field-name=complete]': 'onClickComplete'
        },

        visibleFields: ['complete', 'summary', 'priority', 'context', 'action'],

        render: function() {
            if (!this.el.hasChildNodes()) {
                var tableFragment = cloneTableFragment()
                this.el.appendChild(tableFragment);

                this.$thead = this.$('thead').append(this.headerRowView.render().el);
                this.$tbody = this.$('tbody');
                this.$tfoot = this.$('tfoot').append(this.newItemRowView.render().el);
            }

            var oldTaskIds = Object.keys(this.itemRowViewsByTaskId);
            var newTaskIds = this.collection.pluck('id');
            var exitingTaskIds = _(oldTaskIds).difference(newTaskIds);
            var enteringTaskIds = _(newTaskIds).difference(oldTaskIds);

            exitingTaskIds.forEach(function(taskId) {
                this.itemRowViewsByTaskId[taskId].remove();
                delete this.itemRowViewsByTaskId[taskId];
            }.bind(this));

            enteringTaskIds.forEach(function(taskId) {
                var rowView = new TaskListItemRowView({
                    model: this.collection.get(taskId),
                    tableView: this
                });
                this.itemRowViewsByTaskId[taskId] = rowView;
                this.$tbody.append(rowView.render().el);
            }.bind(this));

            return this;
        },

        onClickComplete: function(e) {
            var taskId = e.currentTarget.parentElement.getAttribute('data-task-id');
            var task = this.collection.get(taskId);
            task.set('complete', !task.get('complete'));
            task.save();
        }

    });

});
