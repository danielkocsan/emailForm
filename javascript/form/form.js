(function (NS) {
    'use strict';
    if (typeof NS !== 'object') {
        throw new Error('Core object is not found');
    }

    NS.Form = function (element) {
        this.element = element;

        if (typeof element !== 'object') {
            throw new Error('Form constructor first parameter must be a dom node object');
        }

        this.bind();
    };

    NS.Form.prototype = {
        pending: false,

        getValues: function () {
            var elements = this.element.elements,
                count = elements.length,
                i,
                values = {},
                element;

            for (i = 0; i < count; i += 1) {
                element = elements[i];

                if (element.name) {
                    values[element.name] = element.value;
                }
            }

            return values;
        },

        handleSubmit: function (event) {
            var ajaxObject;
            event.preventDefault();
            
            if (!this.pending && this.validate()) {
                this.pending = true;
                this.element.className = 'pending';
                ajaxObject = NS.ajax('POST', this.element.action, this.getValues());
                ajaxObject.onreadystatechange = (function (httpRequest, that) {
                    return function () {
                        if (httpRequest.readyState === 4) {
                            that.pending = false;
                            that.element.className = '';
                            if (httpRequest.status === 200) {  
                                console.log('ok');
                            } 
                            else {  
                                console.log('There was a problem with the request.');  
                            }
                        }
                    }
                }(ajaxObject, this));
            }
        },

        bind: function () {
            this.element.addEventListener(
                'submit',
                (function (that) {
                    return function (event) {
                        that.handleSubmit(event);
                    };
                }(this))
            );
        },

        validators: [],

        addValidator: function (validator) {
            if (typeof validator !== 'object') {
                throw new Error('Form.addValidator() first parameter must be a Validator object');
            }

            this.validators.push(validator);
        },

        validate: function () {
            var result = true,
                i,
                count = this.validators.length,
                validator;

            for (i = 0; i < count; i += 1) {
                validator = this.validators[i];
                if (validator.validate) {
                    if (!validator.validate()) {
                        result = false;
                    }
                }
            }

            return result;
        }
    };
}(Core));