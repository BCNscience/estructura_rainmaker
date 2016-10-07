/**
 * Implements a frequently asked questions section.
 * ------------------------------------------------
 * @module frequently-asked-questions.js
 * @requires jquery.js, iscroll.js, module.js
 * @author Andreas Tietz, antwerpes ag
 */


/**
 * Implements a frequently asked questions section.
 * ------------------------------------------------
 * Questions and answeres are maintained directly inside the frequently-asked-questions.html file.
 * Tapping on a question or answer shows/hides the answer.
 *
 * @class FrequentlyAskedQuestions
 * @extends Module
 * @constructor
 * @param {object} options Valid properties are:
 *     - $container: jQuery DOM object inside which to load the module
 */

app.register("ap-frequently-asked-questions", function() {
  var self;
  return {
    publish: {
        
    },
    events: {


    },
    states: [
      {
        id: "visible"
      }
    ],
    onRender: function(el) {
      self = this;



      app.$.on('open:ap-frequently-asked-questions', function () {
          this.show();
      }.bind(this));

      app.$.on('close:ap-frequently-asked-questions', function () {
        if (this.stateIs("visible"))
          this.hide();
      }.bind(this));

      app.$.on('toolbar:hidden', function () {
        if (this.stateIs("visible"))
          this.hide();
      }.bind(this));

      // Initialize scrolling:

      if(self.scroll) self.scroll.destroy();
      var $scroll = $(self.el).find(".scroll");
      self.scroll = new IScroll($scroll[0], {scrollbars: true});



    },
    onRemove: function(el) {
        
    },
    onEnter: function(el) {

    },
    onExit: function(el) {

    },

    hide: function () {
      this.unload();
      app.unlock();
      this.reset();
    },

    show: function () {
      $(".FrequentlyAskedQuestions li").on("tap", function () {
        $(this).toggleClass("maximized");

        self.scroll.refresh();

        if($(this).hasClass("maximized"))
          self.scroll.scrollToElement(this);

      });
      app.lock();
      this.goTo('visible');
    },

    unload: function () {
      // Cleanup:
      $(self.el).find("li").off("tap");

    }
  }

});