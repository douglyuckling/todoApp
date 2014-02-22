Ext.define('TA.store.Tasks', {
    extend: 'Ext.data.Store',
    model: 'TA.model.Task',
    proxy: {
        type: 'rest',
        url : 'data/tasks',
        writer: { allowSingle: false },
        pageParam: undefined,
        limitParam: undefined,
        startParam: undefined
    }
});
