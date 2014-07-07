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

            var tfoot = taskTable.getElementsByTagName('tfoot')[0];
            if (!tfoot) {
                tfoot = taskTable.appendChild(document.createElement('tfoot'));
                var tfootTr = tfoot.appendChild(document.createElement('tr'));

                this.visibleFields.forEach(function(fieldName) {
                    tfootTr.appendChild(this.fieldMetadata[fieldName].createFootTd());
                }.bind(this));
            }
        },

        visibleFields: ['summary', 'priority', 'context'],

        fieldMetadata: {
            'summary': {
                heading: 'Summary',
                createTd: function(task) {
                    return createTextTd(task.escape('summary'));
                },
                createFootTd: function() {
                    return createTextInputTd();
                }
            },
            'priority': {
                heading: 'Priority',
                createTd: function(task) {
                    return createTextTd(task.escape('priority'));
                },
                createFootTd: function() {
                    return createNumberInputTd(0, undefined, 1);
                }
            },
            'context': {
                heading: 'Context',
                createTd: function(task) {
                    return createTextTd(task.escape('context'));
                },
                createFootTd: function() {
                    return createTextInputTd();
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

    function createTextInputTd() {
        var td = document.createElement('td');
        var input = td.appendChild(document.createElement('input'));
        input.classList.add('form-control');
        input.setAttribute('type', 'text');
        return td;
    }

    function createNumberInputTd(min, max, step) {
        var td = document.createElement('td');
        var input = td.appendChild(document.createElement('input'));
        input.classList.add('form-control');
        input.setAttribute('type', 'number');
        if (typeof min === 'number') input.setAttribute('min', String(min));
        if (typeof max === 'number') input.setAttribute('max', String(max));
        if (typeof step === 'number') input.setAttribute('step', String(step));
        return td;
    }

});
