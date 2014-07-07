define([''],
function() {
    'use strict';

    return Backbone.View.extend({

        initialize: function() {
            this.listenTo(this.collection, 'sync reset', this.render);
        },

        render: function() {
            var taskTable = document.createElement('table');
            taskTable.classList.add('table');

            var thead = taskTable.appendChild(document.createElement('thead'));
            this.visibleFields.forEach(function(fieldName) {
                thead.appendChild(createTextTh(this.fieldMetadata[fieldName].heading));
            }.bind(this));

            var tbody = taskTable.appendChild(document.createElement('tbody'));
            this.collection.each(function(task) {
                var tr = tbody.appendChild(document.createElement('tr'));

                this.visibleFields.forEach(function(fieldName) {
                    tr.appendChild(this.fieldMetadata[fieldName].createTd(task));
                }.bind(this));
            }.bind(this));

            var oldTaskTable = this.el.getElementsByTagName('table')[0];
            oldTaskTable.parentNode.replaceChild(taskTable, oldTaskTable);
        },

        visibleFields: ['summary'],

        fieldMetadata: {
            'summary': {
                heading: 'Summary',
                createTd: function(task) {
                    return createTextTd(task.escape('summary'));
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
