Ext.application({
    uses: ['Ext.container.Viewport'],
    name: 'TA', // Initialism for "todo app"

    controllers: [
        'GroceryList'
    ],

    appFolder: 'app',

    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [
                {
                    xtype: 'grocerylist',
                    title: 'Grocery List',
                    store: this.getGroceryListController().getGroceryListStore()
                }
            ]
        });
    }
});
