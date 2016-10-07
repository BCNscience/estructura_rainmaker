app.register("ap-add-slide-button", function() {

  var self;
  return {
    publish: {
        
    },
    events: {
      "tap .addButton": "addSlide"
    },
    states: [
      {
        id: "added"
      }

    ],
    onRender: function(el) {

      self = this;

      app.$.on('clear:addedSlides', function () {
        this.reset();
      }.bind(this));


      app.$.on('remove:addedSlide', function(data){
        self.updateState(data);
      }.bind(this));

      app.listenTo(app.slide, 'slide:enter', this.updateState.bind(this));

      if (app.env == 'ag-microsites' || app.env == 'ag-remote') {
        $(el).hide();
      }

    },
    onRemove: function(el) {
        
    },
    onEnter: function(el) {

    },
    onExit: function(el) {

    },

    updateState: function(data) {

      if(app.$.provideSlides.addedSlides.indexOf(data.id) === -1){
        this.reset();
      }else
      {
        this.goTo("added");
      }

    },

    addSlide: function(){

      if(this.stateIs("added")){
        this.reset();
        app.$.provideSlides.removeSlide(app.slide.get().id);
      }
      else{
        this.goTo("added");
        app.$.provideSlides.addSlide(app.slide.get().id);
      }

    }
  }

});