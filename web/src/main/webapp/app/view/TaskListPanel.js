Ext.define('TA.view.TaskListPanel' ,{
    extend: 'Ext.grid.Panel',
    uses: ['Ext.grid.plugin.RowEditing'],
    alias: 'widget.tasklist',

    tools: [{
        type: 'refresh'
    }, {
        type: 'plus'
    }],

    columns: [{
        text: 'Task',
        dataIndex: 'summary',
        width: 250,
        editor: {
            xtype: 'textfield',
            allowOnlyWhitespace: false,
            emptyText: 'New task...'
        }
    }, {
        text: 'Priority',
        dataIndex: 'priority',
        width: 85,
        editor: {
            xtype: 'numberfield',
            allowBlank: false
        }
    }, {
        text: 'Context',
        dataIndex: 'context',
        width: 100,
        editor: {
            xtype: 'textfield',
            allowBlank: true,
            emptyText: 'context [optional]'
        }
    }],

    plugins: [{
        ptype: 'rowediting',
        clicksToEdit: 1
    }],

    initComponent: function() {
        var me = this;

        this.addEvents('delete');

        this.columns.push({
            xtype:'actioncolumn',
            width:50,
            flex: 1,
            align: 'right',
            icon: 'resources/theme-neptune/images/tools/tool-close-dark.png',
            tooltip: 'Delete',
            handler: function() {
                var actioncolumn = this;
                me.fireEventArgs('delete', [me, actioncolumn].concat(Array.prototype.slice.call(arguments, 0)));
            }
        });

        this.callParent(arguments);
    }

});
