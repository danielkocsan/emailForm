(function (NS) {
    'use strict';
    if (typeof NS !== 'object') {
        throw new Error('Core object is not found');
    }

    NS.ajax = function (type, url, data) {
        var httpRequest,
            getURIFormat = function (obj) {
                var string = '',
                    propName,
                    propValue,
                    i = 0;

                if (typeof data !== 'object') {
                    return data;
                }

                for (propName in obj) {
                    if (obj.hasOwnProperty(propName)) {
                        i += 1;
                        propValue = obj[propName];

                        if (i > 1) {
                            string += '&';
                        }
                        string += encodeURIComponent(propName) + '=' + encodeURIComponent(propValue);
                    }
                }

                return string;
            };

        if (window.XMLHttpRequest) {
            httpRequest = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }

        httpRequest.open(type, url, true);
        httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        httpRequest.send(getURIFormat(data));

        return httpRequest;
    };
}(Core));