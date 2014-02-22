Ext.define('TA.controller.TaskList', {
    extend: 'Ext.app.Controller',
    stores: ['Tasks'],
    models: ['Task'],
    views: ['TaskListPanel'],

    init: function() {
        this.control({
            'tasklist tool[type=refresh]': {
                click: this.onRefreshToolClicked
            },
            'tasklist tool[type=plus]': {
                click: this.onAddToolClicked
            },
            'tasklist': {
                edit: this.onRowEdit,
                canceledit: this.onCancelRowEdit,
                delete: this.onRowDelete
            }
        });

        this.refreshList();
    },

    onRefreshToolClicked: function() {
        this.refreshList();
    },

    onAddToolClicked: function(toolComponent) {
        var taskListPanel = toolComponent.up('tasklist'),
            rowEditingPlugin = taskListPanel.findPlugin('rowediting'),
            newTask, newItemIndex;

        // Cancel an ongoing edit, if there is one.
        rowEditingPlugin.cancelEdit();

        // Create a new model instance and begin editing it...
        newTask = this.getTaskModel().create({
            summary: '',
            priority: 1
        });

        newItemIndex = this.getTasksStore().getCount();
        this.getTasksStore().insert(newItemIndex, newTask);
        taskListPanel.getSelectionModel().select(newTask);
        taskListPanel.getView().focusRow(newItemIndex);
        rowEditingPlugin.startEdit(newItemIndex, 0);
    },

    onRowEdit: function() {
        this.getTasksStore().sync();
    },

    onCancelRowEdit: function(editor, context) {
        var record = context.record,
            wasFirstEditOnNewRecord = record.phantom && !record.dirty;

        if (wasFirstEditOnNewRecord) {
            this.getTasksStore().remove(record);
        }
    },

    onRowDelete: function(taskListPanel, actionColumn, view, rowIndex, colIndex, item, e, record, row) {
        var rowEditingPlugin = taskListPanel.findPlugin('rowediting');
        console.log(record);

        Ext.defer(function() {
            // Cancel an ongoing edit, if there is one.
            rowEditingPlugin.cancelEdit();

            this.getTasksStore().remove(record);
            this.getTasksStore().sync();
        }, 1, this);
    },

    refreshList: function() {
        this.getTasksStore().load();
    }

});
