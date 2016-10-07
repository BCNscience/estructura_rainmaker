app.register("ap-toolbar", function () {

    var self;

    return {
        publish: {
            hide: false,
            microsite: false
        },
        events: {
            "tap": "handleEvent",
            "tap .button[data-module-to-load='ap-specific-product-characteristics']": function (event) {
                app.$.specificProductCharacteristics.openPdf();
                self.handleEvent(event);
            },
            "tap .button.back": function () {
                app.$.BackNavigation.back();
                app.$.menu.updateCurrent();
                app.$.toolbar.hide();
            },
            "tap .bar .button.notepad": function () {
                app.$.notepad.toggle();
            },
            "tap .bar .button.jumpToLastSlide": function () {
                self.jumpToLastSlide();
                app.$.menu.updateCurrent();
                app.$.toolbar.hide();
            },
            "swipeleft": function (event) {
                event.stopPropagation();
            },
            "swiperight": function (event) {
                event.stopPropagation();
            },
            "swipeup": function (event) {
                event.stopPropagation();
            },
            "swipedown": function (event) {
                event.stopPropagation();
            }
        },
        states: [
            {
                id: 'minimized',
                onEnter: function () {
                    app.util.transformElement(this.$el, '-webkit-translate3D(0,100%,0)');

                }
            },
            {
                id: 'hidden',
                onEnter: function () {
                    app.util.transformElement(this.$el, '-webkit-translate3D(0,667px,0)');
                }
            },
            {
                id: 'maximized',
                onEnter: function () {
                    app.util.transformElement(this.$el, '-webkit-translate3D(0,0,0)');
                }
            }
        ],
        onRender: function (el) {

            self = this;
            app.$.toolbar = this;

            if (this.props.hide) {
                this.hide();
            }

            $(".ap-toolbar").attr("data-state", "minimized");
            this.goTo("minimized");

        },
        onRemove: function (el) {

        },
        onEnter: function (el) {

        },
        onExit: function (el) {

        },

        setMicrosite: function () {
            self.microsite = true;
            $(this.$el).addClass("microsite");
        },

        hide: function () {
            app.$.trigger("toolbar:hidden");
            var $joystick = $('.joystick');
            $(".ap-toolbar").attr("data-state", "hidden");
            $joystick.fadeIn();
            this.goTo("hidden");
        },


        open: function (e) {


        },

        jumpToLastSlide: function(){
            var collectionLength = app.slideshow.getLength();
            var lastSlide = app.model.getStoryboard(app.slideshow.getId()).content[collectionLength - 2];
            app.$.BackNavigation.setPrevCollection(app.model.getStoryboard(app.slideshow.getId()).id);
            app.slideshow.goTo(lastSlide);

        },

        handleEvent: function (e) {

            if($(e.target).hasClass('active')) return;

            var $allButtons = $(".button[data-module-to-load]");
            var $joystick = $('.joystick');
            var $addSlideButton = $('[data-module="ap-add-slide-button"]');

            var target = e.target;


            if ($(target).hasClass(this.props.dataModule)) {
                var state = $(target).attr("data-state");
                var map = {
                    hidden: "minimized",
                    maximized: "hidden",
                    minimized: "hidden"
                };
                self.goTo(map[state]);
                $allButtons.removeClass("active");

                $("input").blur();
                $joystick.fadeIn();
                if (app.env != 'ag-microsites' && app.env != 'ag-remote') {
                 $addSlideButton.fadeIn();
                }
                $(target).attr("data-state", map[state]);
                app.$.menu.hide();
                app.$.trigger("toolbar:hidden");
            }


            var moduleToLoad = $(target).attr("data-module-to-load");
            var currentModule = "";
            if (moduleToLoad) {

                var state = $(target).attr("data-toolbar-state");
                setTimeout(function () {
                    // avoid same touch event triggering input elements focus
                    // avoid same touch event triggering input elements focus

                }, 0);
                if (state) {
                    app.$.toolbar.goTo(state);
                    app.$.menu.hide();
                }

                if(currentModule === moduleToLoad) return;

                var trigger = "open:" + moduleToLoad;
                app.$.trigger(trigger);
                $joystick.fadeOut();
                $addSlideButton.fadeOut();

                currentModule = moduleToLoad;
                //app.$.trigger("toolbar:load-module", {id: moduleToLoad});

                $allButtons.not($(target)).removeClass("active");

                $allButtons.each(function (index, item) {

                    var otherModule = $(item).attr("data-module-to-load");
                    if (moduleToLoad != otherModule) {
                        var trigger = "close:" + otherModule;
                        app.$.trigger(trigger);
                    }
                });

                $(target).addClass("active");
            }

        }

    }
});