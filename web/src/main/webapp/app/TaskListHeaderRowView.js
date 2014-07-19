define([''],
function() {
    'use strict';

    var $rowFragment = $(document.createDocumentFragment());
    $rowFragment.append($('<th data-field-name="complete"><span class="glyphicon glyphicon-ok"></span></th>'));
    $rowFragment.append($('<th data-field-name="summary">Summary<th>'));
    $rowFragment.append($('<th data-field-name="priority">Priority</th>'));
    $rowFragment.append($('<th data-field-name="context">Context</th>'));
    $rowFragment.append($('<th></th>'));

    function cloneRowFragment() {
        return $rowFragment[0].cloneNode(true);
    }

    return Backbone.View.extend({
        tagName: 'tr',

        initialize: function(options) {
            this.tableView = options.tableView;
        },

        render: function() {
            if (!this.el.hasChildNodes()) {
                this.el.appendChild(cloneRowFragment());

                this.$complete = this.$('[data-field-name="complete"]');
                this.$summary = this.$('[data-field-name="summary"]');
                this.$priority = this.$('[data-field-name="priority"]');
                this.$context = this.$('[data-field-name="context"]');
            }

            var visibleFields = _(this.tableView.visibleFields);
            this.$complete.toggle(visibleFields.contains('complete'));
            this.$summary.toggle(visibleFields.contains('summary'));
            this.$summary.toggle(visibleFields.contains('priority'));
            this.$summary.toggle(visibleFields.contains('context'));

            return this;
        }
    });

});
