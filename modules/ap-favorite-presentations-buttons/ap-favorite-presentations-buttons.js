app.register("ap-favorite-presentations-buttons", function() {

  var self;
  return {
    publish: {
        
    },
    events: {

    },
    states: [],
    onRender: function(el) {
      self = this;
      app.listenTo(app.slideshow, 'load', this.favoritePresentationHandler.bind(this));

      app.$.on('update:favorites', function () {
        self.favoritePresentationHandler();
      }.bind(this));


    },
    onRemove: function(el) {
        
    },
    onEnter: function(el) {
      this.favoritePresentationHandler();
    },
    onExit: function(el) {

    },

    favoritePresentationHandler: function(data){

      var content = app.slideshow.resolve();
      var $slide = $("#" + content.slide);
      var $favoritePresentationsContainer = $slide.find('.favoritePresentationsContainer');

      // remove the favorits block if its already a custom presentation
      if (app.slideshow.resolve().slideshow.indexOf("custom-collection") > -1) {
        $favoritePresentationsContainer.empty();
        return;
      }



      if($favoritePresentationsContainer != undefined) {
        $favoritePresentationsContainer.empty();
        $.each(app.$.customCollectionsStorage.getFavorites(), function (index, orderObject) {
          $favoritePresentationsContainer.append("<div class='button' id='button" + index + "'>" + orderObject.name + "</div>");

          $favoritePresentationsContainer.find(("#button" + index)).on("tap", function () {
            var collectionObject = app.$.customCollectionsStorage.get(orderObject.name);
            if(!app.model.hasStoryboard(collectionObject.id)){

              var slideshowIdArray = [];
              $.each(collectionObject.slideshows, function (i, slideshow) {
                slideshowIdArray.push(slideshow.id);
                var slidesArrary = [];
                $.each(slideshow.content, function (i, slide) {
                  slidesArrary.push(slide);
                });

                var temp = {
                  id: slideshow.id,
                  name: slideshow.name,
                  content: slidesArrary,
                  type: "slideshow"
                };

                app.model.addStructure(slideshow.id, temp);

              });

              var storyboardData = {
                id: collectionObject.id,
                name: collectionObject.name,
                content: slideshowIdArray
              };

              app.model.addStoryboard(collectionObject.id, storyboardData);

              //app.slideshow.init(collectionObject.id);
              app.goTo(collectionObject.id);
              app.$.toolbar.hide();

              // set home icon
              //app.menu.linksConfig[orderObject.slideshows[0].id] = {title: "<div class='homeIcon' />", classname: "home"}
            }
            else{


              app.goTo(collectionObject.id);
            }

          });
        });
      }
    }
  }

});