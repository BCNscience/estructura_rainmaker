app.register("ap-slide-indicator", function () {

    return {
        publish: {},
        events: {},
        states: [],
        onRender: function (el) {
            app.listenToOnce(app.slide, 'slide:enter', this.updateIndicators.bind(this));
            app.listenToOnce(app.slideshow, 'load', this.updateIndicators.bind(this));
            app.listenTo(app.slideshow, 'update:current', this.updateIndicators.bind(this));
        },
        onRemove: function (el) {

        },
        onEnter: function (el) {

        },
        onExit: function (el) {

        },

        updateIndicators: function (data) {


            var slideList = app.slideshow.inspect();
            var $joystick = $('.joystick');

            if(slideList.getLeft()){
                $joystick.find('.left').css('display', 'block');
            }
            else{
                $joystick.find('.left').css('display', 'none');
            }
            if(slideList.getRight()){
                $joystick.find('.right').css('display', 'block');
            }
            else{
                $joystick.find('.right').css('display', 'none');
            }
            if(slideList.getUp()){
                $joystick.find('.up').css('display', 'block');
            }
            else {
                $joystick.find('.up').css('display', 'none');
            }
            if(slideList.getDown()){
                $joystick.find('.down').css('display', 'block');
            }
            else{
                $joystick.find('.down').css('display', 'none');
            }
        }
    }

});