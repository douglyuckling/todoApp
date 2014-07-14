define(['./TaskListHeaderRowView',
        './TaskListRowView',
        './EditableTaskListRowView',
        './TaskListNewTaskRowView'],
function(TaskListHeaderRowView,
         TaskListItemRowView,
         EditableTaskListItemRowView,
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
            this.listenTo(this.collection, 'sync reset remove', this.render);
        },

        events: {
            'click tr[data-task-id] > td[data-field-name=complete]': 'onClickComplete',
            'click tr[data-task-id] > td[data-field-name] .field-value-editable': 'onClickEditableFieldValue',
            'click button[name="save-edit"]': 'onClickSaveEditTask',
            'click button[name="cancel-edit"]': 'onClickCancelEditTask',
            'click button[name="delete"]': 'onClickDeleteTask',
            'click button[name="add"]': 'onClickAddTask'
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
            var task = this.getTaskForEl(e.currentTarget);
            task.set('complete', !task.get('complete'));
            task.save();
        },

        onClickEditableFieldValue: function(e) {
            var task = this.getTaskForEl(e.currentTarget);
            // TODO: Don't allow editing if another row is already being edited. (Flash row being edited?)
            this.startEditing(task);
        },

        onClickSaveEditTask: function(e) {
            var task = this.getTaskForEl(e.currentTarget);

            var editableRowView = this.itemRowViewsByTaskId[task.id];
            task.save(editableRowView.getFormValues());

            this.stopEditing(task);
        },

        onClickCancelEditTask: function(e) {
            var task = this.getTaskForEl(e.currentTarget);
            this.stopEditing(task);
        },

        onClickDeleteTask: function(e) {
            var task = this.getTaskForEl(e.currentTarget);
            task.destroy();
        },

        onClickAddTask: function(e) {
            this.collection.create(this.newItemRowView.getFormValues(), {wait: true});
        },

        getTaskForEl: function(el) {
            return this.collection.get(this.getTaskIdForEl(el));
        },

        getTaskIdForEl: function(el) {
            return $(el).closest('[data-task-id]').attr('data-task-id');
        },

        startEditing: function(task) {
            var readOnlyView = this.itemRowViewsByTaskId[task.id];
            var editableView = this.itemRowViewsByTaskId[task.id] = new EditableTaskListItemRowView({
                model: task,
                tableView: this
            });

            editableView.render().$el.insertAfter(readOnlyView.$el);
            readOnlyView.remove();
        },

        stopEditing: function(task) {
            var editableView = this.itemRowViewsByTaskId[task.id];
            var readOnlyView = this.itemRowViewsByTaskId[task.id] = new TaskListItemRowView({
                model: task,
                tableView: this
            });

            readOnlyView.render().$el.insertAfter(editableView.$el);
            editableView.remove();
        }

    });

});
