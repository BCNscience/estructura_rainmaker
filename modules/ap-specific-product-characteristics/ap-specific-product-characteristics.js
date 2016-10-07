app.register("ap-specific-product-characteristics", function() {

  return {
    publish: {
        
    },
    events: {

    },
    states: [],
    onRender: function(el) {
      /**
       * Implements a function that will open the specific-product-characteristics.pdf file with the agnitio in-app PDF viewer.
       * ----------------------------------------------------------------------------------------------------------------------
       *
       * @class SpecificProductCharacteristics
       * @constructor
       */

      app.$.specificProductCharacteristics = this;



    },
    onRemove: function(el) {
        
    },
    onEnter: function(el) {

    },
    onExit: function(el) {

    },

    openPdf: function() {
      console.log('openPDF("shared/references/specific-product-characteristics.pdf", "Specific Product Characteristics"');
      ag.openPDF("shared/references/specific-product-characteristics.pdf", "Specific Product Characteristics");
      var $joystick = $('.joystick');
      var $addSlideButton = $('[data-module="ap-add-slide-button"]');
      $joystick.fadeIn();
      $addSlideButton.fadeIn();

    }
  }

});