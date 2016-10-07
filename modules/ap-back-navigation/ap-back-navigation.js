/**
 * Implements a function to navigate backwards between slides.
 * -----------------------------------------------------------
 *
 * Navigates backwards through the sequence of app.goTo calls.
 *
 * @class BackNavigation
 * @constructor
 */


app.register("ap-back-navigation", function () {

    var self;
    return {
        publish: {},
        events: {},
        states: [],
        onRender: function (el) {
            self = this;


            app.$.BackNavigation = this;
            app.listenTo(app.slideshow, 'unload',this.storeLastCollection.bind(this));
            app.listenTo(app.slideshow, 'update:current',this.storePrevSlide.bind(this));

        },
        onRemove: function (el) {

        },
        onEnter: function (el) {

        },
        onExit: function (el) {

        },

        storeLastCollection: function(data) {
          self.prevCollection = data.id;
        },

        storePrevSlide: function (data) {
            self.prevSlide = data.prev.id;
        },

        setPrevCollection: function (id) {
          self.prevCollection = id;
        },

        back: function () {
            if(self.prevCollection != null && self.prevSlide != null){
                app.goTo(self.prevCollection + "/" + self.prevSlide);
                self.prevCollection = null;
                self.prevSlide = null;
            }
            else if(self.prevSlide != null)
            {
                //var currentCollection = app.model.getStoryboard(app.slideshow.getId()).id;
                app.slideshow.goTo(self.prevSlide);
                self.prevSlide = null;
            }
        }
    }

});