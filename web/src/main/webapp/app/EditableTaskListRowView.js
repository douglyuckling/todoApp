define([''],
function() {
    'use strict';

    var $rowFragment = $(document.createDocumentFragment());
    $rowFragment.append($('<td data-field-name="complete"><span class="glyphicon"></span></td>'));
    $rowFragment.append($('<td data-field-name="summary"><input class="form-control" type="text"><td>'));
    $rowFragment.append($('<td data-field-name="priority"><input class="form-control" type="number" min="0" step="1"></td>'));
    $rowFragment.append($('<td data-field-name="context"><input class="form-control" type="text"></td>'));
    $rowFragment.append($('<td class="actions"><button name="save-edit" class="btn btn-primary glyphicon glyphicon-ok-circle"><button name="cancel-edit" class="btn glyphicon glyphicon-ban-circle"></td>'));

    function cloneRowFragment() {
        return $rowFragment[0].cloneNode(true);
    }

    return Backbone.View.extend({
        tagName: 'tr',
        className: 'editing',

        initialize: function(options) {
            this.tableView = options.tableView;

            this.el.setAttribute('data-task-id', this.model.id);
        },

        render: function() {
            if (!this.el.hasChildNodes()) {
                this.el.appendChild(cloneRowFragment());

                this.$complete = this.$('[data-field-name="complete"]');
                this.$summary = this.$('[data-field-name="summary"]');
                this.$priority = this.$('[data-field-name="priority"]');
                this.$context = this.$('[data-field-name="context"]');

                this.$summaryInput = this.$summary.find('input');
                this.$priorityInput = this.$priority.find('input');
                this.$contextInput = this.$context.find('input');
            }

            this.$complete.find('.glyphicon').toggleClass('glyphicon-ok', this.model.get('complete'));
            this.$summaryInput.val(this.model.get('summary'));
            this.$priorityInput.val(this.model.get('priority'));
            this.$contextInput.val(this.model.get('context'));

            var visibleFields = _(this.tableView.visibleFields);
            this.$complete.toggle(visibleFields.contains('complete'));
            this.$summary.toggle(visibleFields.contains('summary'));
            this.$summary.toggle(visibleFields.contains('priority'));
            this.$summary.toggle(visibleFields.contains('context'));

            return this;
        },

        getFormValues: function() {
            return {
                complete: false,
                summary: this.$summaryInput.val(),
                priority: this.$priorityInput.val(),
                context: this.$contextInput.val()
            };
        }
    });

});
