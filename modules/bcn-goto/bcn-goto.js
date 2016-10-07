app.register("bcn-goto", function () {

    return {
        
        template: false,
        
        publish: {
            element: ''
        },
        events: {
            "tap": "navigate"
        },
        states: [],
        onRender: function () {
        },
        onRemove: function () {
        },
        onEnter: function () {
        },
        onExit: function () {
        },
        navigate: function (event) {
            var element = event.target;
            var path;
            var regex = new RegExp(/app\./);
            if (element) {
                path = element.getAttribute('data-goto');
//                console.log('element: ' + element);
//                console.log('path: ' + path);
//                console.log('regex: ' + regex);
                if (path) {
                    if (regex.test(path))
                        eval(path);
                    else
                        app.goTo(path);
                }
            }
        }
    };

});