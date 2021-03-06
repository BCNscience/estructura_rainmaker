app.register("ap-reference-library", function() {

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

      app.$.on('open:ap-reference-library', function () {
        if(this.stateIsnt("visible"))
          this.show();
      }.bind(this));

      app.$.on('close:ap-reference-library', function () {
        this.hide();
      }.bind(this));

      app.$.on('toolbar:hidden', function () {
        this.hide();
        this.unload();
      }.bind(this));

      var $list = $(el).find("ul");

      // Initialize scrolling:
      self.scroll = new IScroll(self.$(".scroll")[0], {scrollbars: true});

      // Fill the list with all media entries that have a reference id:
      var references = window.mediaRepository.find("", "referenceId");
      if (references) {
        $.each(references, function (file, meta) {
          $list.append(window.mediaRepository.render(file, meta));
        });
        self.scroll.refresh();
      }

    },
    onRemove: function(el) {
        
    },
    onEnter: function(el) {

    },
    onExit: function(el) {

    },

    hide: function () {
      app.unlock();
      this.reset();
    },

    show: function () {
      app.lock();
      this.goTo('visible');
    },

    unload: function() {
      if(this.stateIs("visible"))
        if(self.scroll) self.scroll.destroy();
    }
  }

});