var Core = {
    init: function (doc) {
        'use strict';
        var emailForm = new this.Form(doc.getElementById('email-form'));

        emailForm.addValidator(new this.EmailValidator(doc.getElementById('email')));
    }
};

this.addEventListener(
    'load',
    function () {
        'use strict';
        Core.init.call(Core, document);
    },
    false
);