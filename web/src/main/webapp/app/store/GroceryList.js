Ext.define('TA.store.GroceryList', {
    extend: 'Ext.data.Store',
    model: 'TA.model.GroceryListItem',
    proxy: {
        type: 'rest',
        url : 'data/grocerylist',
        writer: { allowSingle: false },
        pageParam: undefined,
        limitParam: undefined,
        startParam: undefined
    }
});
