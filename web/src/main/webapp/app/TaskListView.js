define([''],
function() {
    'use strict';

    return Backbone.View.extend({

        initialize: function() {
            this.listenTo(this.collection, 'sync reset', this.render);
        },

        render: function() {
            var taskTable = this.el.getElementsByTagName('table')[0];

            var thead = taskTable.getElementsByTagName('thead')[0];
            if (!thead) {
                thead = taskTable.appendChild(document.createElement('thead'));
                var theadTr = thead.appendChild(document.createElement('tr'));

                this.visibleFields.forEach(function(fieldName) {
                    theadTr.appendChild(createTextTh(this.fieldMetadata[fieldName].heading));
                }.bind(this));
            }

            var tbody = taskTable.appendChild(document.createElement('tbody'));
            this.collection.each(function(task) {
                var tr = tbody.appendChild(document.createElement('tr'));

                this.visibleFields.forEach(function(fieldName) {
                    tr.appendChild(this.fieldMetadata[fieldName].createTd(task));
                }.bind(this));
            }.bind(this));

            var oldTbody = taskTable.getElementsByTagName('tbody')[0];
            if (oldTbody) {
                taskTable.replaceChild(tbody, oldTbody);
            } else {
                taskTable.appendChild(tbody);
            }
        },

        visibleFields: ['summary', 'priority', 'context'],

        fieldMetadata: {
            'summary': {
                heading: 'Summary',
                createTd: function(task) {
                    return createTextTd(task.escape('summary'));
                }
            },
            'priority': {
                heading: 'Priority',
                createTd: function(task) {
                    return createTextTd(task.escape('priority'));
                }
            },
            'context': {
                heading: 'Context',
                createTd: function(task) {
                    return createTextTd(task.escape('context'));
                }
            }
        }

    });

    function createTextTd(text) {
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(text));
        return td;
    }

    function createTextTh(text) {
        var th = document.createElement('th');
        th.appendChild(document.createTextNode(text));
        return th;
    }

});
