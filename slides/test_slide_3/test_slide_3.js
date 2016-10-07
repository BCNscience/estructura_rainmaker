app.register("test_slide_3", function () {

    return {
        events: {
        },
        states: [],
        onRender: function (el) {

        },
        onRemove: function (el) {

        },
        onEnter: function (el) {

            var element;
            var src;

            // Al pulsar un elemento que tenga la clase js-toogle
            $('.js-toggle').on('click', function (e) {
                element = $(this).data('element');
                src = $(this).data('src');
                $(element).removeClass('hidden');
            });

            $('.btn-close').on('click', function (e) {

                $('.popup-video').addClass('hidden');
                $(element + ' iframe').attr('src', '');
                $(element + ' iframe').attr('src', src);
            });
        },
        onExit: function (el) {

        }
    }

});