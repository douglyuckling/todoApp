Function.prototype.inheritsFrom = function(parentClass) {
    var childClass = this;

    Object.defineProperties(childClass, {
        __super: { value: parentClass },
        prototype: { value: Object.create(parentClass.prototype) }
    });

    Object.defineProperties(childClass.prototype, {
        __super: { value: parentClass },
        __super_apply: __super_apply
    });

    function __super_apply(args) {
        this.__super.apply(this, args);
    }
};

Function.prototype.instanceProperties = function(properties) {
    _(this.prototype).extend(properties);
};

Function.prototype.staticProperties = function(properties) {
    _(this).extend(properties);
};

Function.prototype.defineInstanceProperties = function(propertyDescriptors) {
    Object.defineProperties(this.prototype, propertyDescriptors);
};

Function.prototype.defineStaticProperties = function(propertyDescriptors) {
    Object.defineProperties(this, propertyDescriptors);
};
