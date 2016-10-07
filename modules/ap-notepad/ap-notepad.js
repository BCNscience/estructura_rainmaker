app.register("ap-notepad", function() {

  /**
   * Implements the Notepad Class.
   * -------------------------------------
   * This class enables the user to draw over other content via touch/mouse events.
   *
   * @class Notepad
   * @constructor
   * @param {object} options Valid properties are:
   *     - $container: jQuery DOM object inside which to load the module
   *     - $menuButton: jQuery DOM object representing the button which toggled the notepad.
   *       Used to possition the Notepad menu over the original toggler.
   */

  var BRUSH_RED   = "modules/ap-notepad/assets/brush_red.png";
  var BRUSH_GREEN = "modules/ap-notepad/assets/brush_green.png";
  var brush = new Image();
  var sketcher;


  var self;
  return {
    publish: {
        
    },
    events: {
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
    states: [],
    onRender: function(el) {
      self = this;
      app.$.notepad = this;

      brush.src = BRUSH_RED;
      brush.onload = function () {
        sketcher = new Sketcher($("canvas"), brush);
      };

      $(el).find(".button.exit").on("tap", function () {
        self.toggle();
        sketcher.clear();
      });

      $(el).find(".button.green").on("tap", function () {
        brush.src = BRUSH_GREEN;
      });
      $(el).find(".button.red").on("tap", function () {
        brush.src = BRUSH_RED;
      });
      $(el).find(".button.clear").on("tap", function () {
        sketcher.clear();
      });

      $(el).find(".button:not(.clear,.exit)").on("tap", function (event) {
        $(self.el).find('.button').removeClass('active');
        $(event.target).addClass('active');
      });

    },
    onRemove: function(el) {
        
    },
    onEnter: function(el) {

    },
    onExit: function(el) {

    },

    unload: function() {

    },

    toggle: function() {
      var self = this;
      $(self.el).find('.Notepad').toggleClass("active");
      var pencilPos = $(".bar .button.notepad").offset();
      $(".palette").css({
        top: pencilPos.top+3,
        left: pencilPos.left+9
      });
    }
  }

});