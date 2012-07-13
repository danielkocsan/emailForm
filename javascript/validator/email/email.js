(function (NS) {
    'use strict';
    if (typeof NS !== 'object') {
        throw new Error('PhoneBook object is not found');
    }
    if (typeof NS.Validator !== 'function') {
        throw new Error('PhoneBook object is not found');
    }

    NS.EmailValidator = function (element) {
        this.element = element;

        if (!element || typeof element !== 'object') {
            throw new Error('Validator first parameter must be a dom node object');
        }

        this.validatorMessage = 'This field must be an email address';
        this.bind();
        this.createMessageElement();

        this.check = function () {
            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            return reg.test(this.element.value);
        };
    };

    NS.EmailValidator.prototype = Object.create(NS.Validator.prototype);
}(Core));