(function () {
    'use strict';

    document.addEventListener('ready', function () {

        // Prevent vertical bouncing of slides if tablet or bigger
        document.ontouchmove = function (event) {
            var currentWidth = app.dom.get('wrapper').getBoundingClientRect().width;
            if (currentWidth >= 768)
                event.preventDefault();
        };

        if (window.ag && window.ag.data) {
            ag.data.getPresenter(); // data available through ag.data.presenter
            ag.data.getCallContacts(); // data available through ag.data.call_contacts
        }

    });

});