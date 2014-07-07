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
                    theadTr.appendChild(this.fieldMetadata[fieldName].createHeadTh());
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

        visibleFields: ['complete', 'summary', 'priority', 'context', 'action'],

        fieldMetadata: {
            'complete': {
                createHeadTh: function() {
                    var th = document.createElement('th');
                    var icon = th.appendChild(document.createElement('span'));
                    icon.classList.add('glyphicon');
                    icon.classList.add('glyphicon-ok');
                    return th;
                },
                createTd: function(task) {
                    return createGlyphiconTd(task.get('complete') ? 'ok' : null);
                },
                createFootTd: function() {
                    return createCheckboxInputTd();
                }
            },
            'summary': {
                createHeadTh: function() {
                    return createTextTh('Summary');
                },
                createTd: function(task) {
                    return createTextTd(task.escape('summary'));
                },
                createFootTd: function() {
                    return createTextInputTd();
                }
            },
            'priority': {
                createHeadTh: function() {
                    return createTextTh('Priority');
                },
                createTd: function(task) {
                    return createTextTd(task.escape('priority'));
                },
                createFootTd: function() {
                    return createNumberInputTd(0, undefined, 1);
                }
            },
            'context': {
                createHeadTh: function() {
                    return createTextTh('Context');
                },
                createTd: function(task) {
                    return createTextTd(task.escape('context'));
                },
                createFootTd: function() {
                    return createTextInputTd();
                }
            },
            'action': {
                createHeadTh: function() {
                    return document.createElement('th'); // empty
                },
                createTd: function(task) {
                    return document.createElement('td'); // empty
                },
                createFootTd: function() {
                    return createGlyphiconButtonTd('plus', 'primary');
                }
            }
        }

    });

    function createTextTd(text) {
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(text));
        return td;
    }

    function createGlyphiconTd(glyphiconName) {
        var td = document.createElement('td');
        var icon = td.appendChild(document.createElement('span'));
        icon.classList.add('glyphicon');
        if (glyphiconName) icon.classList.add('glyphicon-' + glyphiconName);
        return td;
    }

    function createGlyphiconButtonTd(glyphiconName, buttonStyle) {
        var td = document.createElement('td');
        var icon = td.appendChild(document.createElement('button'));
        icon.classList.add('btn');
        icon.classList.add('glyphicon');
        if (glyphiconName) icon.classList.add('glyphicon-' + glyphiconName);
        if (buttonStyle) icon.classList.add('btn-' + buttonStyle);
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

    function createCheckboxInputTd() {
        var td = document.createElement('td');
        var input = td.appendChild(document.createElement('input'));
        input.setAttribute('type', 'checkbox');
        return td;
    }

});
