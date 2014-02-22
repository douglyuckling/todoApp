Ext.application({
    uses: ['Ext.container.Viewport'],
    name: 'TA', // Initialism for "todo app"

    controllers: [
        'TaskList'
    ],

    appFolder: 'app',

    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [
                {
                    xtype: 'tasklist',
                    title: 'Tasks',
                    store: this.getTaskListController().getTasksStore()
                }
            ]
        });
    }
});
