(function (NS, doc) {
    'use strict';
    if (typeof NS !== 'object') {
        throw new Error('namespace object is not found');
    }

    NS.Validator = function (element) {
        this.element = element;

        console.log('hello');
        console.log(typeof element);
        if (typeof element !== 'object') {
            throw new Error('Validator first parameter must be a dom node object');
        }

        this.bind();

        this.createMessageElement();
    };

    NS.Validator.prototype = {
        validatorMessage: 'This is a Validator constructor, please do not implement',

        createMessageElement: function () {
            this.messageElement = doc.createElement("div");
            this.element.parentNode.appendChild(this.messageElement);
            this.messageElement.innerHTML = this.validatorMessage;
            this.messageElement.className = 'error-message';
        },

        check: function () {
            return false;
        },

        validate: function () {
            var result = this.check();

            if (result) {
                this.messageElement.className = 'error-message';
            } else {
                this.messageElement.className = 'error-message active';
            }
            return result;
        },

        handleChange: function (event) {
            this.validate();
        },

        bind: function () {
            this.element.addEventListener(
                'keyup',
                (function (that) {
                    return function (event) {
                        that.handleChange(event);
                    };
                }(this))
            );
            this.element.addEventListener(
                'change',
                (function (that) {
                    return function (event) {
                        that.handleChange(event);
                    };
                }(this))
            );
        }
    };
}(Core, document));