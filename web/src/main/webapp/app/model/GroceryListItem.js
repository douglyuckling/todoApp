Ext.define('TA.model.GroceryListItem', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'quantity', type: 'int'},
        {name: 'unit', type: 'string'}
    ]
});
