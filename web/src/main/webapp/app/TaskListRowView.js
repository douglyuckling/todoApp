define([''],
function() {
    'use strict';

    var $rowFragment = $(document.createDocumentFragment());
    $rowFragment.append($('<td data-field-name="complete"><span class="glyphicon"></span></td>'));
    $rowFragment.append($('<td data-field-name="summary"><span class="field-value field-value-editable"></span><td>'));
    $rowFragment.append($('<td data-field-name="priority"><span class="field-value field-value-editable"></span></td>'));
    $rowFragment.append($('<td data-field-name="context"><span class="field-value field-value-editable"></span></td>'));
    $rowFragment.append($('<td class="actions"><button name="delete" class="btn btn-xs btn-danger glyphicon glyphicon-minus"></td>'));

    function cloneRowFragment() {
        return $rowFragment[0].cloneNode(true);
    }

    return Backbone.View.extend({
        tagName: 'tr',

        initialize: function(options) {
            this.tableView = options.tableView;

            this.el.setAttribute('data-task-id', this.model.id);

            this.listenTo(this.model, 'change', this.render);
        },

        render: function() {
            if (!this.el.hasChildNodes()) {
                this.el.appendChild(cloneRowFragment());

                this.$complete = this.$('[data-field-name="complete"]');
                this.$summary = this.$('[data-field-name="summary"]');
                this.$priority = this.$('[data-field-name="priority"]');
                this.$context = this.$('[data-field-name="context"]');
            }

            this.$complete.find('.glyphicon').toggleClass('glyphicon-ok', this.model.get('complete'));
            this.$summary.find('.field-value').html(this.model.get('summary'));
            this.$priority.find('.field-value').html(this.model.get('priority'));
            this.$context.find('.field-value').html(this.model.get('context'));

            var visibleFields = _(this.tableView.visibleFields);
            this.$complete.toggle(visibleFields.contains('complete'));
            this.$summary.toggle(visibleFields.contains('summary'));
            this.$summary.toggle(visibleFields.contains('priority'));
            this.$summary.toggle(visibleFields.contains('context'));

            return this;
        }
    });

});
