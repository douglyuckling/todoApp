Function.prototype.inheritsFrom = function(parentClass) {
    var childClass = this;

    Object.defineProperties(childClass, {
        prototype: { value: Object.create(parentClass.prototype) },
        __super: { value: parentClass }
    });

    Object.defineProperties(childClass.prototype, {
        constructor: { value: childClass },
        __super: { value: parentClass },
        __super_apply: __super_apply
    });

    function __super_apply(args) { parentClass.apply(this, args); }
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
